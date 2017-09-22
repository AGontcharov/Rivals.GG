describe('Authentication Service', function() {

	beforeEach(module('myApp'));

	var authentication, $rootScope, $cookies, userService, session, $q, deferred;

	beforeEach(inject(function(_authentication_, _$rootScope_, _$cookies_, _userService_, _session_, _$q_) {
		authentication = _authentication_;
		$rootScope = _$rootScope_;
		$cookies = _$cookies_;
		userService = _userService_;
		session = _session_;
		$q = _$q_;
		deferred = $q.defer();

	}));

	describe('authService.login', function() {

		var user;

		beforeEach(function() {
			user = { username: 'test', password: '123' };
			spyOn(userService, 'login').and.returnValue(deferred.promise);
		});

		it('Should resolve the promise', function() {
			window.success = function() {};

			// Spies
			spyOn($cookies, 'put').and.callThrough();
			spyOn(session, 'create');
			spyOn(window, 'success');

			// Mock promise resolve
			authentication.login(user, success, function() {});
			deferred.resolve( {data: 'test-jwt-token'} );
			$rootScope.$apply();

			// Creates browser cookie
			expect($cookies.put).toHaveBeenCalled();
			expect($cookies.put.calls.count()).toBe(1);
			var cookie = JSON.parse($cookies.get('user'));
			expect(cookie.username).toBe('test');
			expect(cookie.role).toBe('guest');
			expect(cookie.token).toBe('test-jwt-token');

			// Creates session
			expect(session.create).toHaveBeenCalled();
			expect(session.create.calls.count()).toBe(2); // An extra call is triggered on route change
			expect(window.success).toHaveBeenCalled();
			expect(window.success.calls.count()).toBe(1);

		});

		it('Should reject the promise', function() {
			window.error = function() {};
			spyOn(window, 'error');

			authentication.login(user, function() {}, error);
			deferred.reject('reject promise');
			$rootScope.$apply();

			expect(window.error).toHaveBeenCalled();
			expect(window.error.calls.count()).toBe(1);
		});

		// After resolve and reject
		afterEach(function() {
			expect(userService.login).toHaveBeenCalled();
			expect(userService.login.calls.count()).toBe(1);

			// Should delete user password
			expect(user.password).toBeFalsy();			
		});
	});

	describe('authService.refreshSession', function() {
		it('Should not refresh session if cookie is not found', function() {
			
		});

		it('Should refresh session if cookie is found', function() {

		});
	});

	describe('authService.isAuthenticated', function() {
		it('Should', function() {

		});
	});

	describe('authService.logout', function() {
		it('Should', function() {

		});
	});
});