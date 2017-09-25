var db = require('../database');
var config = require('../../config.json');
var jwt = require('jsonwebtoken');

module.exports = {

	createUser: function(req, res, next) {
		console.log(req.body);

		db.query("SELECT * FROM User WHERE Username=?", req.body.username, function(err, rows, fields) {
			if (err) throw err;
			console.log(rows);

			if (!rows.length) {
				console.log("User not created yet");

				var args = [req.body.email, req.body.username, req.body.password];

				db.query("INSERT INTO User (Email, Username, Password) VALUES(?,?,?)", args, function (err, rows, fields) {
					if (err) throw err;
					console.log(rows);

					var token = jwt.sign({username: req.body.username}, config.jwtKey, {expiresIn: '10m'});
					console.log('Token:', token);
					res.status(201).send(token);
				});
			}	
			else res.status(409).send('Account already exists');
		});
	},

	getUser: function(req, res, next) {
		console.log(req.body);

		db.query("SELECT * FROM User WHERE Username=?", req.body.username, function(err, rows, fields) {
			if (err) throw err;
			console.log(rows);

			if (!rows.length) {
				return res.status(401).send('Username or password is incorrect');
			}

			if (req.body.username == rows[0].Username && req.body.password == rows[0].Password) {
				var token = jwt.sign({username: rows[0].Username}, config.jwtKey, {expiresIn: '10m'});
				console.log('Token:', token);
				res.status(200).send(token);
			}
			else {
				res.status(401).send('Username or password is incorrect');
			}
		});
	}
}