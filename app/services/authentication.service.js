angular
	.module('myApp')
	.factory('authentication', ['$http', '$rootScope', '$window', 'session', 'AUTH_EVENTS', function($http, $rootScope, $window, session, AUTH_EVENTS) {

		/* Create a service object. */
		var authService = {};

		authService.login = function(user) {
			console.log('Authenticating');
			console.log(user);
			$http.post('/login', user).then(function successCallBack(response) {
				console.log(response.data);
				console.log(response.data[0].username);
				console.log(response.data[0].password);

				if (user.username == response.data[0].username && user.password == response.data[0].password) {
					console.log('SUCCESS LOGGING IN');

					/* More auth logic here. */
				}
				else {
					console.log('ERROR LOGGING IN');
				}

			}, function errorCallBack(response) {
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
