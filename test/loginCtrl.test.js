describe('Login Controller', function() {
	beforeEach(module('myApp'));

	var scope, controller;

	beforeEach(inject(function($controller, $rootScope) {
		scope = $rootScope.$new();
		controller = $controller('loginCtrl', {
			$scope: scope
		});
	}));

	describe('Login form', function() {
		it('Submit function should be defined', function() {
			expect(scope.submit).toBeDefined();
		});

		it('Should not submit on invalid form', function() {
			scope.loginForm = {}
			scope.loginForm.$invalid = true;
			scope.credentials = {};

			spyOn(controller, 'login');
			scope.submit();
			expect(controller.login).not.toHaveBeenCalled();
		});

		// How to unit test private function?
		/*it('Should submit on valid form', function() {
			controller.login = function() {};
			scope.loginForm = {}
			scope.loginForm.$invalid = false;
			scope.credentials = { username: 'test', password: 'test123' };

			spyOn(controller, 'login');
			scope.submit();
			expect(controller.login).toHaveBeenCalled();
		});*/
	});
});