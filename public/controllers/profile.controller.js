(function() {
	angular
		.module('myApp')
		.controller('profile', ['$scope', 'session', 'userService', 'authentication', profile]);

	function profile($scope, session, userService, authentication) {

		// Initialize the controller on load
		activate();

		function activate() {

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
	}
})();