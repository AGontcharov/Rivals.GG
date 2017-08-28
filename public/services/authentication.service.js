angular
	.module('myApp')
	.factory('authentication', ['$http', '$rootScope', '$cookies', 'session', 'AUTH_EVENTS', function($http, $rootScope, $cookies, session, AUTH_EVENTS) {

		// Create a service object. 
		var authService = {};

		authService.login = function(user, success, error) {
			console.log('Authenticating ' + user.username + ': ' + user.password);

			$http.post('/api/login', user).then(function successCallBack(response) {
				console.log(response.data);

				if (user.username == response.data[0].username && user.password == response.data[0].password) {

					// Create user session
					$cookies.put('user', user.username);
					delete user.password;
					console.log(user);
					session.create(user);
					success(user);
				}
				else {
					error();
				}

			}, function errorCallBack(response) {
				console.log(response.status);
				console.log(response.data);
			});
		};

		authService.getCookie = function() {
			if ($cookies.get('user')) {
				console.log('Cookie:', $cookies.get('user'));
				session.create({username: $cookies.get('user')});
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
