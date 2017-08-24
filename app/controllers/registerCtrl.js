angular
	.module('myApp')
	.controller('registerCtrl', ['$scope', '$location', 'authentication', function($scope, $location, authentication) {
		$scope.form = 'register';
		
		$scope.switchForms = function(form) {
			$scope.form = form;
		}

		$scope.register = function(account) {
			console.log(account);
		}

		$scope.login = function(credentials) {
			authentication.login(credentials, function(win) {
				console.log('Login controller authentication sucess');
				$location.url('/home');
			}, function(err) {
				console.log('Login Controller authentication failed');
			});
		}
}]);