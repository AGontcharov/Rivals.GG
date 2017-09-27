describe('userService Service', function() {

	beforeEach(module('myApp'));

	var authentication, $rootScope, $httpBackend, userService, $q, deferred;

	beforeEach(inject(function(_$rootScope_, _$httpBackend_, _userService_, _$q_) {
		$rootScope = _$rootScope_;
		$httpBackend = _$httpBackend_;
		userService = _userService_;
		$q = _$q_;
		deferred = $q.defer();		
	}));

	afterEach(function() {
		$httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
	});

	describe('userService.create', function() {
		it('Should respond 200 on valid requests', function() {
			var user = { username: 'test', password: 123, confirmPassword: 123, email: 'test@mail.com' };
					
			// Define backend post
			$httpBackend.whenPOST('/api/users', user).respond(200, {
				token: 'test-jwt-token'
			});
			
			userService.login(user);
			$httpBackend.flush();

		});
	});
});