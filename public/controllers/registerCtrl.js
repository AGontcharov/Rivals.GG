angular
	.module('myApp')
	.controller('registerCtrl', ['$scope', '$location', 'userService', function($scope, $location, userService) {

		$scope.submit = function() {
			if (!$scope.registerForm.$invalid) $scope.register($scope.account);
			else return;
		}

		$scope.register = function(user) {
			console.log(user);
			userService.create(user);
		}
}]);