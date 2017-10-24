/**
 * @namespace auth_factories
 * @memberOf angular_module.app_auth
 */
(function() {
	'use strict';

	angular
		.module('app.auth')
		.factory('authentication', ['$cookies', 'userService', 'session', authentication]);

	/**
 	* @class authentication
 	* @description Provides simple authentication against users
 	* @memberOf angular_module.app_auth.auth_factories
 	*/
	function authentication($cookies, userService, session) {

		var service = {
			createSession: createSession,
			refreshSession: refreshSession,
			isAuthenticated: isAuthenticated,
			logout: logout
		};

		return service;

		/**
		 * @function createSession
		 * @description Creates the user's session
		 * @param {Object} user - The users's credentials
		 * @memberOf angular_module.app_auth.auth_factories.authentication
		 */
		function createSession(user) {

			// Initialize cookie
			var cookie = {
				username: user.username,
				role: 'guest',
				token: $cookies.get('token')
			};

			// Create user session
			$cookies.put('user', JSON.stringify(cookie));
			session.create(cookie.username, cookie.role, cookie.token);
		}

		/**
		 * @function createSession
		 * @description Refreshes the user's session
		 * @memberOf angular_module.app_auth.auth_factories.authentication
		 */
		function refreshSession() {
			if ($cookies.get('user')) {
				var cookie = JSON.parse($cookies.get('user'));
				console.log('cookie:', cookie);
				session.create(cookie.username, cookie.role, cookie.token);
			}
		}

		/**
		 * @function isAuthenticated
		 * @description Checks if the user is authenticated
		 * @return {Boolean}
		 * @memberOf angular_module.app_auth.auth_factories.authentication
		 */
		function isAuthenticated() {
			return !!session.user;
		};

		/**
		 * @function logout
		 * @description Logs the user out, deleting his session in the process
		 * @memberOf angular_module.app_auth.auth_factories.authentication
		 */
		function logout() {
			session.destroy();
			$cookies.remove('user');
		};
	}
})();