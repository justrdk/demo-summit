module.exports = {
	id: 4,
	teams: [{
		id: 1,
		members: [{
			name: 'hubert cumberdale'
		}, {
			name: 'R2dfcknK'
		}, {
			name: 'pamela locho almendares'
		}, {
			name: 'Sagui'
		}, {
			name: 'juan elmago jose'
		}],
		slogan: 'Slaughter all peruvians on our way',
		wins: 0,
		losses: 0,
		winrate: 0,
		hobbies: 'slaughter peruvians',
		teamName: 'Peruvian Slayers'
	}, {
		id: 2,
		members: [{
			name: 'richard elcreativo siwady'
		}, {
			name: 'rene phase pastrana',
		}, {
			name: 'camilo el pm',
		}, {
			name: 'douglas elnuevo guerrero'
		},{
			name: 'douglas elnuevo ponce'
		}],
		slogan: 'Shrek is love, shrek is life',
		wins: 0,
		losses: 0,
		winrate : 0,
		hobbies: 'go to the mall',
		teamName: 'San Peter Thugs'
	}, {
		id: 3,
		members: [{
			name: 'Byron elgringo'
		}, {
			name: 'collin elgringo2'
		}, {
			name: 'deanna lagringa'
		}, {
			name: 'nathaniel elgringo4'
		}, {
			name: 'pamela lacatracha'
		}],
		slogan: 'If you beat us, we fire you (get rekt)',
		wins: 0,
		losses: 0,
		winrate: 0,
		hobbies: 'code, meetings, summits',
		teamName: 'Policia Militar'
	}],

	getTeam: function(id) {
		var team = this.teams.filter(function(team) {
			return team.id === parseInt(id, 10);
		});

		return team.length > 0 ? team[0] : {
			'error': 'Todo not found'
		};
	},

	find: function(params, callback) {
		callback(null, this.teams);
	},

	get: function(id, params, callback) {
		try {
			callback(null, this.getTeam(id));
		} catch (error) {
			callback(error);
		}
	},

	create: function(data, params, callback) {
		data.id = this.id++;
		this.teams.push(data);
		callback(null, data);
	},

	update: function(id, data, params, callback) {
		try {
			var team = this.getTeam(id);
			var index = this.teams.indexOf(team);

			data.id = team.id;
			this.teams[index] = data;
			callback(null, data);
		} catch (error) {
			callback(error);
		}
	},

	remove: function(id, params, callback) {
		var team = this.getTeam(id);
		var index = this.teams.indexOf(team);

		this.teams.splice(index, 1);
		callback(null, team);
	}
};