angular
	.module('myApp')
	.controller('registerCtrl', ['$scope', '$location', 'userService', function($scope, $location, userService) {

		$scope.passwordMismatch = false;
		
		$scope.submit = function() {
			if (!$scope.registerForm.$invalid) {
				if (!passwordValidate()) register($scope.account);
				else $scope.passwordMismatch = true;
			} 
			else return;
		}

		function passwordValidate() {
			return $scope.password === $scope.confirmPassword ? true : false;
		}

		function register(user) {
			console.log(user);
			userService.create(user);
		}
}]);