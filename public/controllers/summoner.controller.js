(function() {
	'use strict';

	angular
		.module('myApp')
		.controller('summoner', ['$scope', '$routeParams', 'searchQuery', 'summonerService', summoner]);

	function summoner($scope, $routeParams, searchQuery, summonerService) {
		$scope.missing = false;
		if (!searchQuery.summoners) searchQuery.create($routeParams.region, $routeParams.name);

		// Get summoner(s)
		summonerService.getBySummoner(searchQuery.region, searchQuery.requestURL)
		.then(function(response) {
			console.log(response.data);
			$scope.records = response.data;
		})
		.catch(function(response) {
			console.log(response.message);
			$scope.missing = true;
		});
	}
})();