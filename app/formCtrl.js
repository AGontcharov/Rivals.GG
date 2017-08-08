angular
	.module('myApp')
	.controller('formCtrl', ['$scope', '$http', function($scope, $http) {
		var requestURL;
		var summonerId;
		var records = [];

		$scope.search = function() {
			var string = $scope.name;
			var res = string.split(',');
			console.log(res);
			$scope.missing = false;

			for (s of res) {
				requestURL = $scope.region + '.api.riotgames.com/lol/summoner/v3/summoners/by-name/' + s;
				console.log(requestURL);

				$http({
					method: 'GET',
					url: 'http://127.0.0.1:5000',
					params: { "url": requestURL }
				}).then(function successCallback(response) {
					console.log(response.status);
					// console.log(response.data);

					summonerId = response.data.id;
					console.log(summonerId);

					var entry =
					{
						result : true,
						profileIcon : response.data.profileIconId,
						summonerName : response.data.name,
						summonerLevel : response.data.summonerLevel,
						lastActivity : response.data.revisionDate
					}
					ranked(summonerId, entry);
					records.push(entry);

				}, function errorCallback(response) {
					console.log(response.status);
					console.log(response.data);
					$scope.missing = true;
				});
			}
			console.log(records);
			$scope.records = records;
		}

		function ranked(id, obj) {
			requestURL = $scope.region + '.api.riotgames.com/lol/league/v3/positions/by-summoner/' + id;

			$http({
				method: 'GET',
				url: 'http://127.0.0.1:5000',
				params: { "url": requestURL }
			}).then(function successCallback(response) {
				console.log('Queue:', response.status);

				if (0 < response.data.length) {
					obj.soloActive = true;
					obj.soloIcon = '/tier-icons/' + response.data[0].tier + '_' + response.data[0].rank;
					obj.soloLeagueName = response.data[0].leagueName;
					obj.soloTier = response.data[0].tier;
					obj.soloDivision = response.data[0].rank;
					obj.soloLP = response.data[0].leaguePoints;
					obj.soloWins = response.data[0].wins;
					obj.soloLosses = response.data[0].losses;
				}
				else {
					obj.soloIcon = 'base-icons/provisional';
					obj.soloActive = false;
				}

				if (1 < response.data.length) {
					obj.flexActive = true;
					obj.flexIcon = '/tier-icons/' + response.data[1].tier + '_' + response.data[1].rank;
					obj.flexLeagueName = response.data[1].leagueName;
					obj.flexTier = response.data[1].tier;
					obj.flexDivision = response.data[1].rank;
					obj.flexLP = response.data[1].leaguePoints;
					obj.flexWins = response.data[1].wins;
					obj.flexLosses = response.data[1].losses;
				}
				else {
					obj.flexIcon = 'base-icons/provisional';
					obj.flexActive = false;
				}

			}, function errorCallback(response) {
				console.log('Queue:', response.status);
				console.log(response.data);
			});
		}
}]);