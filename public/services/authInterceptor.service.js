/**
 * AuthInterceptor Factory
 * @namespace Factories
 */
(function() {
	'use strict';

	angular
		.module('myApp')
		.factory('authInterceptor', ['session', '$injector', '$q', authInterceptor]);

	/**
	 * @namespace AuthInterceptor
	 * @description HTTP interceptor between the server and the client
	 * @memberOf Factories
	 */
	function authInterceptor(session, $injector, $q) {

		return {

			/**
			 * @name request
			 * @description Intercepts all requests made to the server and adds the JWT token to the headers
			 * @param {Object} config - The request object configuration
			 * @return {Object} The updated request configuration
			 * @memberOf Factories.AuthInterceptor
			 */
			'request': function(config) {

				if (session) {
					config.headers.Authorization = 'Bearer ' + session.token;
				}
				return config;
			},

			/**
			 * @name responseError
			 * @description Intercepts all unauthorized (401) and forbidden(403) responses from the sever and rejects them
			 * @param {Object} response - The response from the server
			 * @return {Object} The rejected response
			 * @memberOf Factories.AuthInterceptor
			 */
			'responseError': function(response) {

				if (response.status === 401 || response.status === 403) {
					$injector.get('authentication').logout();
				}
				return $q.reject(response);
			}
		};
	}
})();