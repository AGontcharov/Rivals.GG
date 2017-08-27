var express = require('express');
var app = express();

// Middleware needed to parse the body of a request
var bodyParser = require('body-parser');

// Loads the database module to cofigure and connect to the mysql database
var db = require('./database/database');

// Serves static contents from the /public folder
app.use('/', express.static(__dirname + '/public'));

// Parses JSON content type
app.use(bodyParser.json());

var api = require('./database/endpoints')(app, __dirname, db);

app.listen(3000, function() {
	console.log("Listening on port 3000");
});