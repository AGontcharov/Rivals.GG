angular
	.module('myApp')
	.factory('authentication', ['$http', '$rootScope', '$cookies', 'session', 'AUTH_EVENTS', function($http, $rootScope, $cookies, session, AUTH_EVENTS) {

		/* Create a service object. */
		var authService = {};

		authService.login = function(user) {
			console.log('Authenticating ' + user.username + ': ' + user.password);
			
			$http.post('/login', user).then(function success(response) {
				console.log(response.data);

				if (user.username == response.data[0].username && user.password == response.data[0].password) {
					console.log('SUCCESS LOGGING IN');

					/* Create user session */
					$cookies.put('user', user.username);
				}
				else {
				
				}

			}, function error(response) {
				console.log(response.status);
				console.log(response.data);
			});
		};

		authService.isAuthenticated = function() {

		};

		authService.isAuthorized = function() {

		};

		authService.logout = function() {

		};

		return authService;
		
}]);
