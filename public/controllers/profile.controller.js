(function() {
	angular
		.module('myApp')
		.controller('profile', ['$scope', 'session', 'userService', 'authentication', profile]);

	function profile($scope, session, userService, authentication) {

		activate();

		// Update user email
		$scope.updateEmail = function() {

		}

		// Update user password
		$scope.changePass = function() {

		}

		// Delete user account
		$scope.deleteAccount = function() {

			userService.deleteByUsername(session.user)
			.then(function(response) {
				authentication.logout();
			})
			.catch(function(response) {
				console.log(response.message);
			});
		}

		function activate() {

			// Get user information
			userService.getByUsername(session.user)
			.then(function(response) {
				$scope.account = { email: response.data.email, username: session.user };
			})
			.catch(function(response) {
				console.log(response.message);
			});
		}
	}
})();