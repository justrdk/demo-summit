var TeamModel = can.Model.extend({
	findAll: 'GET /teams',
	findOne: 'GET /teams/{id}',
	update: 'PUT /teams/{id}',
	create: function(attrs) {
		$.post('http://localhost:3000/teams', attrs);
		return $.Deferred();
	},
	destroy: 'DELETE /teams/{id}'
}, {});

var socket = io.connect();

var showNotification = function(message) {
	noty({
		text: message,
		type: 'information',
		layout: 'bottomRight',
		timeout: 2500,
		theme: 'relax',
		animation: {
			open: 'animated bounceInLeft',
			close: 'animated bounceOutLeft'
		}
	});
};

socket.on('teams created', function(team) {
	$('team-info').scope().attr('teams').push(team);
	showNotification('New team: ' + team.teamName + ' created!');
});

socket.on('teams updated', function(team) {
	for (var i = $('team-info').scope().attr('teams').length - 1; i >= 0; i--) {
		var temp = $('team-info').scope().attr('teams')[i];
		if (team.id === temp.id) {
			temp.attr('teamName', team.teamName);
			temp.attr('slogan', team.slogan);
			temp.attr('winrate', parseInt(team.winrate, 10));
			temp.attr('wins', parseInt(team.wins, 10));
			temp.attr('losses', parseInt(team.losses, 10));
			showNotification('Team: ' + temp.teamName + ' information has been updated!');
			return;
		}
	}
});

socket.on('teams removed', function(team) {
	for (var i = $('team-info').scope().attr('teams').length - 1; i >= 0; i--) {
		var temp = $('team-info').scope().attr('teams')[i];
		if (team.id === temp.id) {
			showNotification('Team: ' + team.teamName + ' are a bunch of quitters and have been removed');
			$('team-info').scope().attr('teams').splice(i, 1);
			return;
		}
	}
});

can.Component.extend({
	tag: 'team-info',
	scope: {
		teams: new TeamModel.List({}),
		selectedTeam: null,
		createdTeam: {
			stringMembers: '',
			members: [],
			teamName: '',
			slogan: '',
			hobbies: '',
			wins: 0,
			losses: 0
		},
		selectTeam: function(team, el) {
			this.attr('selectedTeam', team);
		},
		createTeam: function(team, el) {
			this.formatMembersString();
			var deferred = TeamModel.create(this.attr('createdTeam').serialize());
		},
		updateTeam: function(teamChanged, el) {
			var teamName = teamChanged.teamName;
			var slogan = teamChanged.slogan;

			TeamModel.findOne({
				id: teamChanged.id
			}, function(team) {
				team.attr('teamName', teamName);
				team.attr('slogan', slogan);
				team.save();
			});
		},
		generateRandomNumber: function() {
			return Math.floor(Math.random() * this.teams.length);
		},
		deleteRandomTeam: function() {
			randomTeamIndex = this.generateRandomNumber();
			randomTeamId = this.teams[randomTeamIndex].id;

			TeamModel.findOne({
				id: randomTeamId
			}, function(team) {
				team.destroy();
			});

		},
		'addWin': function(team, el) {
			team.attr('wins', parseInt(team.wins, 10) + 1);
			var winrate = this.calculateWinrate(team.wins, team.losses);
			var wins = team.wins;

			TeamModel.findOne({
				id: team.id
			}, function(teamUpdate) {
				teamUpdate.attr('winrate', winrate);
				teamUpdate.attr('wins', wins);
				teamUpdate.save();
			});
		},
		'addLoss': function(team, el) {
			team.attr('losses', parseInt(team.losses, 10) + 1);
			var winrate = this.calculateWinrate(team.wins, team.losses);
			var losses = team.losses;

			TeamModel.findOne({
				id: team.id
			}, function(teamUpdate) {
				teamUpdate.attr('winrate', winrate);
				teamUpdate.attr('losses', losses);
				teamUpdate.save();
			});
		},
		calculateWinrate: function(wins, losses) {
			var parseWins = parseInt(wins, 10);
			var parseLosses = parseInt(losses, 10);
			var winrate = Math.floor((parseWins / (parseWins + parseLosses)) * 100);
			return winrate;
		},
		formatMembersString: function() {
			var formatted = this.createdTeam.attr('stringMembers').split(',');
			for (var i = formatted.length - 1; i >= 0; i--) {
				this.createdTeam.attr('members').push({
					name: formatted[i].trim()
				});
			}
		}
	}
});

$('.container').append(can.view('assets/js/teams.mustache', {}));