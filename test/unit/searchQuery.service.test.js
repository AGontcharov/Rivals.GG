describe('Search Query Service', function() {

	beforeEach(module('myApp'));

	var searchQuery;

	beforeEach(inject(function(_searchQuery_) {
		searchQuery = _searchQuery_;
	}));

	it('Should create and destroy a simple searchQuery', function() {

		// Create
		spyOn(searchQuery, 'create').and.callThrough();
		searchQuery.create('na1', 'InFam0us');
		expect(searchQuery.create).toHaveBeenCalled();
		expect(searchQuery.create.calls.count()).toBe(1);

		expect(searchQuery.region).toBe('na1');
		expect(searchQuery.summoners).toEqual(['InFam0us']);
		expect(searchQuery.route).toBe('summoner/na1/InFam0us');
		expect(searchQuery.requestURL).toBe('InFam0us');

		// Destroy
		spyOn(searchQuery, 'destroy').and.callThrough();
		searchQuery.destroy();
		expect(searchQuery.destroy).toHaveBeenCalled();
		expect(searchQuery.destroy.calls.count()).toBe(1);

		// Null evaluates to False
		expect(searchQuery.region).toBeFalsy();
		expect(searchQuery.summoner).toBeFalsy();
		expect(searchQuery.route).toBeFalsy();
		expect(searchQuery.requestURL).toBeFalsy();
	});

	it('Should create and destroy a complex searchQuery', function() {

		// Create
		spyOn(searchQuery, 'create').and.callThrough();
		searchQuery.create('na1', 'InFam0us, Eyelander, DuaiWield, Clyromaniac');
		expect(searchQuery.create).toHaveBeenCalled();
		expect(searchQuery.create.calls.count()).toBe(1);

		expect(searchQuery.region).toBe('na1');
		expect(searchQuery.summoners).toEqual(['InFam0us', 'Eyelander', 'DuaiWield', 'Clyromaniac']);
		expect(searchQuery.route).toBe('summoner/na1/InFam0us+Eyelander+DuaiWield+Clyromaniac');
		expect(searchQuery.requestURL).toBe('InFam0us+Eyelander+DuaiWield+Clyromaniac');

		// Destroy
		spyOn(searchQuery, 'destroy').and.callThrough();
		searchQuery.destroy();
		expect(searchQuery.destroy).toHaveBeenCalled();
		expect(searchQuery.destroy.calls.count()).toBe(1);

		// Null evaluates to False
		expect(searchQuery.region).toBeFalsy();
		expect(searchQuery.summoner).toBeFalsy();
		expect(searchQuery.route).toBeFalsy();
		expect(searchQuery.requestURL).toBeFalsy();
	});
});