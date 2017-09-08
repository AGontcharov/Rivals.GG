angular
	.module('myApp')
	.factory('userService', ['$http', function($http) {

	var baseURL = '/api';
	var userService = {};

	userService.create = function(user) {
		return $http.post(baseURL + '/users', user).then(handleSuccess, function() { return handleError('Error creating user'); });
	}

	userService.login = function(user) {
		return $http.post(baseURL + '/users/login', user).then(handleSuccess, function() { return handleError('Error login user'); });
	}

	userService.getByUsername = function(username) {
		return $http.get(baseURL + '/users/' + username).then(handleSuccess, function() { return handleError('Error getting user by username'); });
	}

	userService.getBySummoner = function(region, summoner) {
		return $http.get(baseURL + '/search/' + region + '/' + summoner).then(handleSuccess, function() { return handleError('Error getting summoner(s) by name'); });
	}

	userService.update = function(user) {
		return $http.put(baseURL + '/users/' + user.id, user).then(handleSuccess, function() { return handleError('Error updating user'); });
	}

	userService.delete = function(id) {
		return $http.delete(baseURL + '/users/' + id).then(handleSuccess, function() { return handleError('Error deleting user'); });
	}

	function handleSuccess(res) {
		return { sucess: true, data: res.data };
	}

	function handleError(err) {
		return { sucess: false, message: err };
	}

	return userService;
}]);