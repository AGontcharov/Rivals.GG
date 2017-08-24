angular
	.module('myApp')
	.controller('registerCtrl', ['$scope', 'authentication', function($scope, authentication) {
		$scope.form = 'register';
		
		$scope.switchForms = function(form) {
			$scope.form = form;
		}

		$scope.register = function(account) {
			console.log(account);
		}

		$scope.login = function(credentials) {
			authentication.login(credentials, function(user) {
				console.log('Login controller authentication sucess');
			}, function(err) {
				console.log('Login Controller authentication failed');
			});
		}
}]);