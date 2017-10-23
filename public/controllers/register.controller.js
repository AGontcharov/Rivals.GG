(function() {
	'use strict';

	angular
		.module('myApp')
		.controller('register', ['$scope', '$location', 'userService', 'authentication', register]);

	function register($scope, $location, userService, authentication) {
			
		$scope.submit = function() {
			if ($scope.registerForm.$invalid) return;

			userService.create($scope.account)
			.then(function(response) {
				console.log('User created');

				// Create cookie and session
				authentication.createSession($scope.account, response);
				$location.path('/home');
			})
			.catch(function(response) {
				console.error(response.message);
				$scope.error = true;
			})
			.finally(function() {
				
				// Delete passwords and reset the form
				delete $scope.account.password;
				delete $scope.account.confirmPassword;
				$scope.registerForm.$setPristine();
			});
		}
	}
})();