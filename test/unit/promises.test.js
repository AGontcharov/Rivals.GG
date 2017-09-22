describe('How to test with promises', function() {
	// beforeEach(module('myApp'));

	var scope, controller, userService, $location, $q;

	beforeEach(inject(function(_$rootScope_, $controller, _$location_, _$q_) {
		$rootScope = _$rootScope_;
		scope = $rootScope.$new();
		$location = _$location_;
		$q = _$q_;
	}));

	// Passes
	it('promise 1', function() {
		var deferred = $q.defer();

		deferred.promise.then(function(value) {
			expect(value).toBe(5);
		})
		deferred.resolve(10);
	});

	// Fails
	it('promise 2', function() {
		var deferred = $q.defer();

		deferred.promise.then(function(value) {
			expect(value).toBe(5);
		})
		deferred.resolve(10);
		$rootScope.$digest();
	});

	// Passes - Done not working here
	it('promise 3', function() {
		var deferred = $q.defer();

		deferred.promise.then(function(value) {
			expect(value).toBe(5);
			done();
		})
		deferred.resolve(10);
	});	
});

// describe('how to test with promises', function () {
//   var deferred, $rootScope;

//   beforeEach(function () {
//     inject(function ($q, _$rootScope_) {
//       $rootScope = _$rootScope_;
//       deferred = $q.defer();
//     });
//   });

//   it('does a thing one way', function () {
//     deferred.promise.then(function (value) {
//       expect(value).toBe(4);
//     });
//     deferred.resolve(10);
//     $rootScope.$digest();
//   });
//  });