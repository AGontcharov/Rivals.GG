var mysql = require('mysql');
var connection = mysql.createConnection({
	host: '127.0.0.1',
	user: 'rivals.gg',
	password: 'E33e70yop',
	database: 'rivals'
});

connection.connect(function(err) {
	if (err) throw err;
	console.log('Connected!');

	// var sql = "CREATE TABLE users (id int auto_increment primary key, email varchar(255), username varchar(255), password varchar(255))";
	// connection.query(sql, function(err, result) {
	// 	if (err) throw err;
	// 	console.log("Table created");
	// });
});