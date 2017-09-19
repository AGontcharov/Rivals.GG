describe('Register Controller', function() {
	beforeEach(module('myApp'));

	var scope, controller, userService;

	beforeEach(inject(function($controller, $rootScope, _userService_) {
		scope = $rootScope.$new();
		controller = $controller('registerCtrl', {
			$scope: scope
		});
		userService = _userService_;
	}));

	describe('register form', function() {
		it('Submit function should be defined', function() {
			expect(scope.submit).toBeDefined();
		});

		it('Should not call the userService on invalid form', function() {
			scope.registerForm = {}
			scope.registerForm.$invalid = true;
			scope.credentials = {};

			spyOn(userService, 'create');
			scope.submit();
			expect(userService.create).not.toHaveBeenCalled();
		});

		// Need to figure out how to test with promises
		it('Should should call the userService create method on valid form', function() {
			scope.credentials = {};
			scope.registerForm = {}
			scope.registerForm.$invalid = false;
			scope.registerForm.$setPristine = function() {};
			userService.create = function() {};

			spyOn(userService, 'create');
			fail('Need to mock promises');
			// scope.submit();
			// expect(userService.create).toHaveBeenCalled();
		});
	});
});