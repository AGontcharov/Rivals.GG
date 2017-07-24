angular
	.module('myApp')
	.controller('formCtrl', ['$scope', '$http', function($scope, $http) {
		var requestURL;

		$scope.search = function() {
			console.log($scope.summonerName);
			console.log($scope.region);

			requestURL = $scope.region + '.api.riotgames.com/lol/summoner/v3/summoners/by-name/' + $scope.summonerName
			console.log(requestURL);

			// Simple GET request example:
			$http({
				method: 'GET',
				url: 'http://127.0.0.1:5000',
				params: { "url": requestURL }
			}).then(function successCallback(response) {
				console.log('sucess!');
				console.log(response.data);
				// This callback will be called asynchronously when the response is available

			}, function errorCallback(response) {
				// Called asynchronously if an error occurs or server returns response with an error status.
				console.log('Error!');
				console.log(response);
			});
		}
}]);