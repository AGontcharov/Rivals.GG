angular
	.module('myApp')
	.controller('registerCtrl', ['$scope', '$location', 'authentication', function($scope, $location, authentication) {

		$scope.register = function(account) {
			console.log(account);
		}
}]);