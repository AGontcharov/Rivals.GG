angular
	.module('myApp')
	.controller('registerCtrl', ['$scope', '$location', 'userService', function($scope, $location, userService) {
		
	$scope.submit = function() {
		if (!$scope.registerForm.$invalid) {

			// Delete passwords and reset the form
			delete $scope.account.password;
			delete $scope.account.confirmPassword;
			$scope.registerForm.$setPristine();

			// Success callback
			userService.create($scope.account).then(function(response) {
				console.log('User created');
				$location.path('/login');

			// Error callback
			}, function(response) {
				console.error(response.message);
				$scope.error = true;
			});
		}
	}
}]);