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

module.exports = connection;