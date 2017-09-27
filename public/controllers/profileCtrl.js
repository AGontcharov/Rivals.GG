angular
	.module('myApp')
	.controller('profileCtrl', ['$scope', 'session', 'userService', 'authentication', function($scope, session, userService, authentication) {

	// Initialize the controller on load
	init();

	function init() {

		// Get user information
		userService.getByUsername(session.user).then(function(response) {
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

		userService.deleteByUsername(session.user).then(function(response) {
			console.log('am I here?');
			authentication.logout();
		},

		function(response) {
			response.message;
		});
	}

}]);