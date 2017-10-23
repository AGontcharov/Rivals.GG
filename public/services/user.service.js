(function() {
	'use strict';

	angular
		.module('myApp')
		.factory('userService', ['$http', '$q', userService]);

	function userService($http, $q) {

		var baseURL = '/api';
		
		var service = {
			create: create,
			login: login,
			getByUsername: getByUsername,
			deleteByUsername: deleteByUsername
		};

		return service;

		// User endpoints
		function create(user) {
			return $http.post(baseURL + '/users', user)
			.then(handleSuccess)
			.catch(function() { return handleError('Error creating user'); });
		}

		function login(user) {
			return $http.post(baseURL + '/users/login', user)
			.then(handleSuccess)
			.catch(function() { return handleError('Error authenticating user'); });
		}

		function getByUsername(username) {
			return $http.get(baseURL + '/users/' + username)
			.then(handleSuccess)
			.catch(function() { return handleError('Error retrieving user by username'); });
		}

		function deleteByUsername(username) {
			return $http.delete(baseURL + '/users/' + username)
			.then(handleSuccess)
			.catch(function() { return handleError('Error deleting user by username'); });
		}
		
		// Private functions
		function handleSuccess(res) {
			return { data: res.data };
		}

		function handleError(err) {
			return $q.reject({ success: false, message: err })
		}
	}
})();