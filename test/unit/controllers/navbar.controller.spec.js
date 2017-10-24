describe('Navbar Controller', function() {
	beforeEach(module('myApp'));

	var scope, controller, $location, authentication;

	beforeEach(inject(function($rootScope, $controller, _$location_, _searchQuery_, _authentication_) {
		scope = $rootScope.$new();
		$location = _$location_;
		searchQuery = _searchQuery_;
		authentication = _authentication_;

		// Initialize the controller
		controller = $controller('navbar', {
			$scope: scope
		});
	}));

	describe('isActive', function() {

		it('Should return the active path', function() {
			$location.path('/test');
			expect(scope.isActive('/test')).toBeTruthy();
		});
	});

	describe('search', function() {

		it('Should call the searchQuery service', function() {
			spyOn(searchQuery, 'create');
			scope.search();
			expect(searchQuery.create.calls.count()).toBe(1);
		});

		it("Should redicrt the user to '/summoner/na1/InFam0us+Eyelander+DuaIWield'", function() {
			scope.region = 'na1';
			scope.searchQuery = 'InFam0us+Eyelander+DuaIWield';
			scope.search();
			expect($location.path()).toBe('/summoner/na1/InFam0us+Eyelander+DuaIWield');
		});
	});

	describe('submitForm', function() {

		it('Should call the search method on Enter key press', function() {
			var keyEvent = { which: 13 };
			scope.search = function() {};			
			spyOn(scope, 'search');

			scope.searchOnKey(keyEvent);
			expect(scope.search.calls.count()).toBe(1);
		});
	});

	describe('logout', function() {

		it('Should redirect the authentication service', function() {
			authentication.logout = function() {};
			spyOn(authentication, 'logout');

			scope.logout();
			expect(authentication.logout.calls.count()).toBe(1);
		});

		it("Should redirect the user to '/login'", function() {
			scope.logout();
			expect($location.path()).toBe('/login');
		});
	});
});