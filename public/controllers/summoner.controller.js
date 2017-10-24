(function() {
	'use strict';

	angular
		.module('myApp')
		.controller('summoner', ['$scope', '$routeParams', 'searchQuery', 'summonerService', summoner]);

	/**
	 * @class angular_module.app.summoner
	 * @description Controller that loads the summoner(s) search results
	 * @memberOf angular_module.app
	 */
	function summoner($scope, $routeParams, searchQuery, summonerService) {
		$scope.missing = false;

		activate();

		/**
		 * @function activate
		 * @private
		 * @description Loads the summoner(s) search results
		 * @memberOf angular_module.app.summoner
		 */
		function activate() {
			if (!searchQuery.summoners) searchQuery.create($routeParams.region, $routeParams.name);

			// Get summoner(s)
			summonerService.getBySummoner(searchQuery.region, searchQuery.requestURL)
			.then(function(response) {
				console.log(response.data);
				$scope.records = response.data;
			})
			.catch(function(response) {
				$scope.missing = true;
			});
		}
	}
})();