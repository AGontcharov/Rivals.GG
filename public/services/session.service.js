/**
 * Session Service
 * @namespace Services
 */
(function() {
	'use strict';

	angular
		.module('app.auth')
		.service('session', session);

	/**
	 * @namespace Session
	 * @description A service that stores the user's session
	 * @memberOf Services
	 */
	function session() {

		/**
		 * @name create
		 * @description Creates the user session
		 * @param {Object} user - The user's credentials
		 * @param {String} role - The user's role
		 * @param {String} token - The JSON web token stringified
		 * @memberOf Services.Session
		 */
		this.create = function(user, role, token) {
			this.user = user;
			this.role = role;
			this.token = token;
		};

		/**
		 * @name destroy
		 * @description Destroy the user's session
		 * @memberOf Services.Session
		 */
		this.destroy = function() {
			this.user = null;
			this.role = null;
			this.token = null;
		}

		return this;
	}
})();