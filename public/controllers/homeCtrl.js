angular
	.module('myApp')
	.controller('homeCtrl', ['$scope', 'session', 'userService', function($scope, session, userService) {

	$scope.username = session.user;
	$scope.accountResults = false;

	$scope.findAccount = function() {
		console.log('In findAccount');

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