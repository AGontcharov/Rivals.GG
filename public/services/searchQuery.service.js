angular
	.module('myApp')
	.service('searchQuery', function() {

	// Private function
	function filter(query) {
		return query.replace(/\s/g, '').replace(/,/g, '+');
	}

	this.create = function(region, summoners) {
		this.region = region;
		this.summoners = filter(summoners).split('+');
		this.route = 'summoner/' + region + '/' + filter(summoners);
		this.requestURL = filter(summoners);
	}

	this.destroy = function() {
		this.region = null;
		this.summoners = null;
		this.route = null;
		this.requestURL = null;
	}

	return this;
});