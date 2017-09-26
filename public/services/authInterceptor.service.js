angular
	.module('myApp')
	.factory('authInterceptor', ['session', '$location', '$injector', '$q', function(session, $location, $injector, $q) {

	return {
		'request': function (config) {

			if (session) {
				config.headers.Authorization = 'Bearer ' + session.token;
			}
			return config;
		},

		'responseError': function (response) {

			if (response.status === 401 || response.status === 403) {
				$injector.get('authentication').logout();
				$location.path('/login');
			}
			return $q.reject(response);
		}
	};
}]);