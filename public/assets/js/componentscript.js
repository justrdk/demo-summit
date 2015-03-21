var TeamModel = can.Model.extend({
	findAll: 'GET /teams',
	findOne: 'GET /teams/{id}',
	update: 'PUT /teams/{id}',
	create: 'POST /teams',
	destroy: 'DELETE /teams/{id}'
}, {});

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
			var self = this;

			deferred.then(function(team) {
				self.attr('teams').push(team);
			});
		},
		updateTeam: function(teamChanged, el) {
			//make request to update team
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