describe('Register Controller', function() {
	beforeEach(module('myApp'));

	var scope, controller, userService, $location, $q, deferred;

	beforeEach(inject(function($controller, $rootScope, _$location_, _userService_, _$q_) {
		scope = $rootScope.$new();
		userService = _userService_;
		$location = _$location_;
		$q = _$q_;

		// Create mock instance of defer
		deferred = $q.defer();

		// Use a spy to return the deferred promise
		spyOn(userService, 'create').and.returnValue(deferred.promise);

		// Init the controller, passing the spy service instance
		controller = $controller('register', {
			$scope: scope,
			userService: userService,
		});
	}));

	describe('Submit', function() {

		beforeEach(function() {
			scope.account = { username: 'test', password: 123, confirmPassword: 123, email: 'test@mail.com' };
			scope.registerForm = {};
			scope.registerForm.$setPristine = function() {};
		});

		it('Should not call the user service on invalid form', function() {
			scope.registerForm.$invalid = true;
			scope.submit();
			expect(userService.create.calls.count()).toBe(0);
		});

		describe('Valid form', function() {

			it('Should call the user service', function() {
				scope.registerForm.$invalid = false;
				scope.submit();

				deferred.resolve('data');
				scope.$apply();

				expect(userService.create.calls.count()).toBe(1);
			});

			it('Should resolve promise', function() {
				scope.registerForm.$invalid = false;
				scope.submit();

				deferred.resolve('data');
				scope.$apply();

				expect($location.path()).toBe('/home');
			});

			it('Should reject promise', function() {
				scope.registerForm.$invalid = false;
				scope.submit();

				deferred.reject({ success: false, message: 'promise rejected' });
				scope.$apply();

				expect(scope.error).toBeTruthy();
			});

			afterEach(function() {
				expect(scope.account.password).toBeFalsy();
				expect(scope.account.confirmPassword).toBeFalsy();
			});
		});	
	});
});