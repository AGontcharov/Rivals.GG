angular
	.module('myApp')
	.controller('homeCtrl', ['$scope', 'session', 'userService', function($scope, session, userService) {

	var selected = 'profile';
	var subSelected = 'solo';
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
					$scope.findAccount('na1', response.data.account)
					$scope.summonerAccount = true;
				}
			}
			else {
				console.log(response.message);
			}
		})
	}

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
		console.log('Adding: ', $scope.accountName);

		userService.addLolAccount( { account: $scope.accountName }).then( function(response) {

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