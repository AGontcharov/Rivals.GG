angular
	.module('myApp')
	.factory('authInterceptor', ['session', '$injector', '$q', function(session, $injector, $q) {

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
			}
			return $q.reject(response);
		}
	};
}]);