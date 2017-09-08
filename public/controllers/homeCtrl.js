angular
	.module('myApp')
	.controller('homeCtrl', ['$scope', 'session', 'userService', function($scope, session, userService) {

	$scope.username = session.user;

	$scope.findAccount = function() {
		console.log('In findAccount');

		userService.getBySummoner($scope.accountRegion, $scope.accountName).then( function(response) {

			if (response.sucess) {
				console.log(response.data);
			}
			else {
				console.log(response.message);
			}
		});
	}
}]);