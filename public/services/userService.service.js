angular
	.module('myApp')
	.factory('userService', ['$http', function($http) {

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
		console.log('In Handle Success');
		return { success: true, data: res.data };
	}

	function handleError(err) {
		console.log('In Handle Error');
		return { success: false, message: err };
	}

	return userService;
}]);