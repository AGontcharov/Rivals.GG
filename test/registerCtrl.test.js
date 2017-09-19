describe('Login Controller', function() {
	beforeEach(module('myApp'));

	var scope, controller;

	beforeEach(inject(function($controller, $rootScope) {
		scope = $rootScope.$new();
		controller = $controller('registerCtrl', {
			$scope: scope
		});
	}));

	describe('Register form', function() {
		it('Submit function should be defined', function() {
			expect(scope.submit).toBeDefined();
		});

		it('Should not submit on invalid form', function() {
			scope.registerForm = {}
			scope.registerForm.$invalid = true;
			scope.credentials = {};

			spyOn(controller, 'register');
			scope.submit();
			expect(controller.register).not.toHaveBeenCalled();
		});

		// How to unit test private function?
		/*it('Should submit on valid form', function() {
			controller.register = function() {};
			scope.registerForm = {}
			scope.registerForm.$invalid = false;
			scope.credentials = { username: 'test', password: 'test123' };

			spyOn(controller, 'register');
			scope.submit();
			expect(controller.register).toHaveBeenCalled();
		});*/
	});
});