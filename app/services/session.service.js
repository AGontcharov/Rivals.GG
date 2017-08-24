angular
	.module('myApp')
	.service('session', function($rootScope, USER_ROLES) {

		this.create = function(user) {
			this.user = user;
		};

		this.destroy = function() {
			this.user = null;
		}

		return this;
});