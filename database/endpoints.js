module.exports = function(app, dirname, db) {
	var express = require('express');
	var apiRouter = express.Router();


	/* Router middleware for every request. */
	apiRouter.use(function(req, res, next) {
		console.log(req.method, req.url);
		next();
	});

	app.get('/api/users/:username', function(req, res) {
		console.log('Am I here?');
		console.log(req.body);
		console.log(req.param.username);
		db.query("SELECT * FROM users WHERE username='" + req.param.username + "'", function(err, result, fields) {
			if (err) throw err;
			res.send(result);
		});
	});


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

	apiRouter.get('/users/:username', function(req, res) {
		console.log(req.body);
		db.query("SELECT * FROM users WHERE username='" + req.param.username + "'", function(err, result, fields) {
			if (err) throw err;
			res.send(result);
		});
	});

	apiRouter.get('/search/:region/:summoners', require('./resources/summoner.js'));

	app.get('*', function(req, res) {
		res.sendFile(dirname + '/public/index.html');
	});

	// Use the api router
	app.use('/api', apiRouter);
}