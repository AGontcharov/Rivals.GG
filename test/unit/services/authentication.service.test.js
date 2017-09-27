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
			spyOn(authentication, 'createSession').and.callThrough();
			spyOn(window, 'success');

			// Mock promise resolve
			authentication.login(user, success, function() {});
			deferred.resolve('test');
			$rootScope.$apply();

			// Creates session
			expect(authentication.createSession).toHaveBeenCalled();
			expect(authentication.createSession.calls.count()).toBe(1);
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

			// Prevent from cascading other tests
			authentication.logout();
		});
	});

	describe('authService.refreshSession', function() {

		beforeEach(function() {
			spyOn($cookies, 'get').and.callThrough();
			spyOn(session, 'create');
		});

		it('Should refresh session if cookie is found', function() {
			
			// Create custom cookie
			var cookie = {
				username: 'test',
				role: 'guest',
				token: 'test-jwt-token'
			};

			$cookies.put('user', JSON.stringify(cookie));
			authentication.refreshSession();
			expect(session.create).toHaveBeenCalled();
			expect(session.create.calls.count()).toBe(1);
		});

		it('Should not refresh session if cookie is not found', function() {
			authentication.refreshSession();

			expect($cookies.get('user')).toBeFalsy();
			expect(session.create).not.toHaveBeenCalled();
			expect(session.create.calls.count()).toBe(0);
		});

		afterEach(function() {

			// An extra call is triggered on route change
			expect($cookies.get).toHaveBeenCalled();
			expect($cookies.get.calls.count()).toBe(2);

			// Prevent from cascading other tests
			authentication.logout();
		});
	});

	describe('authService.isAuthenticated', function() {
		it('Should return true if session is active', function() {
			session.user = '';
			authentication.isAuthenticated();
			expect(session.user).toBeFalsy();
		});

		it('Should return false if session is not active', function() {
			session.user = 'rivals.gg';
			authentication.isAuthenticated();
			expect(session.user).toBeTruthy();
		});
	});

	describe('authService.logout', function() {
		it('Should destroy active session', function() {
			session.user = 'rivals.gg';
			session.role = 'guest';
			session.token = 'test-jwt-token';

			// Assert session is defined
			expect(session.user).toBe('rivals.gg');
			expect(session.role).toBe('guest');
			expect(session.token).toBe('test-jwt-token');

			// Assert session is destroyed
			authentication.logout();
			expect(session.user).toBeFalsy();
			expect(session.role).toBeFalsy();
			expect(session.token).toBeFalsy();
		});

		it('Should remove active cookie', function() {
			
			// Create custom cookie
			var cookie = {
				username: 'test',
				role: 'guest',
				token: 'test-jwt-token'
			};

			// Assert cookie is defined
			$cookies.put('user', JSON.stringify(cookie));
			expect($cookies.get('user')).toBeTruthy();
			expect(JSON.parse($cookies.get('user'))).toEqual(cookie);

			// Assert cookie is removed
			authentication.logout();
			expect($cookies.get('user')).toBeFalsy();
		});
	});
});