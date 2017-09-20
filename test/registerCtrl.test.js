describe('Register Controller', function() {
	beforeEach(module('myApp'));

	var scope, controller, userService, $location, $q, deferred;

	// Inject unwraps the underscores around services
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
		controller = $controller('registerCtrl', {
			$scope: scope,
			userService: userService,
		});
	}));

	describe('register form', function() {

		it('Should not call the userService create method on invalid form', function() {
			scope.registerForm = { $invalid: true };
			scope.credentials = {};

			scope.submit();
			expect(userService.create).not.toHaveBeenCalled();
			expect(userService.create.calls.count()).toBe(0);
		});

		it('Should call the userService create method on valid form', function() {
			scope.credentials = {};
			scope.registerForm = { $invalid: false };

			scope.submit();
			expect(userService.create).toHaveBeenCalled();
			expect(userService.create.calls.count()).toBe(1);
		});

		it('Should resolve promise', function() {
			scope.registerForm = { $invalid: false };
			scope.submit();

			deferred.resolve('data');
			scope.$apply();

			expect(userService.create).toHaveBeenCalled();
			expect(userService.create.calls.count()).toBe(1);
			expect($location.path()).toBe('/login');
		});

		it('Should reject promise', function() {
			scope.registerForm = { $invalid: false };
			scope.submit();

			deferred.reject({ sucess: false, message: 'promise rejected' });
			scope.$apply();

			expect(userService.create).toHaveBeenCalled();
			expect(userService.create.calls.count()).toBe(1);
			expect(scope.error).toBeTruthy();
			expect($location.path()).toBe('/');
		});
	});
});