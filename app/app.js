var app = angular.module("myApp", ["ngRoute"]);

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
});