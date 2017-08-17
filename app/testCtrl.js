angular
	.module('myApp')
	.controller('testCtrl', ['$scope', '$location', function($scope, $location) {

		$scope.filter = function() {
			var query = $scope.name;

			query = query.replace(/\s/g, '');
			query = query.replace(/,/g, '+');
			console.log(query);

			$location.url('/summoner/' + $scope.region + '/' + query);
		}
}]);