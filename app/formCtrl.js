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
				console.log('Sucess!');
				console.log(response.data);

				// Check status code here

				summonerId = response.data.id;
				console.log(summonerId);

				$scope.summonerName = response.data.name;
				$scope.summonerLevel = response.data.summonerLevel;
				$scope.lastActivity = response.data.revisionDate;
				// This callback will be called asynchronously when the response is available

				ranked(summonerId);
				$scope.result = "found";

			}, function errorCallback(response) {
				// Called asynchronously if an error occurs or server returns response with an error status.
				console.log('Error!');
				console.log(response);
			});
		}

		function ranked(id) {
			requestURL = $scope.region + '.api.riotgames.com/lol/league/v3/positions/by-summoner/' + id;

			$http({
				method: 'GET',
				url: 'http://127.0.0.1:5000',
				params: { "url": requestURL }
			}).then(function successCallback(response) {
				console.log('Queue success');
				console.log(response.data);

				$scope.soloLeagueName = response.data[0].leagueName;
				$scope.soloTier = response.data[0].tier;
				$scope.soloDivision = response.data[0].rank;
				$scope.soloLP = response.data[0].leaguePoints;
				$scope.soloWins = response.data[0].wins;
				$scope.soloLosses = response.data[0].losses;

				$scope.flexLeagueName = response.data[1].leagueName;
				$scope.flexTier = response.data[1].tier;
				$scope.flexDivision = response.data[1].rank;
				$scope.flexLP = response.data[1].leaguePoints;
				$scope.flexWins = response.data[1].wins;
				$scope.flexLosses = response.data[1].losses;

			}, function errorCallback(response) {
				console.log('Queue Error!');
				console.log(response);
			});
		}
}]);