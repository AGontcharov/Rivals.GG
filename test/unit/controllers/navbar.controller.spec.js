describe('Navbar Controller', function() {
	beforeEach(module('myApp'));

	var scope, controller, $location, authentication;

	beforeEach(inject(function($rootScope, $controller, _$location_, _searchQuery_, _authentication_) {
		scope = $rootScope.$new();
		controller = $controller('navbarCtrl', {
			$scope: scope
		});
		$location = _$location_;
		searchQuery = _searchQuery_;
		authentication = _authentication_;
	}));

	describe('isActive', function() {
		it('Should return the active path', function() {
			$location.path('/');
			expect($location.path()).toBe('/');
			expect(scope.isActive('/')).toBeTruthy();
			expect(scope.isActive('/error')).toBeFalsy();

			$location.path('/login');
			expect($location.path()).toBe('/login');
			expect(scope.isActive('/login')).toBeTruthy();
			expect(scope.isActive('/error')).toBeFalsy();

			$location.path('/home');
			expect($location.path()).toBe('/home');
			expect(scope.isActive('/home')).toBeTruthy();
			expect(scope.isActive('/error')).toBeFalsy();

			$location.path('/friends');
			expect($location.path()).toBe('/friends');
			expect(scope.isActive('/friends')).toBeTruthy();
			expect(scope.isActive('/error')).toBeFalsy();

			$location.path('/leaderboard');
			expect($location.path()).toBe('/leaderboard');
			expect(scope.isActive('/leaderboard')).toBeTruthy();
			expect(scope.isActive('/error')).toBeFalsy();
		});
	});

	describe('find', function() {
		it('Should call the searchQuery service', function() {
			searchQuery.create = function() {};
			searchQuery.route = '/InFam0us+Eyelander+DuaIWield';
			spyOn(searchQuery, 'create');

			scope.find();
			expect(searchQuery.create).toHaveBeenCalled();
			expect(searchQuery.create.calls.count()).toBe(1);
			expect($location.path()).toBe(searchQuery.route);
		});
	});

	describe('submitForm', function() {
		it('Should call the find method on Enter key press', function() {
			var keyEvent = { which: 13 };
			scope.find = function() {};
			
			spyOn(scope, 'find');
			scope.submitForm(keyEvent);
			expect(scope.find).toHaveBeenCalled();
			expect(scope.find.calls.count()).toBe(1);
		});
	});

	describe('logout', function() {
		it('Should redirect the user to the login page', function() {
			authentication.logout = function() {};
			spyOn(authentication, 'logout');

			scope.logout();
			expect(authentication.logout.calls.count()).toBe(1);
			expect(authentication.logout).toHaveBeenCalled();
		});
	});
});