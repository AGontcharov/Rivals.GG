var app = angular.module("myApp", ["ngRoute"]);

app.config(function($routeProvider) {
	routeProvider
	.when("/", {
		templateURL : "index.html"
	});
});