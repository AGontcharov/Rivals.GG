(function() {
	'use strict';

	angular
		.module('myApp')
		.controller('home', ['$scope', '$location', 'session', 'accountService', 'summonerService', home]);

	function home($scope, $location, session, accountService, summonerService) {

		// Private variables
		var selected = 'profile';

		activate();

		// Sets the active class for the items in the home subnavbar
		$scope.isActive = function(location) {
			return selected === location;
		}

		// Sets the scope variables profile, league, champions
		$scope.switchTo = function(location) {			
			$scope.profile = false;
			$scope.league = false;
			$scope.champions = false;

			// Show the container and change active class
			selected = location;
			$scope[location] = true;
		}

		// Private function
		function activate() {
			$scope.username = session.user;
			$scope.profile = true;
		}
	}
})();