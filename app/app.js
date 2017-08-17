var app = angular.module("myApp", ["ngRoute"]);

app.config(function($routeProvider, $locationProvider) {
	$routeProvider
	
	.when('/', { 
		templateUrl: 'index.html'
	})
	.when('/summoner', {
		templateUrl: '/view/summoner.html'
	})
	.when('/summoner/:region/:name', { 
		templateUrl: '/view/summoner.html'
	})
	.otherwise({
		redirectTo: '/404'
	});

	$locationProvider.html5Mode(true);
});