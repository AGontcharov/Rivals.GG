angular
	.module('myApp')
	.controller('homeCtrl', ['$scope', 'session', 'userService', function($scope, session, userService) {

	// Should these be declared in scope or?
	var selected = 'profile';
	var subSelected = 'solo';

	$scope.username = session.user;
	$scope.profile =true;
	$scope.rankedSolo = true;
	$scope.rankedFlex = false;
	$scope.accountResults = false;

	$scope.isActive = function(location) {
		if (location == 'solo' || location === 'flex') return subSelected === location;
		else return selected === location;		
	}

	$scope.change = function(location) {
		$scope.profile = false;
		$scope.league = false;
		$scope.champions = false;
		selected = location;

		console.log(location);
		$scope[location] = true;
	}

	$scope.switchLeague = function(league) {
		subSelected = league;

		if (league === 'flex') {
			$scope.rankedSolo = false;
			$scope.rankedFlex = true;
		}
		else {
			$scope.rankedFlex = false;
			$scope.rankedSolo = true;
		}
	}

	$scope.search = function(keyEvent) {
		if (keyEvent.which === 13) {
			$scope.findAccount();
		}
	}

	$scope.findAccount = function() {
		userService.getBySummoner($scope.accountRegion, $scope.accountName).then( function(response) {

			if (response.sucess) {
				console.log(response.data);
				$scope.result = response.data[0];
				$scope.accountResults = true;
			}
			else {
				console.log(response.message);
			}
		});
	}
}]);