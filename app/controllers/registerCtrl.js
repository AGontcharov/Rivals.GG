angular
	.module('myApp')
	.controller('registerCtrl', ['$scope', function($scope) {
		$scope.form = 'register';
		
		$scope.switchForms = function(form) {
			$scope.form = form;
		}

		$scope.register = function() {
			console.log($scope.password);
			console.log($scope.confirmPassword);
			console.log($scope.email);
		}

		$scope.login = function() {
			console.log($scope.loginUsername);
			console.log($scope.loginPassword);
		}
}]);