/**
 * AccountService Factory
 * @namespace Factories
 */
(function() {
    'use strict';

    angular
        .module('myApp')
        .factory('accountService', ['$http', '$q', accountService]);

    /**
     * @namespace AccountService
     * @description Data factory to handle all summoner account requests
     * @memberOf Factories
     */
    function accountService($http, $q) {

        var baseURL = '/api';
        
        var service = {
            createAccount: createAccount,
            getByAccount: getByAccount,
            createSoloLeague: createSoloLeague,
            createFlexLeague: createFlexLeague
        };

        return service;

        /**
         * @name createAccount
         * @description Performs a POST request to add a summoner account
         * @param  {Object} account - Summoner account
         * @return {Object} HTTP promise
         * @memberOf Factories.AccountService
         */
        function createAccount(account) {
            return $http.post(baseURL + '/users/accounts', account)
            .then(handleSuccess)
            .catch(function() { return handleError('Error creating summoner account'); });
        }

        /**
         * @name getByUsername
         * @description Performs a GET request to retrieve a summoner by username
         * @param  {Object} username - The user's username
         * @return {Object} HTTP promise
         * @memberOf Factories.AccountService
         */
        function getByUsername(username) {
            return $http.get(baseURL + '/users/accounts')
            .then(handleSuccess)
            .catch(function() { return handleError('Error getting summoner account by username'); });
        }

        /**
         * @name createSoloLeague
         * @description Performs a POST request to creates the solo league statistic for summoner
         * @param  {Object} stats - The solo league statistics for summoner
         * @return {Object} HTTP Promise
         * @memberOf Factories.AccountService
         */
        function createSoloLeague(stats) {
            return $http.post(baseURL + '/users/accounts/solo', stats)
            .then(handleSuccess)
            .catch(function() { return handleError('Error creating summoner ranked solo stats'); });
        }

        /**
         * @name createFlexLeague
         * @description Performs a POST reqeust to creates the flex league statistic for summoner
         * @param  {Object} stats - The flex league statistics for summoner
         * @return {Object} HTTP Promise
         * @memberOf Factories.AccountService
         */
        function createFlexLeague(stats) {
            return $http.post(baseURL + '/users/accounts/flex', stats)
            .then(handleSuccess)
            .catch(function() { return handleError('Error creating summoner ranked flex stats'); });
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