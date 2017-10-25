/**
 * @class angular_module.app
 * @memberOf angular_module
 */
(function() {
	'use strict';

	angular
		.module('myApp', ['ngRoute', 'ngCookies', 'app.auth'])
		.config(['$routeProvider', '$locationProvider', '$httpProvider', config]);

	/**
	 * @function config
	 * @description Configuration for app module
	 * @memberOf angular_module.app
	 */
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
		.when('/account', {
			templateUrl: 'view/account.html',
			controller: 'account'
		})
		.when('/summoner/:region/:name', { 
			templateUrl: '/view/summoner.html',
			controller: 'summoner'
		})
		.otherwise({ redirectTo: '/login' });

		$locationProvider.html5Mode(true);
		$httpProvider.interceptors.push('authInterceptor');
	}
})();