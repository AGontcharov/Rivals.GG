var request = require('request');
var async = require('async');
var config = require('../../config.json');
var jwt = require('jsonwebtoken');

module.exports = function (req, res) {

  start();

  function start() {
    var summoners = req.params.summoners.split('+');
    console.log(req.params);
    console.log(summoners);

    async.map(summoners, accountInfo, function(err, results) {
      if (!err) {
        console.log('Finished: ', results);
        res.send(results);
      }
      else {
        console.log('Error: ' + err);
      }
    });
  }

  // Get summoner general info
  function accountInfo(name, callback) {
    var requestURL = req.params.region + '.api.riotgames.com/lol/summoner/v3/summoners/by-name/' + name;
    console.log(requestURL);

    request('https://' + requestURL + '?api_key=' + config.apiKey, function(error, response, body) {

      // Better message to send later?
      if (error) {
        return res.status(404).send(error);
      }
      else {
        console.log('statusCode:', response && response.statusCode);
        var apiResponse = JSON.parse(body);

        var entry = {
          result : true,
          summonerID: apiResponse.id,
          profileIcon: apiResponse.profileIconId,
          summonerName: apiResponse.name,
          summonerLevel: apiResponse.summonerLevel,
          lastActivity: apiResponse.revisionDate
        };
        rankedInfo(entry, callback);
      } 
    });
  }

  // Get summoner ranked info 
  function rankedInfo(obj, callback) {
    var requestURL = req.params.region + '.api.riotgames.com/lol/league/v3/positions/by-summoner/' + obj.summonerID;
    console.log(requestURL);

    request('https://' + requestURL + '?api_key=' + config.apiKey, function (error, response, body) {

      // Better message to send later?
      if (error) {
        return res.status(404).send(error);
      }

      console.log('statusCode:', response && response.statusCode);
      var apiResponse = JSON.parse(body);
      console.log(apiResponse);

      // Initialize summoner icons
      obj.soloIcon = 'base-icons/provisional';
      obj.soloActive = false;
      obj.flexIcon = 'base-icons/provisional';
      obj.flexActive = false;

      if (apiResponse.length) {

        for (i = 0; i < apiResponse.length; i++) {

          if (apiResponse[i].queueType === 'RANKED_SOLO_5x5') {
            obj.soloActive = true;
            obj.soloIcon = '/tier-icons/' + apiResponse[i].tier + '_' + apiResponse[i].rank;
            obj.soloLeagueName = apiResponse[i].leagueName;
            obj.soloTier = apiResponse[i].tier;
            obj.soloDivision = apiResponse[i].rank;
            obj.soloLP = apiResponse[i].leaguePoints;
            obj.soloWins = apiResponse[i].wins;
            obj.soloLosses = apiResponse[i].losses;
          }
          else {
            obj.flexActive = true;
            obj.flexIcon = '/tier-icons/' + apiResponse[i].tier + '_' + apiResponse[i].rank;
            obj.flexLeagueName = apiResponse[i].leagueName;
            obj.flexTier = apiResponse[i].tier;
            obj.flexDivision = apiResponse[i].rank;
            obj.flexLP = apiResponse[i].leaguePoints;
            obj.flexWins = apiResponse[i].wins;
            obj.flexLosses = apiResponse[i].losses;
          }
        }
      }
    callback(null, obj);
    });   
  }
}