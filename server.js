var express = require('express');
var bodyParser = require('body-parser');
var db = require('./database/database');
var app = express();

app.use('/', express.static(__dirname + '/app'));
app.use(bodyParser.json());

var routes = require('./database/routes')(app, __dirname, db);

app.listen(3000, function() {
	console.log("Listening on port 3000");
});