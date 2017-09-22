angular
	.module('myApp')
	.controller('summonerCtrl', ['$scope', '$http', '$routeParams', 'searchQuery', 'userService', function($scope, $http, $routeParams, searchQuery, userService) {
	
	$scope.missing = false;

	if (!searchQuery.summoners) searchQuery.create($routeParams.region, $routeParams.name);

	userService.getBySummoner(searchQuery.region, searchQuery.requestURL).then(function(response) {
		console.log(response.data);
		$scope.records = response.data;

	}, function(response) {
		console.log(response.message);
		$scope.missing = true;
	});
	
}]);