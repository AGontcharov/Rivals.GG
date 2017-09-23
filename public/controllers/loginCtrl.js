angular
	.module('myApp')
	.controller('loginCtrl', ['$scope', '$location', 'authentication', function($scope, $location, authentication) {

	$scope.submit = function() {
		$scope.error = false;

		if (!$scope.loginForm.$invalid) {
			$scope.loginForm.$setPristine();

			// Sucess callback
			authentication.login($scope.credentials, function(user) {
				console.log('Login controller authentication success');
				$location.path('/home');
				
			// Error callback
			}, function(err) {
				console.error(err);
				$scope.error = true;
			});
		}
	}
}]);