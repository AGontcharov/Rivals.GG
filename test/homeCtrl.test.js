describe('Home Controller', function() {
	beforeEach(module('myApp'));

	var scope, controller, session, userService;

	beforeEach(inject(function($rootScope, $controller, _session_, _userService_) {
		scope = $rootScope.$new();
		controller = $controller('homeCtrl', {
			$scope: scope
		});
		session = _session_;
		userService = _userService_;
	}));

	describe('show', function() {
		it('Profile should be shown by default', function() {
			expect(scope.profile).toBeTruthy();
			expect(scope.league).toBeFalsy();
			expect(scope.champions).toBeFalsy();
		});

		it('Should set scope variables profile, league, and champions', function() {
			scope.show('league');
			expect(scope.league).toBeTruthy;
			expect(scope.profile).toBeFalsy;

			scope.show('champions');
			expect(scope.champions).toBeTruthy;
			expect(scope.profile).toBeFalsy;

			scope.show('profile');
			expect(scope.profile).toBeTruthy;
			expect(scope.league).toBeFalsy;
			expect(scope.champion).toBeFalsy;
		});
	});

	describe('isActive', function() {
		it('Profile should be active be default', function() {
			expect(scope.isActive('profile')).toBeTruthy();
		});
	});
});