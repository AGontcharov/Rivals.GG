angular
	.module('myApp')
	.controller('loginCtrl', ['$scope', '$location', 'authentication', function($scope, $location, authentication) {

		$scope.submit = function() {
			// console.log($scope.loginForm.$submitted);

			if (!$scope.loginForm.$invalid) $scope.login($scope.credentials);
			else return;
		}

		$scope.login = function(credentials) {
			authentication.login(credentials, function(user) {
				console.log('Login controller authentication success');
				$location.url('/home');
			}, function(err) {
				console.log('Login Controller authentication failed');
				$scope.error = true;
			});
		}
}]);