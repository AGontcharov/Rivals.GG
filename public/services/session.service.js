angular
	.module('myApp')
	.service('session', function() {

	this.create = function(user, role, token) {
		this.user = user;
		this.role = role;
		this.token = token;
	};

	this.destroy = function() {
		this.user = null;
		this.role = null;
		this.token = null;
	}

	return this;
});