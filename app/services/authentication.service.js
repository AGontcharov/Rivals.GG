angular
	.module('myApp')
	.factory('authentication', ['$http', '$rootScope', '$window', 'session', 'AUTH_EVENTS', function($http, $rootScope, $window, session, AUTH_EVENTS) {

		/* Create a service object. */
		var authService = {};

		authService.login = function(user) {
			console.log('Authenticating');
			$http.post('/login', user);
		};

		authService.isAuthenticated = function() {

		};

		authService.isAuthorized = function() {

		};

		authService.logout = function() {

		};

		return authService;
		
}]);
