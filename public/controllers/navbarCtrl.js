angular
	.module('myApp')
	.controller('navbarCtrl', ['$scope', '$location', 'searchQuery', 'authentication', function($scope, $location, searchQuery, authentication) {

	$scope.isActive = function (viewLocation) {
		return viewLocation === $location.path();
	}

	$scope.find = function() {
		searchQuery.create($scope.region, $scope.searchQuery);
		$location.path(searchQuery.route);
	}

	$scope.submitForm = function(keyEvent) {
		if (keyEvent.which === 13) $scope.find();
	}

	$scope.logout = function() {
		authentication.logout();
	}
	
}]);