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
	.when('/profile', {
		templateUrl: 'view/profile.html',
		controller: 'profileCtrl'
	})
	.when('/summoner/:region/:name', { 
		templateUrl: '/view/summoner.html',
		controller: 'summonerCtrl'
	})
	.otherwise({ redirectTo: '/login' });

	$locationProvider.html5Mode(true);

	$httpProvider.interceptors.push('authInterceptor');
}]);

app.run(['$rootScope', '$location', 'authentication', function($rootScope, $location, authentication) {
	$rootScope.$on('$routeChangeStart', function(event, next, current) {

		console.log('triggered', $location.path());
		authentication.refreshSession();

		if ($location.path() !== '/' && $location.path() !== '/login') {
			
			if (!authentication.isAuthenticated()) {
				console.log('DENY : Redirecting to login page');
				event.preventDefault();
			 	$location.path('/login');
			}
		}
	});
}]);