	
(function() {
	'use strict';

	angular
		.module('myApp')
		.factory('authInterceptor', ['session', '$injector', '$q', authInterceptor]);

	/**
	 * @class angular_module.app.authInterceptor
	 * @description HTTP interceptor between the server and the client
	 * @memberOf angular_module.app
	 */
	function authInterceptor(session, $injector, $q) {

		return {

			/**
			 * @function request
			 * @description Intercepts all requests made to the server and adds the JWT token to the headers
			 * @param {Object} config - The request object configuration
			 * @return {Object} The updated request configuration
			 * @memberOf angular_module.app.authInterceptor
			 */
			'request': function(config) {

				if (session) {
					config.headers.Authorization = 'Bearer ' + session.token;
				}
				return config;
			},

			/**
			 * @function responseError
			 * @description Intercepts all unauthorized (401) and forbidden(403) responses from the sever and rejects them
			 * @param {Object} response - The response from the server
			 * @return {Object} The rejected response
			 * @memberOf angular_module.app.authInterceptor
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