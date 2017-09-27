var express = require('express');
var bodyParser = require('body-parser');
var users = require('./resources/users');
var account = require('./resources/account');
var jwtVerify = require('./jwtVerify');

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
  apiRouter.post('/users/login', users.authenticateUser);

  // Verify all request made to these endpoints
  apiRouter.use(jwtVerify);

  apiRouter.post('/users/accounts', account.createAccount);
  apiRouter.get('/users/accounts', account.getAccount);

  // Must go here to prevent conflict
  apiRouter.get('/users/:username', users.getUser);
  apiRouter.delete('/users/:username', users.deleteUser);

  apiRouter.post('/users/accounts/solo', account.createAccountSolo);
  apiRouter.post('/users/accounts/flex', account.createAccountFlex);

  apiRouter.get('/search/:region/:summoners', require('./resources/summoner'));

  return apiRouter;
}