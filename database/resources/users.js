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

				// Was testing registration - remove later
				// return res.end();

				db.query("INSERT INTO User (Email, Username, Password) VALUES(?,?,?)", [req.body.email, req.body.username, req.body.password], function (err, rows, fields) {
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
	},

	createAccount: function(req, res, next) {

		// Verify the jwt token
		jwt.verify(req.get('auth-token'), config.jwtKey, function(err, decoded) {

			if (err) {
				console.log(err);

				// 400 Bad request
				if (err.message === 'jwt malformed' || err.message === 'jwt signature is required') {
					return res.status(400).send(err.message);
				}
				// 401 Unathorized
				else return res.status(401).send(err.message);
			}

			console.log(req.body);
			console.log(decoded.username);

			// Get user ID
			db.query("SELECT ID FROM User WHERE username=?", decoded.username, function(err, rows, fields) {
				if (err) throw err;
				console.log(rows);

				var userID = rows[0].ID;
				var query = "SELECT Name FROM Summoner INNER JOIN User ON Summoner.ID = User.ID WHERE User.ID=?";

				// Get summoner name linked to user ID
				db.query(query, userID, function(err, rows, fields) {
					if (err) throw err;
					console.log(rows);

					// No summoner account bound to user ID
					if (!rows.length) {
						console.log('No summoner account found for User');

						// Create account
						var args = [req.body.summonerID, userID, req.body.name, req.body.profileIconID, req.body.region, req.body.level, req.body.revisionDate];
						db.query("INSERT INTO Summoner VALUES (?, ?, ?, ?, ?, ?, ?)", args, function(err, rows, field) {
							if (err) throw err;
							console.log(rows);

							res.status(201).send('Account added');
						});
					}
					else return res.status(409).send('Account already tied to user');
				});
			});
		});
	},

	getAccount: function(req, res, next) {

		// Verify the jwt token
		jwt.verify(req.get('auth-token'), config.jwtKey, function(err, decoded) {

			if (err) {
				console.log(err);

				// 400 Bad request
				if (err.message === 'jwt malformed' || err.message === 'jwt signature is required') {
					return res.status(400).send(err.message);
				}
				// 401 Unathorized
				else return res.status(401).send(err.message);
			}

			console.log(req.body);
			console.log(decoded.username);

			// Get user ID
			db.query("SELECT ID FROM User WHERE username=?", decoded.username, function(err, rows, fields) {
				if (err) throw err;
				console.log(rows);

				var userID = rows[0].ID;
				var query = "SELECT Name, Region FROM Summoner INNER JOIN User ON Summoner.ID = User.ID WHERE User.ID=?";

				db.query(query, userID, function(err, rows, fields) {
					if (err) throw err;
					console.log(rows);

					if (!rows.length) {
						console.log('No account is tied to user ' + decoded.username);
						res.status(404).send({ result: false });
					}
					else {
						console.log('Found account ' + rows[0].Name);
						res.status(200).send({ result: true, account: rows[0].Name, region: rows[0].Region });
					}
				});
			});


			// NEED TO UPDATE THIS
			/*db.query("SELECT * FROM Summoner WHERE Username=?", decoded.username, function(err, rows, fields) {
				if (err) throw err;
				console.log(rows);

				if (!rows[0].Account) {
					console.log('No account is tied to user ' + decoded.username);
					res.status(404).send({result: false});
				}
				else {

					// Hardcoded region for now
					console.log('Found account ' + rows[0].Account);
					res.status(200).send({result: true, account: rows[0].Account, region: 'na1'});
				}
			});*/
		});
	},

	updateAccount: function(req, res, next) {

		// Verify the jwt token
		jwt.verify(req.get('auth-token'), config.jwtKey, function(err, decoded) {

			if (err) {
				console.log(err);

				// 400 Bad request
				if (err.message === 'jwt malformed' || err.message === 'jwt signature is required') {
					return res.status(400).send(err.message);
				}
				// 401 Unathorized
				else return res.status(401).send(err.message);
			}

			console.log(req.body);

			db.query("UPDATE User SET Account=? WHERE Username=?", [req.body.account, decoded.username], function(err, rows, fields) {
				if (err) throw err;
				console.log(rows);
				
				res.status(200).send('Updated summoner account');
			});
		});
	}
}