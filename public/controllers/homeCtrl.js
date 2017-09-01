angular
	.module('myApp')
	.controller('homeCtrl', ['$scope', 'session', function($scope, session) {

	$scope.username = session.user;

	$scope.addSummoner = function() {
		console.log('In addSummoner');
	}
}]);