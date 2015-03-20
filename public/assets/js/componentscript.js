var TeamModel = can.Model.extend({
	findAll: 'GET /teams',
	findOne: 'GET /teams/{id}',
	update: 'POST /teams/{id}',
	create: 'POST /teams'
}, {});

can.Component.extend({
	tag: 'team-info',
	scope: {
		teams: new TeamModel.List({}),
		selectedTeam: null,
		createdTeam: {
			members: [{name:'osman'}],
			teamName: 'temp',
			slogan: 'asdasdas',
			hobbies: 'asdasdas',
			wins: 0,
			losses: 0
		},
		selectTeam: function(team, el) {
			this.attr('selectedTeam', team);
		},
		createTeam: function(team, el) {
			TeamModel.create(this.attr('createdTeam').serialize());
		},
		deleteTeam: function(team, el) {

		},
		updateTeam: function(teamChanged, el) {
			//make request to update team
		}
	}
});

$('.container').append(can.view('assets/js/teams.mustache', {}));