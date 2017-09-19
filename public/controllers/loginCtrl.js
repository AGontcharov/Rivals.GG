angular
	.module('myApp')
	.controller('loginCtrl', ['$scope', '$location', 'authentication', function($scope, $location, authentication) {

	$scope.submit = function() {
		if (!$scope.loginForm.$invalid) login($scope.credentials);
	}

	
	this.login = function(credentials) {
	// function login(credentials) {
		$scope.loginForm.$setPristine();

		// Sucess callback
		authentication.login(credentials, function(user) {
			console.log('Login controller authentication success');
			$location.path('/home');
			
		// Error callback
		}, function(err) {
			console.error(err.message);
			$scope.error = true;
		});
	}
	
}]);