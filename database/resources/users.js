var db = require('../database');
var jwt = require('jsonwebtoken');

module.exports = {

	createUser: function(req, res, next) {
		console.log(req.body);

		db.query("SELECT * FROM users WHERE Username=?", req.body.username, function(err, rows, fields) {
			if (err) throw err;
			console.log(rows);
			console.log(rows.length);
			console.log(!rows.length);

			if (!rows.length) {
				console.log("User not created yet");

				// Was testing something ealier - password mismatch
				return res.end();

				db.query("INSERT INTO users (Email, Username, Password) VALUES(?,?,?)", [req.body.email, req.body.username, req.body.password], function (err, rows, fields) {
					if (err) throw err;
					console.log(rows);

					var token = jwt.sign({username: req.body.username}, 'test', {expiresIn: '2m'});
					console.log('Token:', token);
					res.send(token);
				});
			}	
			else res.status(409).send('Account already exists');
		});
	},

	getUser: function(req, res, next) {
		console.log(req.body);

		db.query("SELECT * FROM users WHERE Username=?", req.body.username, function(err, rows, fields) {
			if (err) throw err;
			console.log(rows);

			if (!rows.length) {
				return res.status(401).send('Username or password is incorrect');
			}

			if (req.body.username == rows[0].Username && req.body.password == rows[0].Password) {
				console.log('Credentials match');
				var token = jwt.sign({username: rows[0].username}, 'test', {expiresIn: '2m'});
				console.log('Token:', token);
				res.send(token);
			}
			else {
				console.log("Credentials don't match");
				res.status(401).send('Username or password is incorrect');
			}
		});
	},

	updateUser: function(req, res, next) {
		console.log(req.body);
	}
}