describe('Login Controller', function() {
	beforeEach(module('myApp'));

	var scope, controller, authentication;

	beforeEach(inject(function($controller, $rootScope, _authentication_) {
		scope = $rootScope.$new();
		controller = $controller('loginCtrl', {
			$scope: scope
		});
		authentication = _authentication_;
	}));

	describe('Login form', function() {
		it('Submit function should be defined', function() {
			expect(scope.submit).toBeDefined();
		});

		it('Should not authenticate on invalid form', function() {
			scope.loginForm = {}
			scope.loginForm.$invalid = true;
			scope.credentials = {};

			spyOn(authentication, 'login');
			scope.submit();
			expect(authentication.login).not.toHaveBeenCalled();
			expect(authentication.login.calls.count()).toBe(0);
		});

		it('Should authenticate on valid form', function() {
			scope.credentials = {};
			scope.loginForm = {}
			scope.loginForm.$invalid = false;
			scope.loginForm.$setPristine = function() {};
			authentication.login = function() {};

			spyOn(authentication, 'login');
			scope.submit();
			expect(authentication.login).toHaveBeenCalled();
			expect(authentication.login.calls.count()).toBe(1);
		});
	});
});