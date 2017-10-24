(function() {
	'use strict';

	angular
		.module('app.auth')
		.factory('authentication', ['$cookies', 'userService', 'session', authentication]);

	function authentication($cookies, userService, session) {

		var service = {
			createSession: createSession,
			refreshSession: refreshSession,
			isAuthenticated: isAuthenticated,
			logout: logout
		};

		return service;

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

		function refreshSession() {
			if ($cookies.get('user')) {
				var cookie = JSON.parse($cookies.get('user'));
				console.log('cookie:', cookie);
				session.create(cookie.username, cookie.role, cookie.token);
			}
		}

		function isAuthenticated() {
			return !!session.user;
		};

		function logout() {
			session.destroy();
			$cookies.remove('user');
		};
	}
})();