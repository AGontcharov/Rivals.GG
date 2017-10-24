(function() {
	'use strict';

	angular
		.module('myApp')
		.controller('home', ['$scope', '$location', 'session', 'accountService', 'summonerService', home]);

	function home($scope, $location, session, accountService, summonerService) {

		// Private variables
		var selected = 'profile';
		var leagueSelected = 'solo';

		activate();

		// Sets the active class for the items in the home subnavbar
		$scope.isActive = function(location) {

			// Add active class for sublinks solo and flex
			if (location === 'solo' || location === 'flex') return leagueSelected === location;

			// Add active class for profile, league and champion
			else return selected === location;		
		}

		// Sets the scope variables profile, league, champions
		$scope.show = function(location) {
			
			// Set the current selected location in the summary
			selected = location;
			
			// Resets all scope variables
			$scope.profile = false;
			$scope.league = false;
			$scope.champions = false;

			// Sets the scope variable and shows the container
			$scope[location] = true;
		}

		// Sets the scope variables rankedSolo and RankedFlex
		$scope.switchLeague = function(league) {

			// Sets the current selected league type in the league container
			leagueSelected = league;

			// Shows the ranked flex league
			if (league === 'flex') {
				$scope.rankedSolo = false;
				$scope.rankedFlex = true;
			}

			// Shows the ranked solo league
			else {
				$scope.rankedFlex = false;
				$scope.rankedSolo = true;
			}
		}

		$scope.go = function(location) {
			$location.path(location);
		}

		// Searches account on Enter key press inside the input
		$scope.search = function(keyEvent) {
			if (keyEvent.which === 13) $scope.findAccount();
		}

		// Finds summoner account based on region and name
		$scope.findAccount = function(region, name) {
			summonerService.getBySummoner(region, name)
			.then(function(response) {
				console.log(response.data);
				$scope.result = response.data[0];
				$scope.accountSearch = true;
			})
			.catch(function(response) {
				console.log(response.message);
			});
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
			$scope.rankedSolo = true;
			$scope.rankedFlex = false;
			$scope.summonerAccount = false;
			$scope.accountSearch = false;

			// Pretty big logic to keep private and not be able to test - any argument?
			accountService.getByAccount()
			.then(function(response) {
				$scope.accountSearch = true;
				$scope.summonerAccount = true;
				$scope.findAccount(response.data.region, response.data.account);

			})
			.catch(function(response) {
				console.log(response.message);
			});
		}
	}
})();