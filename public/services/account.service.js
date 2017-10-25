/**
 * @namespace factories
 * @memberOf angular_module.app
 */
(function() {
    'use strict';

    angular
        .module('myApp')
        .factory('accountService', ['$http', '$q', accountService]);

    /**
     * @class accountService
     * @description Data factory to handle all summoner account requests
     * @memberOf angular_module.app.factories
     */
    function accountService($http, $q) {

        var baseURL = '/api';
        
        var service = {
            createAccount: createAccount,
            getByUsername: getByUsername
        };

        return service;

        /**
         * @function createAccount
         * @description Performs a POST request to add a summoner account
         * @param  {Object} account - Summoner account
         * @return {Object} HTTP promise
         * @memberOf angular_module.app.factories.accountService
         */
        function createAccount(account) {
            return $http.post(baseURL + '/users/accounts', account)
            .then(handleSuccess)
            .catch(function() { return handleError('Error creating summoner account'); });
        }

        /**
         * @function getByUsername
         * @description Performs a GET request to retrieve a summoner by username
         * @param  {Object} username - The user's username
         * @return {Object} HTTP promise
         * @memberOf angular_module.app.factories.accountService
         */
        function getByUsername(username) {
            return $http.get(baseURL + '/users/accounts')
            .then(handleSuccess)
            .catch(function() { return handleError('Error getting summoner account by username'); });
        }

        /**
         * @function handleSuccess
         * @private
         * @description Handles succesful responses
         * @param  {Object} res - The response object
         * @return {Object} The response data
         * @memberOf angular_module.app.factories.accountService
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
         * @memberOf angular_module.app.factories.accountService
         */
        function handleError(err) {
            return $q.reject({ success: false, message: err })
        }
    }
})();