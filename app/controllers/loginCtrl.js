angular
	.module('myApp')
	.controller('loginCtrl', ['$scope', '$location', 'authentication', function($scope, $location, authentication) {

		$scope.login = function(credentials) {
			authentication.login(credentials, function(win) {
				console.log('Login controller authentication sucess');
				$location.url('/home');
			}, function(err) {
				console.log('Login Controller authentication failed');
			});
		}
}]);