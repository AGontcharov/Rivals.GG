(function() {
    'use strict';

    angular
        .module('myApp')
        .controller('profile', ['$scope', '$location', 'session', 'accountService', 'summonerService', 'searchQuery', profile]);

    function profile($scope, $location, session, accountService, summonerService, searchQuery) {

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

        $scope.search = function(region, summoner) {
            searchQuery.create(summoner);
            summonerService.getBySummoner(region, searchQuery.summoners)
            .then(function(response) {
                $scope.result = response.data[0];
                $scope.accountSearch = true;
            })
            .catch(function(response) {} );
        }

        $scope.searchOnKey = function(keyEvent) {
            if (keyEvent.which === 13) $scope.search();
        }

        function activate() {
            $scope.rankedSolo = true;

            accountService.getByUsername(session.user)
            .then(function(response) {
                $scope.summonerAccount = true;
                $scope.search(response.data.region, response.data.account);
            })
            .catch(function(response) {});
        }
    }
})();