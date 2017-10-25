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

		// Updates the user with their summoner account
		// Split ranked solo and flex as private functions?
		$scope.addAccount = function() {

			// Get account details
			var account = {
				summonerID: $scope.result.summonerID,
				name: $scope.result.summonerName,
				profileIconID: $scope.result.profileIcon,
				region: $scope.summoner.region,
				level: $scope.result.summonerLevel,
				revisionDate: $scope.result.lastActivity
			};

			// Create account
			accountService.createAccount(account)
			.then(function(response) {

				console.log(response.data);
				$scope.summonerAccount = true;

				// Create ranked solo
				if ($scope.result.soloActive) {

					var stats = {
						summonerID: $scope.result.summonerID,
						icon: $scope.result.soloIcon, 
						leagueName: $scope.result.soloLeagueName,
						tier: $scope.result.soloTier,
						division: $scope.result.soloDivision,
						leaguePoints: $scope.result.soloLP,
						wins: $scope.result.soloWins,
						losses: $scope.result.soloLosses
					}
					console.log(stats);

					accountService.createSoloLeague(stats)
					.then(function(response) {
						console.log(response.data);
					})
					.catch(function(response) {
						console.log(response.message);
					});			
				}

				// Create ranked flex
				if ($scope.result.flexActive) {

					var stats = {
						summonerID: $scope.result.summonerID,
						icon: $scope.result.flexIcon, 
						leagueName: $scope.result.flexLeagueName,
						tier: $scope.result.flexTier,
						division: $scope.result.flexDivision,
						leaguePoints: $scope.result.flexLP,
						wins: $scope.result.flexWins,
						losses: $scope.result.flexLosses
					}
					console.log(stats);

					accountService.createFlexLeague(stats)
					.then(function(response) {
						console.log(response.data);
					})
					.catch(function(response) {
						console.log(response.message);
					});			
				}
			})
			.catch(function(response) {
				console.log(response.message);
			});	
		}

		// Private function
		function activate() {
			$scope.username = session.user;
			$scope.profile = true;
		}
	}
})();