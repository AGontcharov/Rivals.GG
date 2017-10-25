describe('Profile Controller', function() {
    beforeEach(module('myApp'));

    var scope, controller, $location, session, authentication, userService, deferred;

    beforeEach(inject(function($rootScope, $controller, _$location_, $q, _session_, _authentication_, _userService_) {
        scope = $rootScope.$new();
        $location = _$location_;
        session = _session_;
        authentication = _authentication_;
        userService = _userService_;
        deferred = $q.defer();

        // Spies
        spyOn(userService, 'deleteByUsername').and.returnValue(deferred.promise);
        spyOn(authentication, 'logout');

        // Initialize the controller
        controller = $controller('account', {
            $scope: scope,
        });
    }));

    describe('Delete account', function() {

        it('Should call the user service', function() {
            scope.deleteAccount();
            expect(userService.deleteByUsername.calls.count()).toBe(1);
        });

        it('Should call the authentication service on resolve', function() {
            scope.deleteAccount();

            deferred.resolve('data');
            scope.$apply();

            expect(authentication.logout.calls.count()).toBe(1);
        });

        it('Should resolve the promise', function() {
            scope.deleteAccount();

            deferred.resolve('data');
            scope.$apply();

            expect($location.path()).toBe('/login');
        });

        it('Should reject the promise', function() {
            scope.deleteAccount();

            deferred.reject({ success: false, message: 'promise rejected' });
            scope.$apply();
            fail('To implement in the future');
        });
    });
});