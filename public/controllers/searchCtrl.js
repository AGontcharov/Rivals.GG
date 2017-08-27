angular
	.module('myApp')
	.controller('searchCtrl', ['$scope', '$location', 'searchQuery', function($scope, $location, searchQuery) {

		$scope.find = function() {
			searchQuery.create($scope.region, $scope.searchQuery);
			$location.url(searchQuery.route);
		}

		$scope.submitForm = function(keyEvent) {
			if (keyEvent.which === 13) {
				$scope.find();
			}
		}
}]);