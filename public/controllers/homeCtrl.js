angular
	.module('myApp')
	.controller('homeCtrl', ['$scope', 'session', function($scope, session) {

	$scope.username = session.user;

	$scope.findAccount = function() {
		console.log('In findAccount');
		console.log($scope.accountName);

		
	}

}]);