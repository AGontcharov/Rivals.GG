(function() {
	'use strict';

	angular
		.module('myApp')
		.controller('register', ['$scope', '$location', 'userService', 'authentication', register]);

	/**
	 * @class angular_module.app.register
	 * @description Controller that handles user register
	 * @memberOf angular_module.app
	 */
	function register($scope, $location, userService, authentication) {
			
		/**
		 * @function submit
		 * @description Registers the user in if the form is valid
		 * @memberOf angular_module.app.register
		 */
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