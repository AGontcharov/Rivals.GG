module.exports = function(app, dirname, db) {

	app.get('/', function(req, res) {
		res.sendFile(dirname + '/index.html');
	});

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