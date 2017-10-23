(function() {
    'use strict';

    angular
        .module('myApp')
        .factory('summonerService', ['$http', '$q', summonerService]);

    function summonerService($http, $q) {

        var baseURL = '/api';
        
        var service = {
            getBySummoner: getBySummoner
        };

        return service;

        // Summoner endpoints
        function getBySummoner(region, summoner) {
            return $http.get(baseURL + '/search/' + region + '/' + summoner)
            .then(handleSuccess)
            .catch(function() { return handleError('Error getting summoner(s) by region and name'); });
        }

        // Private functions
        function handleSuccess(res) {
            return { data: res.data };
        }

        function handleError(err) {
            return $q.reject({ success: false, message: err })
        }
    }
})();