(function() {
    'use strict';

    angular
        .module('myApp')
        .factory('summonerService', ['$http', '$q', summonerService]);

    /**
     * @class angular_module.app.summonerService
     * @description Data factory to handle all summoner requests
     * @memberOf angular_module.app
     */
    function summonerService($http, $q) {

        var baseURL = '/api';
        
        var service = {
            getBySummoner: getBySummoner
        };

        return service;

        /**
         * @function getBySummoner
         * @description Performs a GET request to retrieve summoner(s) by region and summoner name(s)
         * @param  {String} region - The selected region
         * @param {String} summoner - The summoner(s) to search for
         * @return {Object} HTTP promise
         * @memberOf angular_module.app.summonerService
         */
        function getBySummoner(region, summoner) {
            return $http.get(baseURL + '/search/' + region + '/' + summoner)
            .then(handleSuccess)
            .catch(function() { return handleError('Error getting summoner(s) by region and name'); });
        }

        /**
         * @function handleSuccess
         * @private
         * @description Handles succesful responses
         * @param  {Object} res - The response object
         * @return {Object} The response data
         * @memberOf angular_module.app.summonerService
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
         * @memberOf angular_module.app.summonerService
         */
        function handleError(err) {
            return $q.reject({ success: false, message: err })
        }
    }
})();