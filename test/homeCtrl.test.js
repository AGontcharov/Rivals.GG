describe('Home Controller', function() {
	beforeEach(module('myApp'));

	var scope, controller, session, userService, $q, deferred;

	beforeEach(inject(function($rootScope, $controller, _session_, _userService_, _$q_) {
		scope = $rootScope.$new();
		session = _session_;
		userService = _userService_;
		$q = _$q_;

		// Create mock instance of defer
		deferred = $q.defer();

		// Use a spy to return the deferred promise
		spyOn(userService, 'getBySummoner').and.returnValue(deferred.promise);
		spyOn(userService, 'updateAccount').and.returnValue(deferred.promise);

		// Init the controller, passing the spy service instance
		controller = $controller('homeCtrl', {
			$scope: scope,
			userService: userService
		});
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

	describe('switchLeague', function() {
		it('Should show the ranked solo league by default', function() {
			expect(scope.rankedSolo).toBeTruthy();
			expect(scope.rankedFlex).toBeFalsy();
		});

		it('Should set scope variables rankedSolo, and rankedFlex', function() {
			scope.switchLeague('solo');
			expect(scope.rankedSolo).toBeTruthy();
			expect(scope.rankedFlex).toBeFalsy();

			scope.switchLeague('flex');
			expect(scope.rankedFlex).toBeTruthy();
			expect(scope.rankedSolo).toBeFalsy();
		});
	});

	describe('isActive', function() {
		it('Profile should be active by default', function() {
			expect(scope.profile).toBeTruthy();
			expect(scope.league).toBeFalsy();
			expect(scope.champions).toBeFalsy();

			expect(scope.isActive('profile')).toBeTruthy();
		});

		it('rankedSolo should be active by default', function() {
			expect(scope.rankedSolo).toBeTruthy();
			expect(scope.rankedFlex).toBeFalsy();
			expect(scope.isActive('solo')).toBeTruthy();
			expect(scope.isActive('flex')).toBeFalsy();
		});

		it('Should set the active class for profile, league, champions', function() {
			scope.show('league');
			expect(scope.league).toBeTruthy();
			expect(scope.isActive('league')).toBeTruthy();

			scope.show('champions');
			expect(scope.champions).toBeTruthy();
			expect(scope.isActive('champions')).toBeTruthy();

			scope.show('profile');
			expect(scope.profile).toBeTruthy();
			expect(scope.isActive('profile')).toBeTruthy();
		});
	});

	describe('search', function() {
		it('Should call the findAccount method on Enter key press', function() {
			var keyEvent = { which: 13 };
			scope.findAccount = function() {};
			
			spyOn(scope, 'findAccount');
			scope.search(keyEvent);
			expect(scope.findAccount).toHaveBeenCalled();
			expect(scope.findAccount.calls.count()).toBe(1);
		});
	});

	describe('findAccount', function() {
		it('Should call the userService getBySummoner method', function() {
			scope.findAccount();
			expect(userService.getBySummoner).toHaveBeenCalled();
			expect(userService.getBySummoner.calls.count()).toBe(1);
		});
	});

	describe('AddAccount', function() {
		it('Should call the userService updateAccount method', function() {
			scope.addAccount();
			expect(userService.updateAccount).toHaveBeenCalled();
			expect(userService.updateAccount.calls.count()).toBe(1);
		});
	});
});