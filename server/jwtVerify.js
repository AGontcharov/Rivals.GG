var jwt = require('jsonwebtoken');
var config = require('../config.json');

module.exports = function(req, res, next) {

  // Get the Authorization header from request
  var bearerHeader = req.get('Authorization');
  var token = bearerHeader.split(' ')[1];

  // Verify the jwt token
  jwt.verify(token, config.jwtKey, function(err, decoded) {

    if (err) {
      console.log(err);

      // 400 Bad request
      if (err.message === 'jwt malformed' || err.message === 'jwt signature is required') {
        return res.status(400).send(err.message);
      }
      // 401 Unathorized
      else return res.status(401).send(err.message);
    }

    // Success
    res.locals.username = decoded.username;
    console.log('Token verfied');
    next();
  });
}