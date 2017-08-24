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

		$scope.login = function(user) {
			authentication.login(user);
		}
}]);