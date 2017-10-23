(function() {
	'use strict';

	angular
		.module('myApp', ['ngRoute', 'ngCookies'])
		.config(['$routeProvider', '$locationProvider', '$httpProvider', config])
		.run(['$rootScope', '$location', 'authentication', run]);

	function config($routeProvider, $locationProvider, $httpProvider) {
		$routeProvider.when('/', {
			templateUrl: 'view/register.html',
			controller: 'register'
		})
		.when('/login', {
			templateUrl: 'view/login.html',
			controller: 'login'
		})
		.when('/home', { 
			templateUrl: '/view/home.html',
			controller: 'home'
		})
		.when('/profile', {
			templateUrl: 'view/profile.html',
			controller: 'profile'
		})
		.when('/summoner/:region/:name', { 
			templateUrl: '/view/summoner.html',
			controller: 'summoner'
		})
		.otherwise({ redirectTo: '/login' });

		$locationProvider.html5Mode(true);
		$httpProvider.interceptors.push('authInterceptor');
	}

	function run($rootScope, $location, authentication) {
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
	}
})();