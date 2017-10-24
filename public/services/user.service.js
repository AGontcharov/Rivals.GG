/**
 * UserService Factory
 * @namespace Factories
 */
(function() {
	'use strict';

	angular
		.module('myApp')
		.factory('userService', ['$http', '$q', userService]);

	/**
	 * @namespace UserService
	 * @description Data factory to handle all user requests
	 * @memberOf Factories
	 */
	function userService($http, $q) {

		var baseURL = '/api';
		
		var service = {
			create: create,
			login: login,
			getByUsername: getByUsername,
			deleteByUsername: deleteByUsername
		};

		return service;

		/**
		 * @name create
		 * @description Performs a POST request to create a user account
		 * @param  {Object} user - User credentials
		 * @return {Object} HTTP promise
		 * @memberOf Factories.UserService
		 */
		function create(user) {
			return $http.post(baseURL + '/users', user)
			.then(handleSuccess)
			.catch(function() { return handleError('Error creating user'); });
		}

		/**
		 * @name login
		 * @description Performs a POST request to authenticates a user
		 * @param  {Object} user - User credentials
		 * @return {Object} HTTP promise
		 * @memberOf Factories.UserService
		 */
		function login(user) {
			return $http.post(baseURL + '/users/login', user)
			.then(handleSuccess)
			.catch(function() { return handleError('Error authenticating user'); });
		}

		/**
		 * @name getByUsername
		 * @description Performs a GET request to retrieve a user by username
		 * @param  {String} username - The user's username
		 * @return {Object} HTTP promise
		 * @memberOf Factories.UserService
		 */
		function getByUsername(username) {
			return $http.get(baseURL + '/users/' + username)
			.then(handleSuccess)
			.catch(function() { return handleError('Error retrieving user by username'); });
		}

		/**
		 * @name deleteByUsername
		 * @description Performs a DELETE request to delete a user by username
		 * @param  {String} username - The user's username
		 * @return {Object} HTTP promise
		 * @memberOf Factories.UserService
		 */
		function deleteByUsername(username) {
			return $http.delete(baseURL + '/users/' + username)
			.then(handleSuccess)
			.catch(function() { return handleError('Error deleting user by username'); });
		}
		
		/**
		 * @name handleSuccess
		 * @private
		 * @description Handles succesful responses
		 * @param  {Object} res - The response object
		 * @return {Object} The response data
		 * @memberOf Factories.UserService
		 */
		function handleSuccess(res) {
			return { data: res.data };
		}

		/**
		 * @name handleError
		 * @private
		 * @description Handles error from responses
		 * @param  {Object} err - The response object
		 * @return {Object} An object containing the message error
		 * @memberOf Factories.UserService
		 */
		function handleError(err) {
			return $q.reject({ success: false, message: err })
		}
	}
})();