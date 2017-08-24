module.exports = function(app, dirname, db) {

	app.get('/', function(req, res) {
		res.sendFile(dirname + '/index.html');
	});

	// app.get('/test', function(req, res) {
	// 	db.query("SELECT * FROM users", function(err, result, fields) {
	// 		if (err) throw err;
	// 		res.send(JSON.stringify(result));
	// 	});
	// });

	app.post('/createAccount', function(req, res) {
		console.log(req.body);
	});

	app.post('/login', function(req, res) {
		console.log(req.body.username);
		db.query("SELECT * FROM users WHERE username='" + req.body.username + "'", function(err, result, fields) {
			if (err) throw err;
			res.send(result);
		});
	});
}