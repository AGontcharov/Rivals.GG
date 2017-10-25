/**
 * @namespace services
 * @memberOf angular_module.app
 */
(function() {
	'use strict';

	angular
		.module('myApp')
		.service('searchQuery', searchQuery);

	/**
 	* @class searchQuery
 	* @description Creates and destroys summoner search queries
 	* @memberOf angular_module.app.services
 	*/
	function searchQuery() {

		/**
		 * @function create
		 * @description Creates an object representing the search query
		 * @param  {String} region - The selected region
		 * @param  {String} summoners - The summoner name(s)
		 * @memberOf angular_module.app.services.searchQuery
		 */
		this.create = function(summoners) {
			this.summoners = filter(summoners);
		}

		/**
		 * @function destroy
		 * @description Destroy the search query
		 * @memberOf angular_module.app.services.searchQuery
		 */
		this.destroy = function() {
			this.summoners = null;
		}

		/**
		 * @function filter
		 * @private
		 * @description Filters the search query from spaces and replaces commas with '+'
		 * @param  {String} query - The string representation of the search query
		 * @return {String} The updated filtered search query
		 * @memberOf angular_module.app.services.searchQuery
		 */
		function filter(query) {
			return query.replace(/\s/g, '').replace(/,/g, '+');
		}

		return this;
	}
})();