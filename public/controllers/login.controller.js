(function() {
	'use strict';

	angular
		.module('myApp')
		.controller('login', ['$scope', '$location', 'authentication', login]);

	function login($scope, $location, authentication) {

		$scope.submit = function() {
			$scope.error = false;

			if ($scope.loginForm.$invalid) return;
			
			$scope.loginForm.$setPristine();

			// Sucess callback
			authentication.login($scope.credentials, function(user) {
				console.log('Login controller authentication success');
				$location.path('/home');
				
			// Error callback
			}, function(err) {
				console.error(err);
				$scope.error = true;
			});
		}
	}
})();