angular
	.module('myApp')
	.controller('testCtrl', ['$scope', '$location', function($scope, $location) {

		$scope.filter = function() {
			
			$location.url('/summoner/' + $scope.region + '/' + $scope.name);
		}
}]);