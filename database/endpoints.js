var express = require('express');
var bodyParser = require('body-parser');
var users = require('./resources/users');

module.exports = function(db) {
	var apiRouter = express.Router();

	// Parses JSON content type
	apiRouter.use(bodyParser.json());

	// Router middleware for every request. 
	apiRouter.use(function(req, res, next) {
		console.log(req.method, req.url);
		next();
	});

	apiRouter.post('/users/', users.createUser);

	apiRouter.post('/users/login', users.getUser);

	// apiRouter.post('/users/:id');

	apiRouter.get('/search/:region/:summoners', require('./resources/summoner.js'));

	return apiRouter;
}