describe('Login Controller', function() {
	beforeEach(module('myApp'));

	var scope, controller, authentication;

	beforeEach(inject(function($controller, $rootScope, _authentication_) {
		scope = $rootScope.$new();
		controller = $controller('loginCtrl', {
			$scope: scope
		});
		authentication = _authentication_;

		spyOn(authentication, 'login');
		scope.credentials = {};
	}));

	describe('Login form', function() {
		
		it('Should not authenticate on invalid form', function() {
			scope.loginForm = { $invalid: true }

			scope.submit();
			expect(authentication.login).not.toHaveBeenCalled();
			expect(authentication.login.calls.count()).toBe(0);
		});

		it('Should authenticate on valid form', function() {
			scope.loginForm = { $invalid: false };
			scope.loginForm.$setPristine = function() {};

			scope.submit();
			expect(authentication.login).toHaveBeenCalled();
			expect(authentication.login.calls.count()).toBe(1);
		});
	});
});