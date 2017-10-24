describe('Summoner Controller', function() {
	beforeEach(module('myApp'));

	var scope, controller, summonerService, deferred;

	beforeEach(inject(function($rootScope, $controller, $q, _searchQuery_, _summonerService_) {
		scope = $rootScope.$new();
		searchQuery = _searchQuery_;
		summonerService = _summonerService_;
		deferred = $q.defer();

		// Spies
		spyOn(summonerService, 'getBySummoner').and.returnValue(deferred.promise);
		spyOn(searchQuery, 'create');

		// Initialize the controller
		controller = $controller('summoner', {
			$scope: scope,
		});
	}));

	describe('Summoner', function() {

		it('Missing should be set to false', function() {
			expect(scope.missing).toBeFalsy();
		});

		it('Should call the searchQuery service', function() {
			expect(searchQuery.create.calls.count()).toBe(1);
		});
		
		it('Should call the summoner service', function() {
			deferred.resolve( {data: 'testing'} );
			scope.$apply();
			expect(summonerService.getBySummoner.calls.count()).toBe(1);
		});

		it('Should resolve the promise', function() {
			deferred.resolve( {data: 'testing'} );
			scope.$apply();
			expect(scope.records).toBe('testing');
		});

		it('Should reject the promise', function() {
			deferred.reject( { success: false, message: 'reject promise'} );
			scope.$apply();
			expect(scope.missing).toBeTruthy();
		});
	});
});