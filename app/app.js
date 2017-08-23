var app = angular.module('myApp', ['ngRoute']);

app.config(function($routeProvider, $locationProvider) {
	$routeProvider
	
	// .when('/', { 
	// 	templateUrl: 'home.html'
	// })
	.when('/summoner/:region/:name', { 
		templateUrl: '/view/summoner.html',
		controller: 'formCtrl'
	});
	// .otherwise({
	// 	redirectTo: '/404'
	// });

	$locationProvider.html5Mode(true);
})

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
