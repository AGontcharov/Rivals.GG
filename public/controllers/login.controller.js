(function() {
	'use strict';

	angular
		.module('myApp')
		.controller('login', ['$scope', '$location', 'userService', 'authentication', login]);

	/**
	 * @class angular_module.app.login
	 * @description Controller that handles user login
	 * @memberOf angular_module.app
	 */
	function login($scope, $location, userService, authentication) {
		
		/**
		 * @function submit
		 * @description Logs the user in if the form is valid
		 * @memberOf angular_module.app.login
		 */
		$scope.submit = function() {
			if ($scope.loginForm.$invalid) return;

			userService.login($scope.credentials)
			.then(function(response) {
				authentication.createSession($scope.credentials, response);
				$location.path('/home');
			})
			.catch(function(response) {
				$scope.error = true;
			})
			.finally(function(response) {
				// Delete passwords and reset the form
				delete $scope.credentials.password;
				$scope.loginForm.$setPristine();
			});
		}
	}
})();