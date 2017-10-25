(function() {
	'use strict';

	angular
		.module('myApp')
		.controller('account', ['$scope', '$location', 'session', 'userService', 'authentication', account]);

	/**
	 * @class account
	 * @description Controller that handles the user functionality
	 * @memberOf angular_module.app.controllers
	 */
	function account($scope, $location, session, userService, authentication) {

		activate();

		/**
		 * @function updateEmail
		 * @description Updates the user's email
		 * @memberOf angular_module.app.account
		 */
		$scope.updateEmail = function() {

		}

		/**
		 * @function changePass
		 * @description Changes the user's password
		 * @memberOf angular_module.app.account
		 */
		$scope.changePass = function() {

		}

		/**
		 * @function deleteAccount
		 * @description Deletes the user's account
		 * @memberOf angular_module.app.account
		 */
		$scope.deleteAccount = function() {

			userService.deleteByUsername(session.user)
			.then(function(response) {
				authentication.logout();
				$location.path('/login');
			})
			.catch(function(response) {
				console.log(response.message);
			});
		}

		/**
		 * @function activate
		 * @private
		 * @description Loads the user's account
		 * @memberOf angular_module.app.account
		 */
		function activate() {

			// Get user information
			userService.getByUsername(session.user)
			.then(function(response) {
				$scope.account = { email: response.data.email, username: session.user };
			})
			.catch(function(response) {
				console.log(response.message);
			});
		}
	}
})();