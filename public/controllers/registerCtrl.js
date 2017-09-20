angular
	.module('myApp')
	.controller('registerCtrl', ['$scope', '$location', 'userService', function($scope, $location, userService) {
		
	$scope.submit = function() {
		if (!$scope.registerForm.$invalid) {

			userService.create($scope.account).then(function(response) {

				if (response.success) {
					console.log('User created');
					$location.path('/login');
				}
				/*else {
					console.error(response.message);
					$scope.error = true;
				}*/
			}, function(response) {
				console.error(response.message);
				$scope.error = true;
			});

			/*.catch(function(response) {
				console.log('In catch');

				console.error(response.message);
				$scope.error = true;
			});*/
		}
	}
}]);