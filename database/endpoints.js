var express = require('express');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');

module.exports = function(db) {
	var apiRouter = express.Router();

	// Parses JSON content type
	apiRouter.use(bodyParser.json());

	/* Router middleware for every request. */
	apiRouter.use(function(req, res, next) {
		console.log(req.method, req.url);
		next();
	});

	apiRouter.post('/users', require('./resources/user'));

	apiRouter.post('/users/login', function(req, res) {
		console.log(req.body);

		db.query("SELECT * FROM users WHERE username='" + req.body.username + "'", function(err, result, fields) {
			if (err) throw err;
			console.log(result);

			if (!result.length) {
				return res.status(401).send('Username or password is incorrect');
			}

			if (req.body.username == result[0].username && req.body.password == result[0].password) {
				console.log('Credentials match');
				var token = jwt.sign({username: result[0].username}, 'test', {expiresIn: '2m'});
				console.log(token);
				res.send(token);
			}
			else {
				res.status(401).send('Username or password is incorrect');
			}
		});
	});

	apiRouter.get('/search/:region/:summoners', require('./resources/summoner.js'));

	return apiRouter;
}