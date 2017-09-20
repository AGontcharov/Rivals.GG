angular
	.module('myApp')
	.factory('userService', ['$http', '$q', function($http, $q) {

	var baseURL = '/api';
	var userService = {};

	// User endpoints
	userService.create = function(user) {
		return $http.post(baseURL + '/users', user).then(handleSuccess, function() { return handleError('Error creating user'); });
	}

	userService.login = function(user) {
		return $http.post(baseURL + '/users/login', user).then(handleSuccess, function() { return handleError('Error authenticating user'); });
	}

	userService.getByAccount = function(username) {
		return $http.get(baseURL + '/users/account').then(handleSuccess, function() { return handleError('Error getting summoner account by username'); });
	}

	userService.updateAccount = function(account) {
		return $http.put(baseURL + '/users/account', account).then(handleSuccess, function() { return handleError('Error updating user summoner account'); });
	}


	// Summoner endpoints
	userService.getBySummoner = function(region, summoner) {
		return $http.get(baseURL + '/search/' + region + '/' + summoner).then(handleSuccess, function() { return handleError('Error getting summoner(s) by name'); });
	}


	// Private functions
	function handleSuccess(res) {
		return res.data;
	}

	function handleError(err) {
		return $q.reject({ success: false, message: err })
	}

	return userService;
}]);