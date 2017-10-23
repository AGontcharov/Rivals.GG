(function() {
	'use strict';

	angular
		.module('myApp')
		.controller('summoner', ['$scope', '$routeParams', 'searchQuery', 'userService', summoner]);

	function summoner($scope, $routeParams, searchQuery, userService) {
		
		$scope.missing = false;

		if (!searchQuery.summoners) searchQuery.create($routeParams.region, $routeParams.name);

		userService.getBySummoner(searchQuery.region, searchQuery.requestURL).then(function(response) {
			console.log(response.data);
			$scope.records = response.data;

		}, function(response) {
			console.log(response.message);
			$scope.missing = true;
		});
		
	}
})();