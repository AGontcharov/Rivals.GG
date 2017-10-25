var db = require('../database/database');

module.exports = {

  /**
   * Create user's summoner account resource
   * @params {Object} req - The request object
   * @params {Object} res- The response object
   * @params {Function} next - the callback for the next matching route
   * @returns {HTTP 201 on success, HTTP 409 on failure}
   */
  createAccount: function(req, res, next) {
    console.log(req.body);
    console.log(res.locals.username);

    // Get user ID
    db.query("SELECT ID FROM User WHERE username=?", res.locals.username, function(err, rows, fields) {
      if (err) throw err;
      console.log(rows);

      var userID = rows[0].ID;

      // Inner join user ID on Summoner ID
      var query = "SELECT * FROM Summoner INNER JOIN User ON Summoner.ID = User.ID WHERE User.ID=?";
      db.query(query, rows[0].ID, function(err, rows, fields) {

        if (err) throw err;
        console.log(rows);

        // No summoner account found
        if (!rows.length) {
          console.log('No summoner account found for User');

          // Create Summoner account
          var args = [req.body.summonerID, userID, req.body.summonerName, req.body.profileIcon, req.body.region, req.body.summonerLevel, req.body.lastActivity];
          db.query("INSERT INTO Summoner VALUES (?, ?, ?, ?, ?, ?, ?)", args, function(err, rows, field) {

            if (err) throw err;
            console.log(rows);

            next();
          });
        }

        //HTTP 409 Conflict
        else return res.status(409).send('Summoner account already exists');
      });
    });
  },

  /**
   * Get user's summoner account resource
   * @params {Object} req - the request object
   * @params {Object} res - the response object
   * @params {Function} next - the callback for the next matching route
   * @returns {HTTP 200 on success, HTTP 404 on failure}
   */
  getAccount: function(req, res, next) {
    // console.log(req.body);
    console.log(res.locals.username);

    // Get user ID
    db.query("SELECT ID FROM User WHERE username=?", res.locals.username, function(err, rows, fields) {
      if (err) throw err;
      console.log(rows);

      // Inner join User.ID on Summoner.ID
      var query = "SELECT Name, Region FROM Summoner INNER JOIN User ON Summoner.ID = User.ID WHERE User.ID=?";
      db.query(query, rows[0].ID, function(err, rows, fields) {

        if (err) throw err;
        console.log(rows);

        // HTTP 404 Not Found
        if (!rows.length) {
          return res.status(404).send('No summoner account found for ' + res.locals.username);
        }

        // HTTP 200 Ok
        else return res.status(200).send({ account: rows[0].Name, region: rows[0].Region });
      });
    });
  },

  /**
   * Create solo league resource for user's summoner account
   * @params {Object} req - The request object
   * @params {Object} res - The response object
   * @params {Function} next - The callback for the next matching route
   * @returns {HTTP 201 on success, HTTP 409 on failure}
   */
  createAccountSolo: function(req, res, next) {
    console.log(req.body);

    if (req.body.soloActive) {
      
      // Create solo league stats
      var args = [
        req.body.summonerID, 
        req.body.soloIcon, 
        req.body.soloLeagueName, 
        req.body.soloTier, 
        req.body.soloDivision, 
        req.body.soloLP, 
        req.body.soloWins, 
        req.body.soloLosses 
      ];
      
      db.query("INSERT INTO Solo VALUES (?, ?, ?, ?, ?, ?, ?, ?)", args, function(err, rows, fields) {
        if (err) throw err;
        console.log(rows);
      });
    }
    next();
  }, 

  /**
   * Create flex league resource for user's summoner account
   * @params {Object} req - The request object
   * @params {Object} res - The response object
   * @params {Function} next - The callback for the next matching route
   * @returns {HTTP 201 on success, HTTP 409 on failure}
   */
  createAccountFlex: function(req, res, next) {
    console.log(req.body);

    console.log('flexActive: ', req.body.flexActive);
    if (req.body.flexActive) {

      // Create flex league stats
      var args = [
        req.body.summonerID, 
        req.body.flexIcon, 
        req.body.flexLeagueName, 
        req.body.flexTier, 
        req.body.flexDivision, 
        req.body.flexLP, 
        req.body.flexWins, 
        req.body.flexLosses 
      ];

      db.query("INSERT INTO Flex VALUES (?, ?, ?, ?, ?, ?, ?, ?)", args, function(err, rows, fields) {
        if (err) throw err;
        console.log(rows);
      });
    }
    next();
  }
}