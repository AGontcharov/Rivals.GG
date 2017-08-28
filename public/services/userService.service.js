angular
	.module('myApp')
	.factory('userService', ['$http', function($http) {

		var baseURL = '/api';
		var userService = {};

		userService.create = function(user) {
			$http.post(baseURL + '/users', user).then(handleSucess, handleError('Error creating user'));
		}

		userService.getbyUsername = function(username) {
			$http.get(baseURL + '/users/' + username).then(handleSucess, handleError('Error getting user by username'));
		}

		// To update
		userService.getBySummoner = function() {
			$http.get(baseURL + '/search/:region/:summoners').then(handleSucess, handleError('Error getting summoner(s) by name'));
		}

		userService.update = function(user) {
			$http.put(baseURL + '/users/' + user.id, user).then(handleSucess, handleError('Error updating user'));
		}

		userService.delete = function(id) {
			$http.delete(baseURL + '/users/' + id).then(handleSucess, handleError('Error deleting user'));
		}

		function handleSucess(res) {
			return res.data;
		}

		function handleError(err) {
			return {sucess: false, message: err};
		}

		return userService;
}]);