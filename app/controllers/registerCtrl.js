angular
	.module('myApp')
	.controller('registerCtrl', ['$scope', 'authentication', function($scope, authentication) {
		$scope.form = 'register';
		
		$scope.switchForms = function(form) {
			$scope.form = form;
		}

		$scope.register = function() {
			console.log($scope.username);
			console.log($scope.password);
			console.log($scope.confirmPassword);
			console.log($scope.email);
		}

		$scope.login = function(user) {
			// console.log($scope.loginUsername);
			// console.log($scope.loginPassword);
			console.log(user);
			// console.log($scope.crendentials);
			// console.log($scope.crendentials.username);
			// console.log($scope.crendentials.password);

			/* authentication here */
			authentication.login(user);
		}
}]);