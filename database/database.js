var mysql = require('mysql');

// Configure the database
var connection = mysql.createConnection({
	host: '127.0.0.1',
	user: 'rivals.gg',
	password: '',
	database: 'rivals_gg'
});

// Connect to the database
connection.connect(function(err) {
	if (err) throw err;
	console.log('Database Connected!');
});

module.exports = connection;