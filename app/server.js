var express = require('express');
var app = express();
var mysql = require('mysql');
var connection = mysql.createConnection({
	host: '127.0.0.1',
	user: 'rivals.gg',
	password: 'E33e70yop',
	database: 'rivals'
});

connection.connect(function(err) {
	if (err) throw err;
	console.log('Database Connected!');
});

app.use('/', express.static(__dirname));

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

app.get('/test', function(req, res) {
	connection.query("SELECT * FROM users", function(err, result, fields) {
		if (err) throw err;
		console.log(result);
		res.send(JSON.stringify(result));
	})
});

app.post('/login', function(req, res) {
	res.send('Fetching user');
});

app.listen(3000, function() {
	console.log("Listening on port 3000");
});