var TeamModel = can.Model.extend({
	findAll: 'GET /teams',
	findOne: 'GET /teams/{id}',
	update: 'POST /teams/{id}',
	create: 'POST /teams',
	destroy: 'POST /teams/{id}'
}, {});

can.Component.extend({
	tag: 'team-info',
	scope: {
		teams: new TeamModel.List({}),
		selectedTeam: null,
		createdTeam: {
			stringMembers : '',
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

			deferred.then(function(team){
				self.attr('teams').push(team);
			});
		},
		deleteTeam: function(team, el) {

		},
		updateTeam: function(teamChanged, el) {
			//make request to update team
		},
		formatMembersString : function(){
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