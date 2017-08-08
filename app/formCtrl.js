angular
	.module('myApp')
	.controller('formCtrl', ['$scope', '$http', function($scope, $http) {
		var requestURL;
		var summonerId;

		$scope.search = function() {
			requestURL = $scope.region + '.api.riotgames.com/lol/summoner/v3/summoners/by-name/' + $scope.name
			console.log(requestURL);

			$http({
				method: 'GET',
				url: 'http://127.0.0.1:5000',
				params: { "url": requestURL }
			}).then(function successCallback(response) {
				// This callback will be called asynchronously when the response is available			
				console.log(response.status);
				console.log(response.data);

				summonerId = response.data.id;
				console.log(summonerId);
				console.log(response.data.profileiconid);

				$scope.profileIcon = response.data.profileIconId;
				$scope.summonerName = response.data.name;
				$scope.summonerLevel = response.data.summonerLevel;
				$scope.lastActivity = response.data.revisionDate;
				ranked(summonerId);
				$scope.result = 'found';

			}, function errorCallback(response) {
				// Called asynchronously if an error occurs or server returns response with an error status.
				console.log(response.status);
				console.log(response.data);
				$scope.result = 'missing';

			});
		}

		function ranked(id) {
			requestURL = $scope.region + '.api.riotgames.com/lol/league/v3/positions/by-summoner/' + id;

			$http({
				method: 'GET',
				url: 'http://127.0.0.1:5000',
				params: { "url": requestURL }
			}).then(function successCallback(response) {
				console.log('Queue:', response.status);
				console.log(response.data);

				if (0 < response.data.length) {

					$scope.soloTierIcon = '/tier-icons/' + response.data[0].tier + '_' + response.data[0].rank;

					$scope.soloLeagueName = response.data[0].leagueName;
					$scope.soloTier = response.data[0].tier;
					$scope.soloDivision = response.data[0].rank;
					$scope.soloLP = response.data[0].leaguePoints;
					$scope.soloWins = response.data[0].wins;
					$scope.soloLosses = response.data[0].losses;
					$scope.soloActive = 'true';
				}
				else {
					$scope.soloActive = 'false';
					$scope.soloTierIcon = 'base-icons/provisional';
				}

				if (1 < response.data.length) {
					$scope.flexTierIcon = '/tier-icons/' + response.data[1].tier + '_' + response.data[1].rank;

					$scope.flexLeagueName = response.data[1].leagueName;
					$scope.flexTier = response.data[1].tier;
					$scope.flexDivision = response.data[1].rank;
					$scope.flexLP = response.data[1].leaguePoints;
					$scope.flexWins = response.data[1].wins;
					$scope.flexLosses = response.data[1].losses;
					$scope.flexActive = 'true';
				}
				else {
					$scope.flexActive = 'false';
					$scope.flexTierIcon = 'base-icons/provisional';
				}

			}, function errorCallback(response) {
				console.log('Queue:', response.status);
				console.log(response.data);
			});
		}
}]);