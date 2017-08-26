module.exports = function(app, dirname, db) {
	var request = require('request');
	var API_KEY = 'RGAPI-0eb3d11d-0b2e-4fb3-b96c-026541f55939';

	app.get('/summoner/:region/:query', function(req, res) {
		var records = [];

		console.log(req.params);
		var query = req.params.query.split('+');
		console.log(query);

		for (s of query) {
			var requestURL = req.params.region + '.api.riotgames.com/lol/summoner/v3/summoners/by-name/' + s;
			console.log(requestURL);

			request('https://' + requestURL + '?api_key=' + API_KEY, function (error, response, body) {
				console.log('statusCode:', response && response.statusCode);

				if (response.statusCode == 404 ) {
					res.send(error);
				}
				else {
					var apiResponse = JSON.parse(body);

					var entry = {
						result : true,
						summonerId : apiResponse.id,
						profileIcon : apiResponse.profileIconId,
						summonerName : apiResponse.name,
						summonerLevel : apiResponse.summonerLevel,
						lastActivity : apiResponse.revisionDate
					}
					rankedInfo(entry)
					records.push(entry);
				}
			});
		}
		

		function rankedInfo(obj) {
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
					console.log(obj);
				}
			});				
		}
	});

	app.get('*', function(req, res) {
		res.sendFile(dirname + '/app/index.html');
	});

	app.post('/createAccount', function(req, res) {
		console.log(req.body);

	});

	app.post('/login', function(req, res) {
		console.log(req.body);
		db.query("SELECT * FROM users WHERE username='" + req.body.username + "'", function(err, result, fields) {
			if (err) throw err;
			res.send(result);
		});
	});
}