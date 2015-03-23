var feathers = require('feathers');
var bodyParser = require('body-parser');

var teamService = require('./teams');

var app = feathers()
	.configure(feathers.rest())
	.configure(feathers.socketio())
	// Parse HTTP bodies
	.use(bodyParser.json())
	.use(bodyParser.urlencoded({
		extended: true
	}))
	// Host the current directory (for index.html)
	.use(feathers.static(__dirname + '/../public'))
	// Host our Todos service on the /todos path
	.use('/teams', teamService)
app.listen(3000);