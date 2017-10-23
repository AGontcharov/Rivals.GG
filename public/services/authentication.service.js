angular
	.module('myApp')
	.factory('authentication', ['$cookies', '$location', 'userService', 'session', function($cookies, $location, userService, session) {

	// Create a service object. 
	var authService = {};

	authService.login = function(user, success, error) {
		console.log('Authenticating ' + user.username + ': ' + user.password);

		userService.login(user).then(function(response) {
			delete user.password;
			authService.createSession(user);
			success(user);
			
		}, function(response) {
			delete user.password;
			error(response.message)
		});
	}

	authService.createSession = function(user) {

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

	authService.refreshSession = function() {
		if ($cookies.get('user')) {
			var cookie = JSON.parse($cookies.get('user'));
			console.log('cookie:', cookie);
			session.create(cookie.username, cookie.role, cookie.token);
		}
	}

	authService.isAuthenticated = function() {
		return !!session.user;
	};

	authService.logout = function() {
		session.destroy();
		$cookies.remove('user');
		$location.path('/login');
	};

	return authService;	
}]);
