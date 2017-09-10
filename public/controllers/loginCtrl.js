angular
	.module('myApp')
	.controller('loginCtrl', ['$scope', '$location', 'authentication', function($scope, $location, authentication) {

		$scope.submit = function() {
			console.log('loginForm.$submitted', $scope.loginForm.$submitted);

			// console.log('$loginForm.username.$error.required', $scope.loginForm.username.$error.required);

			// console.log('loginForm.password.$dirty', loginForm.password.$dirty);
			// console.log('$loginForm.password.$invalid', $scope.loginForm.password.$invalid);
			// console.log('$loginForm.password.$error.required', $scope.loginForm.password.$error.required);
			// console.log($scope.loginForm.$submitted || $scope.loginForm.password.$dirty);
			// console.log(($scope.loginForm.$submitted || $scope.loginForm.password.$dirty) && $scope.loginForm.password.$invalid);

			if (!$scope.loginForm.$invalid) login($scope.credentials);

		}

		function login(credentials) {
			$scope.loginForm.$setPristine();

			authentication.login(credentials, function(user) {
				// Sucess callback
				console.log('Login controller authentication success');
				$location.url('/home');
			}, function(err) {
				// Error callback
				console.error(err.message);
				$scope.error = true;
			});
		}
}]);