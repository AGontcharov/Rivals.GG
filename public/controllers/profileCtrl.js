angular
	.module('myApp')
	.controller('profileCtrl', ['$scope', 'session', 'userService', function($scope, session, userService) {

	// Initialize the controller on load
	init();

	function init() {

		// Get user information
		userService.getByUser(session.user).then(function(response) {
			$scope.account = { email: response.data.email, username: session.user };
		},

		function(response) {
			console.log(response.message);
		});
	}

	// Update user email
	$scope.updateEmail = function() {

	}

	// Update user password
	$scope.updatePass = function() {

	}

	// Delete user account
	$scope.deleteAccount = function() {

	}

}]);