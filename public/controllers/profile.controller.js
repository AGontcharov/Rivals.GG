(function() {
    'use strict';

    angular
        .module('myApp')
        .controller('profile', ['$scope', '$location', 'session', 'accountService', 'authentication', profile]);

        function profile($scope, $location, session, accountService) {

            // Private variables
            var selected = 'rankedSolo';

            activate();

            $scope.isActive = function(location) {
                return selected === location;
            }

            $scope.changeLeague = function(league) {
                $scope.rankedSolo = false;
                $scope.rankedFlex = false;

                selected = league;
                $scope[league] = true;
            }

            $scope.search = function() {
                
            }

            // Searches account on Enter key press inside the input
            $scope.searchOnKey = function(keyEvent) {
                if (keyEvent.which === 13) $scope.search();
            }

            function activate() {
                accountService.getByUsername(session.user)
                .then(function(response) {
                    $scope.summonerAccount = true;
                })
                .catch(function(response) {});
            }
        }
})();