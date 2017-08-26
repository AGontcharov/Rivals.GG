var app = angular.module('myApp', ['ngRoute', 'ngCookies']);

app.config(function($routeProvider, $locationProvider) {
	$routeProvider
	
	.when('/', {
		templateUrl: 'view/register.html',
		controller: 'registerCtrl'
	})
	.when('/login', {
		templateUrl: 'view/login.html',
		controller: 'loginCtrl'
	})
	.when('/home', { 
		templateUrl: '/view/home.html'
	})
	.when('/summoner/:region/:name', { 
		templateUrl: '/view/summoner.html',
		// controller: 'formCtrl'
	});

	$locationProvider.html5Mode(true);
});

app.run(['$rootScope', '$location', 'authentication', function($rootScope, $location, $authentication) {
	$rootScope.$on('$routeChangeStart', function(event, next, current) {

		console.log('triggered');
		console.log($location.path());
		$authentication.getCookie();

		if ($location.path() != '/' && $location.path() != '/login')
			if (!$authentication.isAuthenticated()) {
				console.log('DENY : Redirecting to login page');
				event.preventDefault();
			 	$location.path('/login');
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
