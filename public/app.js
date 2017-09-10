var app = angular.module('myApp', ['ngRoute', 'ngCookies']);

app.config(['$routeProvider', '$locationProvider', '$httpProvider', function($routeProvider, $locationProvider, $httpProvider) {
	$routeProvider.when('/', {
		templateUrl: 'view/register.html',
		controller: 'registerCtrl'
	})
	.when('/login', {
		templateUrl: 'view/login.html',
		controller: 'loginCtrl'
	})
	.when('/home', { 
		templateUrl: '/view/home.html',
		controller: 'homeCtrl'
	})
	.when('/summoner/:region/:name', { 
		templateUrl: '/view/summoner.html',
		controller: 'summonerCtrl'
	});

	$locationProvider.html5Mode(true);

	$httpProvider.interceptors.push(['session', function($session) {

		return {
			'request': function(config) {

				if ($session) {
					console.log($session);
					config.headers['Auth-Token'] = $session.token;
					// config.headers.Authorization = 'Bearer ' + $session.token;
				}
				console.log(config.headers);
				return config;
			}
		};
	}]);
}]);

app.run(['$rootScope', '$location', 'authentication', function($rootScope, $location, $authentication) {
	$rootScope.$on('$routeChangeStart', function(event, next, current) {

		console.log('triggered', $location.path());
		$authentication.refreshSession();

		// Possibly rethink this
		if ($location.path() != '/' && $location.path() != '/login') {
			
			if (!$authentication.isAuthenticated()) {
				console.log('DENY : Redirecting to login page');
				event.preventDefault();
			 	$location.path('/login');
			}
		}
	});
}]);

app.constant('USER_ROLES', {
	all: '*',
	admin: 'admin',
	editor: 'editor',
	guest: 'guest'
}).constant('AUTH_EVENTS', {
	loginSuccess: 'auth-login-sucess',
	loginFailed: 'auth-login-failed',
	logoutSucess: 'auth-logout-sucess',
	sessionTimeout: 'auth-session-timeout',
	notAuthenticated: 'auth-not-authenticated',
	notAuthorized: 'auth-not-authorized'
});
