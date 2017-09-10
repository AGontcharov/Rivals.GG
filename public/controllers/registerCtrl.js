angular
	.module('myApp')
	.controller('registerCtrl', ['$scope', '$location', 'userService', function($scope, $location, userService) {
		
		$scope.submit = function() {
			if (!$scope.registerForm.$invalid) register($scope.account);
		}

		function register(user) {
			console.log(user);
			userService.create(user);
		}
}]);