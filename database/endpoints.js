var express = require('express');
var bodyParser = require('body-parser');
var users = require('./resources/users');
var account = require('./resources/account');

module.exports = function(db) {
  var apiRouter = express.Router();

  // Parses JSON content type
  apiRouter.use(bodyParser.json());

  // Router middleware for every request. 
  apiRouter.use(function(req, res, next) {
    console.log(req.method, req.url);
    next();
  });

  apiRouter.post('/users', users.createUser);

  apiRouter.post('/users/login', users.getUser);

  apiRouter.post('/users/account', account.createAccount);

  apiRouter.get('/users/account', account.getAccount);

  // apiRouter.put('/users/account', users.updateAccount);

  apiRouter.post('/users/account/solo', account.createAccountSolo);

  apiRouter.post('/users/account/flex', account.createAccountFlex);

  apiRouter.get('/search/:region/:summoners', require('./resources/summoner.js'));

  return apiRouter;
}