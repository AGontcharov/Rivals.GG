var express = require('express');
var users = require('./resources/users');
var account = require('./resources/account');
var jwtVerify = require('./jwtVerify');

var apiRouter = express.Router();

// Router middleware for every request. 
apiRouter.use(function(req, res, next) {
  console.log(req.method, req.url);
  next();
});

apiRouter.post('/users', users.createUser);
apiRouter.post('/users/login', users.authenticateUser);

// Verify all request made to these endpoints
apiRouter.use(jwtVerify);

apiRouter.post('/users/accounts', 
    account.createAccount, 
    account.createAccountSolo, 
    account.createAccountFlex, 
    function(req, res, next) {
        return res.status(201).send('Summoner account added');
});

apiRouter.get('/users/accounts', account.getAccount);
apiRouter.get('/users/:username', users.getUser);
apiRouter.delete('/users/:username', users.deleteUser);

apiRouter.get('/search/:region/:summoners', require('./resources/summoner'));

module.exports = apiRouter;