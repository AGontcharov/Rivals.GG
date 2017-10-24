/**
 * @class angular_module.app_auth
 * @memberOf angular_module
 */
(function() {
    'use strict';

    angular
        .module('app.auth', [])
        .run(['$rootScope', '$location', 'authentication', run]);

    /**
     * @function run
     * @description The run block for app_auth module
     * @memberOf angular_module.app_auth
     */
    function run($rootScope, $location, authentication) {
        $rootScope.$on('$routeChangeStart', function(event, next, current) {

            console.log('triggered', $location.path());
            authentication.refreshSession();

            if ($location.path() !== '/' && $location.path() !== '/login') {
                
                if (!authentication.isAuthenticated()) {
                    console.log('DENY : Redirecting to login page');
                    event.preventDefault();
                    $location.path('/login');
                }
            }
        });
    }
})();