(function() {
	'use strict';

	angular
		.module('myApp')
		.factory('authentication', ['$cookies', '$location', 'userService', 'session', authentication]);

	function authentication($cookies, $location, userService, session) {

		var service = {
			login : login,
			createSession: createSession,
			refreshSession: refreshSession,
			isAuthenticated: isAuthenticated,
			logout: logout
		};

		return service;

		function login(user, success, error) {
			console.log('Authenticating ' + user.username + ': ' + user.password);

			userService.login(user).then(function(response) {
				delete user.password;
				createSession(user);
				success(user);
				
			}, function(response) {
				delete user.password;
				error(response.message)
			});
		}

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
			$location.path('/login');
		};
	}
})();