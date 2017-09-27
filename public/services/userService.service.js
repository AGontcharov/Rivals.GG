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

	userService.getByUser = function(username) {
		return $http.get(baseURL + '/users/' + username).then(handleSuccess, function() { return handleError('Error retrieving user by username'); });
	}


	// Account endpoints
	userService.createAccount = function(account) {
		return $http.post(baseURL + '/users/accounts', account).then(handleSuccess, function() { return handleError('Error creating summoner account'); });
	}

	userService.getByAccount = function(username) {
		return $http.get(baseURL + '/users/accounts').then(handleSuccess, function() { return handleError('Error getting summoner account by username'); });
	}

	userService.createSoloLeague = function(stats) {
		return $http.post(baseURL + '/users/accounts/solo', stats).then(handleSuccess, function() { return handleError('Error creating summoner ranked solo stats'); });
	}

	userService.createFlexLeague = function(stats) {
		return $http.post(baseURL + '/users/accounts/flex', stats).then(handleSuccess, function() { return handleError('Error creating summoner ranked flex stats'); });
	}


	// Summoner endpoints
	userService.getBySummoner = function(region, summoner) {
		return $http.get(baseURL + '/search/' + region + '/' + summoner).then(handleSuccess, function() { return handleError('Error getting summoner(s) by region and name'); });
	}


	// Private functions
	function handleSuccess(res) {
		return { data: res.data };
	}

	function handleError(err) {
		return $q.reject({ success: false, message: err })
	}

	return userService;
}]);