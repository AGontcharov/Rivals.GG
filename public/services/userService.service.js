angular
	.module('myApp')
	.factory('userService', ['$http', function($http) {

		var baseURL = '/api';
		var userService = {};

		userService.create = function(user) {
			return $http.post(baseURL + '/users', user).then(handleSuccess, handleError('Error creating user'));
		}

		userService.getByUsername = function(username) {
			console.log('Inside getByUsername');
			return $http.get(baseURL + '/users/' + username).then(handleSuccess, handleError('Error getting user by username'));
		}

		// To update
		userService.getBySummoner = function() {
			return $http.get(baseURL + '/search/:region/:summoners').then(handleSuccess, handleError('Error getting summoner(s) by name'));
		}

		userService.update = function(user) {
			return $http.put(baseURL + '/users/' + user.id, user).then(handleSuccess, handleError('Error updating user'));
		}

		userService.delete = function(id) {
			return $http.delete(baseURL + '/users/' + id).then(handleSuccess, handleError('Error deleting user'));
		}

		function handleSuccess(res) {
			console.log('In handle success');
			console.log(res);
			return res.data;
		}

		function handleError(err) {
			console.log('In handle error');
			console.log(err);
			return {sucess: false, message: err};
		}

		return userService;
}]);