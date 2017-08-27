angular
	.module('myApp')
	.controller('navbarCtrl', ['$scope', '$location', 'searchQuery', 'authentication', function($scope, $location, searchQuery, authentication) {
		// $scope.region = 'na1';

		$scope.isActive = function (viewLocation) { 
			console.log(viewLocation);
			console.log($location.path());
			console.log(viewLocation === $location.path());
        	return viewLocation === $location.path();
    	};

		$scope.find = function() {
			searchQuery.create($scope.region, $scope.searchQuery);
			$location.url(searchQuery.route);
		}

		$scope.submitForm = function(keyEvent) {
			if (keyEvent.which === 13) {
				$scope.find();
			}
		}

		$scope.logout = function() {
			authentication.logout();
			$location.path('/login');
		}
}]);