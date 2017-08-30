angular
	.module('myApp')
	.controller('homeCtrl', ['$scope', 'session', function($scope, session) {

	$scope.username = session.user;
}]);