angular
	.module('myApp')
	.controller('summonerCtrl', ['$scope', '$http', '$routeParams', 'searchQuery', function($scope, $http, $routeParams, searchQuery) {
	
	$scope.missing = false;

	if (!searchQuery.summoners) searchQuery.create($routeParams.region, $routeParams.name);

	$http.get(searchQuery.requestURL).then(function successCallback(response) {
		console.log('success');
		console.log(response.data);
		$scope.records = response.data;

	}, function errorCallback(response) {
		console.log(response.status);
		console.log(response.data);
		$scope.missing = true;
	});
	
}]);