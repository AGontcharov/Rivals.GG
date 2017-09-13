var db = require('../database');
var config = require('../../config.json');
var jwt = require('jsonwebtoken');

module.exports = {

	createUser: function(req, res, next) {
		console.log(req.body);

		db.query("SELECT * FROM users WHERE Username=?", req.body.username, function(err, rows, fields) {
			if (err) throw err;
			console.log(rows);

			if (!rows.length) {
				console.log("User not created yet");

				// Was testing registration - remove later
				return res.end();

				db.query("INSERT INTO users (Email, Username, Password) VALUES(?,?,?)", [req.body.email, req.body.username, req.body.password], function (err, rows, fields) {
					if (err) throw err;
					console.log(rows);

					var token = jwt.sign({username: req.body.username}, config.jwtKey, {expiresIn: '10m'});
					console.log('Token:', token);
					res.send(token);
				});
			}	
			else res.status(409).send('Account already exists');
		});
	},

	// Change name?
	getUser: function(req, res, next) {
		console.log(req.body);

		db.query("SELECT * FROM users WHERE Username=?", req.body.username, function(err, rows, fields) {
			if (err) throw err;
			console.log(rows);

			if (!rows.length) {
				return res.status(401).send('Username or password is incorrect');
			}

			if (req.body.username == rows[0].Username && req.body.password == rows[0].Password) {
				var token = jwt.sign({username: rows[0].Username}, config.jwtKey, {expiresIn: '10m'});
				console.log('Token:', token);
				res.send(token);
			}
			else {
				res.status(401).send('Username or password is incorrect');
			}
		});
	},

	addAccount: function(req, res, next) {
		console.log(req.body);

		try {
			db.query("SELECT Account FROM users", function(err, rows, fields) {
				console.log('In try');
				// console.log(err);
				if (err) throw err;
			});			
		}
		catch (err) {
			console.log('In catch')
			console.log(err);
		}

			// if (err) throw err;
			
			// console.log(rows);
			// console.log(fields);

			// if (!rows.length) {
			// 	console.log('A league of legends account is not binded');
			// }

		res.end();
	}
}