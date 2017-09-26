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

      // Inner join user ID on Summoner ID
      var query = "SELECT * FROM Summoner INNER JOIN User ON Summoner.ID = User.ID WHERE User.ID=?";
      db.query(query, rows[0].ID, function(err, rows, fields) {

        if (err) throw err;
        console.log(rows);

        // No summoner account found
        if (!rows.length) {
          console.log('No summoner account found for User');

          // Create Summoner account
          var args = [req.body.summonerID, userID, req.body.name, req.body.profileIconID, req.body.region, req.body.level, req.body.revisionDate];
          db.query("INSERT INTO Summoner VALUES (?, ?, ?, ?, ?, ?, ?)", args, function(err, rows, field) {

            if (err) throw err;
            console.log(rows);

            // HTTP 201 Created
            return res.status(201).send('Summoner account added');
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
    console.log(res.locals.username);

    // Inner join Summoner.SummonerID on Solo.SummonerID
    var query = "SELECT * FROM Solo INNER JOIN Summoner ON Solo.SummonerID = Summoner.SummonerID WHERE Solo.SummonerID=?";
    db.query(query, req.body.summonerID, function(err, rows, fields) {

      if (err) throw err;
      console.log(rows);

      // No solo league stats found
      if (!rows.length) {
        console.log('No solo league stats found for summoner account');

        // Create solo league stats
        var args = [req.body.summonerID, req.body.icon, req.body.leagueName, req.body.tier, req.body.division, req.body.leaguePoints, req.body.wins, req.body.losses];
        db.query("INSERT INTO Solo VALUES (?, ?, ?, ?, ?, ?, ?, ?)", args, function(err, rows, fields) {

          if (err) throw err;
          console.log(rows);

          // HTTP 201 Created
          return res.status(201).send('Ranked solo league stats added for summoner account');
        });
      }

      // HTTP 409 Conflict
      else return res.status(409).send('Ranked Solo league stats already exist for summoner');
    });
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
    console.log(res.locals.username);

    // Inner join Summoner.SummonerID on flex.SummonerID
    var query = "SELECT * FROM Flex INNER JOIN Summoner ON Flex.SummonerID = Summoner.SummonerID WHERE Flex.SummonerID=?";
    db.query(query, req.body.summonerID, function(err, rows, fields) {

      if (err) throw err;
      console.log(rows);

      // No flex league stats found
      if (!rows.length) {
        console.log('No ranked Flex stats found');

        // Create flex league stats
        var args = [req.body.summonerID, req.body.icon, req.body.leagueName, req.body.tier, req.body.division, req.body.leaguePoints, req.body.wins, req.body.losses];
        db.query("INSERT INTO Flex VALUES (?, ?, ?, ?, ?, ?, ?, ?)", args, function(err, rows, fields) {

          if (err) throw err;
          console.log(rows);

          // HTTP 201 Created
          return res.status(201).send('Ranked Flex League added');
        });
      }

      // HTTP 409 Conflict
      else return res.status(409).send('Ranked Flex stats alrady exist for summoner');
    });
  }
}