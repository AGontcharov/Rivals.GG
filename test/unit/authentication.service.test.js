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

		spyOn(userService, 'login').and.returnValue(deferred.promise);
	}));


	describe('authService.login', function() {
		it('Should resolve the promise', function() {
			var user = { username: 'test', password: '123' };
			window.success = function() {};

			// Spies
			spyOn($cookies, 'put').and.callThrough();
			spyOn(session, 'create');
			spyOn(window, 'success');

			// Mock promise resolve
			authentication.login(user, success, function() {});
			deferred.resolve( {data: 'test-jwt-token'} );
			$rootScope.$apply();

			// Should delete user password on resolve
			expect(userService.login).toHaveBeenCalled();
			expect(userService.login.calls.count()).toBe(1);
			expect(user.password).toBeFalsy();

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
			var user = { username: 'test', password: '123' };
			window.error = function() {};
			spyOn(window, 'error');

			authentication.login(user, function() {}, error);
			deferred.reject('reject promise');
			$rootScope.$apply();

			// Should delete user password on reject
			expect(userService.login).toHaveBeenCalled();
			expect(userService.login.calls.count()).toBe(1);
			expect(user.password).toBeFalsy();
			expect(window.error).toHaveBeenCalled();
			expect(window.error.calls.count()).toBe(1);
		});
	});

	describe('authService.refreshSession', function() {
		it('Should', function() {
			
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