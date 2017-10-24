/**
 * SearchQuery Service
 * @namespace Services
 */
(function() {
	'use strict';

	angular
		.module('myApp')
		.service('searchQuery', searchQuery);

	/**
	 * @namespace SearchQuery
	 * @description Creates and destroys summoner search queries
	 * @memberOf Services
	 */
	function searchQuery() {

		/**
		 * @name create
		 * @description Creates an object representing the search query
		 * @param  {String} region - The selected region
		 * @param  {String} summoners - The name(s) of the summoner account(s)
		 * @memberOf Services.SearchQuery
		 */
		this.create = function(region, summoners) {
			this.region = region;
			this.summoners = filter(summoners).split('+');
			this.route = 'summoner/' + region + '/' + filter(summoners);
			this.requestURL = filter(summoners);
		}

		/**
		 * @name destroy
		 * @description Destroy the search query
		 * @memberOf Services.SearchQuery
		 */
		this.destroy = function() {
			this.region = null;
			this.summoners = null;
			this.route = null;
			this.requestURL = null;
		}

		/**
		 * @name filter
		 * @private
		 * @description Filters the search query from spaces and replaces commas with '+'
		 * @param  {String} query - The string representation of the search query
		 * @return {String} The updated filtered search query
		 */
		function filter(query) {
			return query.replace(/\s/g, '').replace(/,/g, '+');
		}

		return this;
	}
})();