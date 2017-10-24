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
				authentication.createSession($scope.account, response);
				$location.path('/home');
			})
			.catch(function(response) {
				$scope.error = true;
			})
			.finally(function(response) {
				// Delete passwords and reset the form
				delete $scope.account.password;
				delete $scope.account.confirmPassword;
				$scope.registerForm.$setPristine();
			});
		}
	}
})();