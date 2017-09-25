angular
	.module('myApp')
	.controller('registerCtrl', ['$scope', '$location', 'userService', 'authentication', function($scope, $location, userService, authentication) {
		
	$scope.submit = function() {
		if (!$scope.registerForm.$invalid) {

			// Success callback
			userService.create($scope.account).then(function(response) {
				console.log('User created');

				// Create cookie and session
				authentication.createSession($scope.account, response);

				// Redirect to dashboard
				$location.path('/home');

				// Delete passwords and reset the form
				delete $scope.account.password;
				delete $scope.account.confirmPassword;
				$scope.registerForm.$setPristine();

			// Error callback
			}, function(response) {
				console.error(response.message);
				$scope.error = true;

				// Delete passwords and reset the form
				delete $scope.account.password;
				delete $scope.account.confirmPassword;
				$scope.registerForm.$setPristine();
			});
		}
	}
}]);