(function() {
	'use strict';

	angular
		.module('myApp')
		.controller('summoner', ['$scope', '$routeParams', 'searchQuery', 'summonerService', summoner]);

	/**
	 * @class summoner
	 * @description Controller that loads the summoner(s) search results
	 * @memberOf angular_module.app.controllers
	 */
	function summoner($scope, $routeParams, searchQuery, summonerService) {

		activate();

		/**
		 * @function activate
		 * @private
		 * @description Loads the summoner(s) search results
		 * @memberOf angular_module.app.summoner
		 */
		function activate() {
			if (!searchQuery.summoners) searchQuery.create($routeParams.name);

			// Get summoner(s)
			summonerService.getBySummoner($routeParams.region, searchQuery.requestURL)
			.then(function(response) {
				$scope.records = response.data;
			})
			.catch(function(response) {
				$scope.missing = true;
			});
		}
	}
})();