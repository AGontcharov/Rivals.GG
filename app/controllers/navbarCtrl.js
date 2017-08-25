angular
	.module('myApp')
	.controller('navbarCtrl', ['$scope', '$location', 'authentication', function($scope, $location, authentication) {

		$scope.logout = function() {
			authentication.logout();
			$location.path('/login');
		}
}]);