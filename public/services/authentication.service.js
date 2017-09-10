angular
	.module('myApp')
	.factory('authentication', ['$http', '$rootScope', '$cookies', 'userService', 'session', 'AUTH_EVENTS', function($http, $rootScope, $cookies, userService, session, AUTH_EVENTS) {

	// Create a service object. 
	var authService = {};

	authService.login = function(user, success, error) {
		console.log('Authenticating ' + user.username + ': ' + user.password);
		console.log(user);

		userService.login(user).then(function(response) {
			if (response.sucess) {
				// delete user.password;

				var cookie = {
					username: user.username,
					role: 'guest',
					token: response };

				// Create user session
				$cookies.put('user', JSON.stringify(cookie));
				session.create(cookie.username, cookie.role, cookie.token);
				success(user);
			}
			else {
				error(response);
			}

		}, function errorCallBack(response) {
			error();
		});
	}

	authService.getCookie = function() {
		if ($cookies.get('user')) {
			var cookie = JSON.parse($cookies.get('user'));
			console.log(cookie);
			session.create(cookie.username, cookie.role, cookie.token);
		}
	}

	authService.isAuthenticated = function() {
		console.log(!!session.user);
		return !!session.user;
	};

	authService.isAuthorized = function() {

	};

	authService.logout = function() {
		session.destroy();
		$cookies.remove('user');
	};

	return authService;	
}]);
