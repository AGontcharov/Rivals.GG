angular
	.module('myApp')
	.controller('registerCtrl', ['$scope', '$location', 'userService', function($scope, $location, userService) {
		
	$scope.submit = function() {
		if (!$scope.registerForm.$invalid) {
			console.log($scope.account);

			userService.create($scope.account).then(function(response) {

				if (response.success) {
					console.log('User created');
					$scope.error = false;
					$location.path('/login');
				}
				else {
					console.error(response.message);
					$scope.error = true;
				}
			});	
		}
	}	
}]);