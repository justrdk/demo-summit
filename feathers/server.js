var feathers = require('feathers');
var bodyParser = require('body-parser');

var teamService = require('./teams');

var app = feathers()
	.configure(feathers.rest())
	.configure(feathers.socketio())
	.use(bodyParser.json())
	.use(bodyParser.urlencoded({
		extended: true
	}))
	.use(feathers.static(__dirname + '/../public'))
	.use('/teams', teamService);
	
app.listen(3000);