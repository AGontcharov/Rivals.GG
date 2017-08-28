angular
	.module('myApp')
	.controller('registerCtrl', ['$scope', '$location', 'userService', function($scope, $location, userService) {

		$scope.register = function() {
			console.log($scope.account);
			userService.create($scope.account);
		}
}]);