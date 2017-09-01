var request = require('request');
var async = require('async');
var config = require('../../config.json');

module.exports = function (req, res) {
	var API_KEY = config.apiKey;
	
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

	function accountInfo(name, callback) {
		var requestURL = req.params.region + '.api.riotgames.com/lol/summoner/v3/summoners/by-name/' + name;
		console.log(requestURL);

		request('https://' + requestURL + '?api_key=' + API_KEY, function(error, response, body) {
			console.log('statusCode:', response && response.statusCode);

			if (response.statusCode == 404 ) {
				res.send(error);
			}
			else {
				var apiResponse = JSON.parse(body);

				var entry = {
					result : true,
					summonerId: apiResponse.id,
					profileIcon: apiResponse.profileIconId,
					summonerName: apiResponse.name,
					summonerLevel: apiResponse.summonerLevel,
					lastActivity: apiResponse.revisionDate
				};
				rankedInfo(entry, callback);
			}	
		});
	}

	function rankedInfo(obj, callback) {
		var requestURL = req.params.region + '.api.riotgames.com/lol/league/v3/positions/by-summoner/' + obj.summonerId;
		console.log(requestURL);

		request('https://' + requestURL + '?api_key=' + API_KEY, function (error, response, body) {
			console.log('statusCode:', response && response.statusCode);

			if (response.statusCode == 404) {
				res.send(error);
			}
			else {
				var apiResponse = JSON.parse(body);

				if (0 < apiResponse.length) {
					obj.soloActive = true;
					obj.soloIcon = '/tier-icons/' + apiResponse[0].tier + '_' + apiResponse[0].rank;
					obj.soloLeagueName = apiResponse[0].leagueName;
					obj.soloTier = apiResponse[0].tier;
					obj.soloDivision = apiResponse[0].rank;
					obj.soloLP = apiResponse[0].leaguePoints;
					obj.soloWins = apiResponse[0].wins;
					obj.soloLosses = apiResponse[0].losses;
				}
				else {
					obj.soloIcon = 'base-icons/provisional';
					obj.soloActive = false;
				}

				if (1 < apiResponse.length) {
					obj.flexActive = true;
					obj.flexIcon = '/tier-icons/' + apiResponse[1].tier + '_' + apiResponse[1].rank;
					obj.flexLeagueName = apiResponse[1].leagueName;
					obj.flexTier = apiResponse[1].tier;
					obj.flexDivision = apiResponse[1].rank;
					obj.flexLP = apiResponse[1].leaguePoints;
					obj.flexWins = apiResponse[1].wins;
					obj.flexLosses = apiResponse[1].losses;
				}
				else {
					obj.flexIcon = 'base-icons/provisional';
					obj.flexActive = false;
				}
			}
			callback(null, obj);
		});		
	}
}