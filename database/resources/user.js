var db = require('../database');
var jwt = require('jsonwebtoken');

module.exports = function(req, res) {
	console.log(req.body);

	db.query("SELECT * FROM users WHERE username='" + req.body.username + "'", function(err, result, fields) {
		if (err) throw err;
		console.log(result);

		if (!result.length) {
			console.log("User not created yet");

			db.query("INSERT INTO users (email, username, password) VALUES('" + req.body.email + "', '" + req.body.username + "', '" + req.body.password + "')", function (err, result, fields) {
				if (err) throw err;
				console.log(result);

				var token = jwt.sign({username: req.body.username}, 'test', {expiresIn: '2m'});
				console.log(token);
				res.send(token);
			});
		}	
		else res.status(409).send('Account already exists');
	});	
};