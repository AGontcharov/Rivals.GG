angular
	.module('myApp')
	.controller('homeCtrl', ['$scope', 'session', 'userService', function($scope, session, userService) {

	var selected = 'profile';
	var leagueSelected = 'solo';
	init();

	function init() {
		$scope.username = session.user;
		$scope.profile =true;
		$scope.rankedSolo = true;
		$scope.rankedFlex = false;
		$scope.summonerAccount = false;
		$scope.accountSearch = false;

		userService.getByAccount().then( function(response) {
			if (response) {
				console.log(response.data);

				//For now - need to figure where to add region in database
				if (response.data.result) {
					$scope.accountSearch = response.data.result;
					$scope.findAccount(response.data.region, response.data.account)
					$scope.summonerAccount = true;
				}
			}
			else {
				console.log(response.message);
			}
		})
	}

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
		
		// Reset all scope variables
		$scope.profile = false;
		$scope.league = false;
		$scope.champions = false;

		// Set scope variables and shows the container
		$scope[location] = true;
	}

	// Sets the scope variables rankedSolo and RankedFlex
	$scope.switchLeague = function(league) {

		// Sets the current selected league type in the league container
		leagueSelected = league;

		// Show the ranked flex league
		if (league === 'flex') {
			$scope.rankedSolo = false;
			$scope.rankedFlex = true;
		}

		// Show the ranked solo league
		else {
			$scope.rankedFlex = false;
			$scope.rankedSolo = true;
		}
	}

	$scope.search = function(keyEvent) {
		if (keyEvent.which === 13) $scope.findAccount();
	}

	$scope.findAccount = function(region, account) {
		userService.getBySummoner(region, account).then( function(response) {

			if (response.sucess) {
				console.log(response.data);
				$scope.result = response.data[0];
				$scope.accountSearch = true;
			}
			else {
				console.log(response.message);
			}
		});
	}

	$scope.addAccount = function() {
		console.log('Adding: ', $scope.summonerName);

		userService.updateAccount( { account: $scope.summonerName }).then( function(response) {

			if (response.sucess) {
				console.log('Added league of legends main account');
				console.log(response.data);
			}
			else {
				console.log(response.message);
			}
		});
	}

}]);