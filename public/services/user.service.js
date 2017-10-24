(function() {
	'use strict';

	angular
		.module('myApp')
		.factory('userService', ['$http', '$q', userService]);

	/**
 	* @class angular_module.app.userService
 	* @description Data factory to handle all user requests
 	* @memberOf angular_module.app
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
		 * @function create
		 * @description Performs a POST request to create a user account
		 * @param  {Object} user - User credentials
		 * @return {Object} HTTP promise
		 * @memberOf angular_module.app.userService
		 */
		function create(user) {
			return $http.post(baseURL + '/users', user)
			.then(handleSuccess)
			.catch(function() { return handleError('Error creating user'); });
		}

		/**
		 * @function login
		 * @description Performs a POST request to authenticates a user
		 * @param  {Object} user - User credentials
		 * @return {Object} HTTP promise
		 * @memberOf angular_module.app.userService
		 */
		function login(user) {
			return $http.post(baseURL + '/users/login', user)
			.then(handleSuccess)
			.catch(function() { return handleError('Error authenticating user'); });
		}

		/**
		 * @function getByUsername
		 * @description Performs a GET request to retrieve a user by username
		 * @param  {String} username - The user's username
		 * @return {Object} HTTP promise
		 * @memberOf angular_module.app.userService
		 */
		function getByUsername(username) {
			return $http.get(baseURL + '/users/' + username)
			.then(handleSuccess)
			.catch(function() { return handleError('Error retrieving user by username'); });
		}

		/**
		 * @function deleteByUsername
		 * @description Performs a DELETE request to delete a user by username
		 * @param  {String} username - The user's username
		 * @return {Object} HTTP promise
		 * @memberOf angular_module.app.userService
		 */
		function deleteByUsername(username) {
			return $http.delete(baseURL + '/users/' + username)
			.then(handleSuccess)
			.catch(function() { return handleError('Error deleting user by username'); });
		}
		
		/**
		 * @function handleSuccess
		 * @private
		 * @description Handles succesful responses
		 * @param  {Object} res - The response object
		 * @return {Object} The response data
		 * @memberOf angular_module.app.userService
		 */
		function handleSuccess(res) {
			return { data: res.data };
		}

		/**
		 * @function handleError
		 * @private
		 * @description Handles error from responses
		 * @param  {Object} err - The response object
		 * @return {Object} An object containing the message error
		 * @memberOf angular_module.app.userService
		 */
		function handleError(err) {
			return $q.reject({ success: false, message: err })
		}
	}
})();