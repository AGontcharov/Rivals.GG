var db = require('../database');
var config = require('../../config.json');
var jwt = require('jsonwebtoken');

module.exports = {

  createAccount: function(req, res, next) {

    // Verify the jwt token
    jwt.verify(req.get('auth-token'), config.jwtKey, function(err, decoded) {

      if (err) {
        console.log(err);

        // 400 Bad request
        if (err.message === 'jwt malformed' || err.message === 'jwt signature is required') {
          return res.status(400).send(err.message);
        }
        // 401 Unathorized
        else return res.status(401).send(err.message);
      }

      console.log(req.body);
      console.log(decoded.username);

      // Get user ID
      db.query("SELECT ID FROM User WHERE username=?", decoded.username, function(err, rows, fields) {
        if (err) throw err;
        console.log(rows);

        var userID = rows[0].ID;
        var query = "SELECT * FROM Summoner INNER JOIN User ON Summoner.ID = User.ID WHERE User.ID=?";

        // Get summoner name linked to user ID
        db.query(query, userID, function(err, rows, fields) {
          if (err) throw err;
          console.log(rows);

          // No summoner account bound to user ID
          if (!rows.length) {
            console.log('No summoner account found for User');

            // Create account
            var args = [req.body.summonerID, userID, req.body.name, req.body.profileIconID, req.body.region, req.body.level, req.body.revisionDate];
            db.query("INSERT INTO Summoner VALUES (?, ?, ?, ?, ?, ?, ?)", args, function(err, rows, field) {
              if (err) throw err;
              console.log(rows);

              res.status(201).send('Account added');
            });
          }
          else res.status(409).send('Account already tied to user');
        });
      });
    });
  },

  getAccount: function(req, res, next) {

    // Verify the jwt token
    jwt.verify(req.get('auth-token'), config.jwtKey, function(err, decoded) {

      if (err) {
        console.log(err);

        // 400 Bad request
        if (err.message === 'jwt malformed' || err.message === 'jwt signature is required') {
          return res.status(400).send(err.message);
        }
        // 401 Unathorized
        else return res.status(401).send(err.message);
      }

      console.log(req.body);
      console.log(decoded.username);

      // Get user ID
      db.query("SELECT ID FROM User WHERE username=?", decoded.username, function(err, rows, fields) {
        if (err) throw err;
        console.log(rows);

        var userID = rows[0].ID;
        var query = "SELECT Name, Region FROM Summoner INNER JOIN User ON Summoner.ID = User.ID WHERE User.ID=?";

        db.query(query, userID, function(err, rows, fields) {
          if (err) throw err;
          console.log(rows);

          if (!rows.length) {
            console.log('No account is tied to user ' + decoded.username);
            res.status(404).send('No account listed for ' + decoded.username);
          }
          else {
            console.log('Found account ' + rows[0].Name);
            res.status(200).send({ account: rows[0].Name, region: rows[0].Region });
          }
        });
      });
    });
  },

  updateAccount: function(req, res, next) {

    // Verify the jwt token
    jwt.verify(req.get('auth-token'), config.jwtKey, function(err, decoded) {

      if (err) {
        console.log(err);

        // 400 Bad request
        if (err.message === 'jwt malformed' || err.message === 'jwt signature is required') {
          return res.status(400).send(err.message);
        }
        // 401 Unathorized
        else return res.status(401).send(err.message);
      }

      console.log(req.body);
      console.log(decoded.username);
    });
  },

  createAccountSolo: function(req, res, next) {

    // Verify the jwt token
    jwt.verify(req.get('auth-token'), config.jwtKey, function(err, decoded) {

      if (err) {
        console.log(err);

        // 400 Bad request
        if (err.message === 'jwt malformed' || err.message === 'jwt signature is required') {
          return res.status(400).send(err.message);
        }
        // 401 Unathorized
        else return res.status(401).send(err.message);
      }

      console.log(req.body);
      console.log(decoded.username);

      var query = "SELECT * FROM Solo INNER JOIN Summoner ON Solo.SummonerID = Summoner.SummonerID WHERE Solo.SummonerID=?";
      db.query(query, req.body.summonerID, function(err, rows, fields) {
        if (err) throw err;
        console.log(rows);

        if (!rows.length) {
          console.log('No ranked solo stats found');

          var args = [req.body.summonerID, req.body.icon, req.body.leagueName, req.body.tier, req.body.division, req.body.leaguePoints, req.body.wins, req.body.losses];
          console.log(args);

          db.query("INSERT INTO Solo VALUES (?, ?, ?, ?, ?, ?, ?, ?)", args, function(err, rows, fields) {
            if (err) throw err;
            console.log(rows);

            res.status(201).send('Ranked Solo League added');
          });
        }
        else res.status(409).send('Ranked Solo stats alrady exist for summoner');
      });
    });
  }, 

  createAccountFlex: function(req, res, next) {

    // Verify the jwt token
    jwt.verify(req.get('auth-token'), config.jwtKey, function(err, decoded) {

      if (err) {
        console.log(err);

        // 400 Bad request
        if (err.message === 'jwt malformed' || err.message === 'jwt signature is required') {
          return res.status(400).send(err.message);
        }
        // 401 Unathorized
        else return res.status(401).send(err.message);
      }

      console.log(req.body);
      console.log(decoded.username);
      console.log(req.body.summonerID);

      var query = "SELECT * FROM Flex INNER JOIN Summoner ON Flex.SummonerID = Summoner.SummonerID WHERE Flex.SummonerID=?";
      db.query(query, req.body.summonerID, function(err, rows, fields) {
        if (err) throw err;
        console.log(rows);

        if (!rows.length) {
          console.log('No ranked Flex stats found');

          var args = [req.body.summonerID, req.body.icon, req.body.leagueName, req.body.tier, req.body.division, req.body.leaguePoints, req.body.wins, req.body.losses];
          console.log(args);

          db.query("INSERT INTO Flex VALUES (?, ?, ?, ?, ?, ?, ?, ?)", args, function(err, rows, fields) {
            if (err) throw err;
            console.log(rows);

            res.status(201).send('Ranked Flex League added');
          });
        }
        else res.status(409).send('Ranked Flex stats alrady exist for summoner');
      });
    });
  }
}