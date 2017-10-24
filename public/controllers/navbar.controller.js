(function() {
	'use strict';

	angular
		.module('myApp')
		.controller('navbar', ['$scope', '$location', 'searchQuery', 'authentication', navbar]);

	/**
	 * @class navbar
	 * @description Controller that handles navbar functionality
	 * @memberOf angular_module.app.controllers
	 */
	function navbar($scope, $location, searchQuery, authentication) {

		/**
		 * @function isActive
		 * @param  {String}  viewLocation - The navbar link address
		 * @return {Boolean} True if current location matches navbar link adress, False otherwise
		 * @memberOf angular_module.app.controllers.navbar
		 */
		$scope.isActive = function (viewLocation) {
			return viewLocation === $location.path();
		}

		/**
		 * @function search
		 * @description Searches for the summoner names(s)
		 * @memberOf angular_module.app.controllers.navbar
		 */
		$scope.search = function() {
			searchQuery.create($scope.region, $scope.searchQuery);
			$location.path(searchQuery.route);
		}

		/**
		 * @function searchOnKey
		 * @description Submits the search on Enter key press
		 * @param  {Object} keyEvent - The key pressed
		 * @memberOf angular_module.app.controllers.navbar
		 */
		$scope.searchOnKey = function(keyEvent) {
			if (keyEvent.which === 13) $scope.search();
		}

		/**
		 * @function logout
		 * @description Logs the user out
		 * @memberOf angular_module.app.controllers.navbar
		 */
		$scope.logout = function() {
			authentication.logout();
			$location.path('/login');
		}
	}
})();