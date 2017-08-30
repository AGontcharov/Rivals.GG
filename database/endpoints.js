var express = require('express');

module.exports = function(db) {
	var apiRouter = express.Router();

	/* Router middleware for every request. */
	apiRouter.use(function(req, res, next) {
		console.log(req.method, req.url);
		next();
	});

	apiRouter.get('/users/:username', function(req, res) {

		db.query("SELECT * FROM users WHERE username='" + req.params.username + "'", function(err, result, fields) {
			if (err) throw err;
			console.log(result);

			if (!result.length) {
				res.status(401).send('Username or password is incorrect');
			}

			// Set cookie here?
			else {
				res.send(result);
			}
		});
	});

	apiRouter.get('/search/:region/:summoners', require('./resources/summoner.js'));

	apiRouter.post('/users', function(req, res) {
		console.log(req.body);
		db.query("SELECT * FROM users WHERE username='" + req.body.username + "'", function(err, result, fields) {
			if (err) throw err;
			console.log(result);

			if (!result.length) {
				console.log("user doesn't yet");

				// authentication here?

				db.query("INSERT INTO users (email, username, password) VALUES('" + req.body.email + "', '" + req.body.username + "', '" + req.body.password + "')", function (err, result, fields) {
					if (err) throw err;
					console.log(result);
				});
			}	
			else res.status(409).send('Account already exists');
		})
	});

	return apiRouter;
}