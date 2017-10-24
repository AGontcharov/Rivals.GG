/**
 * Authentication Factory
 * @namespace Factories
 */
(function() {
	'use strict';

	angular
		.module('app.auth')
		.factory('authentication', ['$cookies', 'userService', 'session', authentication]);

	/**
	 * @namespace Authentication
	 * @description Provides simple authentication against users
	 * @memberOf Factories
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
		 * @name createSession
		 * @description Creates the user's session
		 * @param {Object} user - The users's credentials
		 * @memberOf Factories.Authentication
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
		 * @name createSession
		 * @description Refreshes the user's session
		 * @memberOf Factories.Authentication
		 */
		function refreshSession() {
			if ($cookies.get('user')) {
				var cookie = JSON.parse($cookies.get('user'));
				console.log('cookie:', cookie);
				session.create(cookie.username, cookie.role, cookie.token);
			}
		}

		/**
		 * @name isAuthenticated
		 * @description Checks if the user is authenticated
		 * @return {Boolean}
		 * @memberOf Factories.Authentication
		 */
		function isAuthenticated() {
			return !!session.user;
		};

		/**
		 * @name logout
		 * @description Logs the user out, deleting his session in the process
		 * @memberOf Factories.Authentication
		 */
		function logout() {
			session.destroy();
			$cookies.remove('user');
		};
	}
})();