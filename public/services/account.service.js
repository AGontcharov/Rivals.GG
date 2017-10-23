(function() {
    'use strict';

    angular
        .module('myApp')
        .factory('accountService', ['$http', '$q', accountService]);

    function accountService($http, $q) {

        var baseURL = '/api';
        
        var service = {
            createAccount: createAccount,
            getByAccount: getByAccount,
            createSoloLeague: createSoloLeague,
            createFlexLeague: createFlexLeague
        };

        return service;

        // Account endpoints
        function createAccount(account) {
            return $http.post(baseURL + '/users/accounts', account)
            .then(handleSuccess)
            .catch(function() { return handleError('Error creating summoner account'); });
        }

        function getByAccount(username) {
            return $http.get(baseURL + '/users/accounts')
            .then(handleSuccess)
            .catch(function() { return handleError('Error getting summoner account by username'); });
        }

        function createSoloLeague(stats) {
            return $http.post(baseURL + '/users/accounts/solo', stats)
            .then(handleSuccess)
            .catch(function() { return handleError('Error creating summoner ranked solo stats'); });
        }

        function createFlexLeague(stats) {
            return $http.post(baseURL + '/users/accounts/flex', stats)
            .then(handleSuccess)
            .catch(function() { return handleError('Error creating summoner ranked flex stats'); });
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