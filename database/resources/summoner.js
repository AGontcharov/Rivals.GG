var request = require('request');
var async = require('async');
var config = require('../../config.json');

module.exports = function (req, res) {

  start();

  /**
   * Begin search by summoner name and region
   * @returns {HTTP 200 on success}
   */
  function start() {

    // Split up multiple summoners in request paramter
    var summoners = req.params.summoners.split('+');
    console.log(req.params);
    console.log(summoners);

    // Get account information for each summoner
    async.map(summoners, accountInfo, function(err, results) {
      if (!err) {
        console.log('Finished: ', results);

        // HTTP 200 Ok
        return res.status(200).send(results);
      }
      else {
        console.log('Error: ' + err);
      }
    });
  }

  /**
   * Get summoner information
   * @params {String} name - The summoner name to look up
   * @params {Function} callback - The async callback for async.map
   */
  function accountInfo(name, callback) {
    var requestURL = req.params.region + '.api.riotgames.com/lol/summoner/v3/summoners/by-name/' + name;
    console.log(requestURL);

    // Makes a request to Riot Games
    request('https://' + requestURL + '?api_key=' + config.apiKey, function(error, response, body) {

      // Better message to send later?
      if (error) return res.status(404).send(error);
      
      console.log('statusCode:', response && response.statusCode);
      var apiResponse = JSON.parse(body);

      // Summoner info
      var entry = {
        result : true,
        summonerID: apiResponse.id,
        profileIcon: apiResponse.profileIconId,
        summonerName: apiResponse.name,
        summonerLevel: apiResponse.summonerLevel,
        lastActivity: apiResponse.revisionDate
      };

      rankedInfo(entry, callback);
    });
  }

  /**
   * Get summoner ranked stats
   * @params {Object} obj - The entry representing the summoner
   * @params {Function} callback - The async callback for async.map
   */
  function rankedInfo(obj, callback) {
    var requestURL = req.params.region + '.api.riotgames.com/lol/league/v3/positions/by-summoner/' + obj.summonerID;
    console.log(requestURL);

    // Makes a request to Riot Games
    request('https://' + requestURL + '?api_key=' + config.apiKey, function (error, response, body) {

      // Better message to send later?
      if (error) return res.status(404).send(error);

      console.log('statusCode:', response && response.statusCode);
      var apiResponse = JSON.parse(body);
      console.log(apiResponse);

      // Initialize league variables
      obj.soloIcon = 'base-icons/provisional';
      obj.soloActive = false;
      obj.flexIcon = 'base-icons/provisional';
      obj.flexActive = false;

      // Found ranked stats from Riot Games
      if (apiResponse.length) {
        for (i = 0; i < apiResponse.length; i++) {

          // Ranked solo stats
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

          // Ranked flex stats
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