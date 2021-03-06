/**
 * @namespace auth_services
 * @memberOf angular_module.app_auth
 */
(function() {
	'use strict';

	angular
		.module('app.auth')
		.service('session', session);

	/**
	 * @class session
	 * @description A service that stores the user's session
	 * @memberOf angular_module.app_auth.auth_services
	 */
	function session() {

		/**
		 * @function create
		 * @description Creates the user session
		 * @param {Object} user - The user's credentials
		 * @param {String} role - The user's role
		 * @param {String} token - The JSON web token stringified
		 * @memberOf angular_module.app_auth.auth_services.session
		 */
		this.create = function(user, role, token) {
			this.user = user;
			this.role = role;
			this.token = token;
		};

		/**
		 * @function destroy
		 * @description Destroy the user's session
		 * @memberOf angular_module.app_auth.auth_services.session
		 */
		this.destroy = function() {
			this.user = null;
			this.role = null;
			this.token = null;
		}

		return this;
	}
})();