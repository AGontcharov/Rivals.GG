var db = require('../database');
var config = require('../../config.json');
var jwt = require('jsonwebtoken');

module.exports = {

  /**
   * Creates a user resource
   * @params {Object} req - The request object
   * @params {Object} res - The response object
   * @params {function} next - The callback for the next matching route
   * @returns {HTTP 201 on success, HTTP 409 on failure}
   */
  createUser: function(req, res, next) {
    console.log(req.body);

    db.query("SELECT * FROM User WHERE Username=? LIMIT 1", req.body.username, function(err, rows, fields) {
      if (err) throw err;
      console.log(rows);

      if (!rows.length) {
        console.log("User not created yet");

        // Create user account and send token
        var args = [req.body.email, req.body.username, req.body.password];
        db.query("INSERT INTO User (Email, Username, Password) VALUES(?,?,?)", args, function (err, rows, fields) {
          if (err) throw err;
          console.log(rows);

          // HTTP 201 Created
          var token = jwt.sign({username: req.body.username}, config.jwtKey, {expiresIn: '10m'});
          return res.status(201).send(token);
        });
      }

      // HTTP 409 Conflict
      else return res.status(409).send('Username already exists');
    });
  },

  /**
   * Gets a user resource
   * @params {Object} the request object
   * @params {Object} the response object
   * @params {Function} the callback for the next matching route
   * @returns {HTTP 200 on success, HTTP 401 on failure}
   */
  getUser: function(req, res, next) {
    console.log(req.body);

    db.query("SELECT * FROM User WHERE Username=? LIMIT 1", req.body.username, function(err, rows, fields) {
      if (err) throw err;
      console.log(rows);

      if (!rows.length) {
        return res.status(401).send('Username or password is incorrect');
      }

      // HTTP 200 OK
      if (req.body.username == rows[0].Username && req.body.password == rows[0].Password) {
        var token = jwt.sign({username: rows[0].Username}, config.jwtKey, {expiresIn: '10m'});
        return res.status(200).send(token);
      }

      // HTTP 401 Unauthorized
      else return res.status(401).send('Username or password is incorrect');
    });
  }
}