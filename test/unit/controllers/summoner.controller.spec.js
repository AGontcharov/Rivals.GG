describe('Summoner Controller', function() {
	beforeEach(module('myApp'));

	var scope, controller, $q, userService, deferred;

	beforeEach(inject(function($rootScope, $controller, _$q_, _searchQuery_, _userService_) {
		scope = $rootScope.$new();
		$q = _$q_;
		searchQuery = _searchQuery_;
		userService = _userService_;
		deferred = $q.defer();

		spyOn(userService, 'getBySummoner').and.returnValue(deferred.promise);
		spyOn(searchQuery, 'create').and.returnValue({});

		controller = $controller('summonerCtrl', {
			$scope: scope,
			searchQuery: searchQuery,
			userService: userService
		});
	}));

	describe('SeachQuery.create', function() {

		it('Should call the searchQuery service', function() {
			expect(scope.missing).toBeFalsy();
			expect(searchQuery.create).toHaveBeenCalled();
			expect(searchQuery.create.calls.count()).toBe(1);
		});
	});

	describe('user.getBySummoner', function() {
		
		it('Should resolve the promise', function() {
			deferred.resolve( {data: 'xInFam0us'} );
			scope.$apply();

			expect(userService.getBySummoner).toHaveBeenCalled();
			expect(userService.getBySummoner.calls.count()).toBe(1);
			expect(scope.records).toBe('xInFam0us');
		});

		it('Should reject the promise', function() {
			deferred.reject( { success: false, message: 'reject promise'} );
			scope.$apply();

			expect(userService.getBySummoner).toHaveBeenCalled();
			expect(userService.getBySummoner.calls.count()).toBe(1);
			expect(scope.missing).toBeTruthy();
		});
	});
});