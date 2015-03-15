angular.module('evaluationApp').factory('evaluationResource',
	function ($http, SERVER_URL, currentUser) {

		var factory = {};

		factory.loginUser = function(loginObject) {
			return $http.post(SERVER_URL + 'login', loginObject);
		};

		factory.getEvaluations = function() {
			$http.defaults.headers.common.Authorization = "Basic " + currentUser.token;
			return $http.get(SERVER_URL + 'evaluations');
		};

		return factory;
	}
);

