module.exports = function(app, dirname, db) {

	app.get('/api/search/:region/:summoners', require('./resources/summoner.js'));

	app.get('*', function(req, res) {
		res.sendFile(dirname + '/public/index.html');
	});

	app.post('/api/users', function(req, res) {
		console.log(req.body);
		db.query("SELECT * FROM users WHERE username='" + req.body.username + "'", function(err, result, fields) {
			if (err) throw err;
			console.log(result);

			if (!result.length) {
				console.log("user doesn't yet");

				// authentication here?
				// console.log("INSERT INTO users VALUES('" + req.body.email + "', '" + req.body.username + "', '" + req.body.password + "'')");

				db.query("INSERT INTO users (email, username, password) VALUES('" + req.body.email + "', '" + req.body.username + "', '" + req.body.password + "')", function (err, result, fields) {
					if (err) throw err;
					console.log(result);
				});
			}	
			else res.status(409).send('Account already exists');
		})
	});

	app.post('/api/login', function(req, res) {
		console.log(req.body);
		db.query("SELECT * FROM users WHERE username='" + req.body.username + "'", function(err, result, fields) {
			if (err) throw err;
			res.send(result);
		});
	});
}