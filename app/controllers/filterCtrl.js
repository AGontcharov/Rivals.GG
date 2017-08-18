angular
	.module('myApp')
	.controller('filterCtrl', ['$scope', '$location', function($scope, $location) {

		$scope.filter = function() {
			var query = $scope.name;

			query = query.replace(/\s/g, '');
			query = query.replace(/,/g, '+');
			console.log(query);

			$location.url('/summoner/' + $scope.region + '/' + query);
		}

		$scope.submitForm = function(keyEvent) {
			if (keyEvent.which === 13) {
				// alert("Enter key was pressed");
				// document.getElementById('submit').click();
				$scope.filter();
			}
		}
}]);