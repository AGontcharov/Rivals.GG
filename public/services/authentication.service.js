angular
	.module('myApp')
	.factory('authentication', ['$http', '$cookies', 'userService', 'session', function($http, $cookies, userService, session) {

	// Create a service object. 
	var authService = {};

	authService.login = function(user, success, error) {
		console.log('Authenticating ' + user.username + ': ' + user.password);

		userService.login(user).then(function(response) {
			delete user.password;

			var cookie = {
				username: user.username,
				role: 'guest',
				token: response.data 
			};

			// Create user session
			$cookies.put('user', JSON.stringify(cookie));
			session.create(cookie.username, cookie.role, cookie.token);
			success(user);
			
		}, function(response) {
			delete user.password;
			error(response)
		});
	}

	authService.refreshSession = function() {
		if ($cookies.get('user')) {
			var cookie = JSON.parse($cookies.get('user'));
			console.log(cookie);
			session.create(cookie.username, cookie.role, cookie.token);
		}
	}

	authService.isAuthenticated = function() {
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
