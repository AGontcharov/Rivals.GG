/**
 * SummonerService Factory
 * @namespace Factories
 */
(function() {
    'use strict';

    angular
        .module('myApp')
        .factory('summonerService', ['$http', '$q', summonerService]);

    /**
     * @namespace SummonerService
     * @description Data factory to handle all summoner requests
     * @memberOf Factories
     */
    function summonerService($http, $q) {

        var baseURL = '/api';
        
        var service = {
            getBySummoner: getBySummoner
        };

        return service;

        /**
         * @name getBySummoner
         * @description Performs a GET request to retrieve summoner(s) by region and summoner name(s)
         * @param  {String} region - The selected region
         * @param {String} summoner - The summoner(s) to search for
         * @return {Object} HTTP promise
         * @memberOf Factories.SummonerService
         */
        function getBySummoner(region, summoner) {
            return $http.get(baseURL + '/search/' + region + '/' + summoner)
            .then(handleSuccess)
            .catch(function() { return handleError('Error getting summoner(s) by region and name'); });
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