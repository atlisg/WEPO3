angular.module('evaluationApp').factory('evaluationResource',
	function ($http, SERVER_URL, currentUser) {

		var factory = {};

		factory.loginUser = function(loginObject) {
			return $http.post(SERVER_URL + 'login', loginObject);
		};

		factory.getEvaluations = function() {
			$http.defaults.headers.common.Authorization = "Basic " + currentUser.token;
			return $http.get(SERVER_URL + 'my/evaluations');
		};

		factory.getEvaluation = function(id, course, semester) {
			$http.defaults.headers.common.Authorization = "Basic " + currentUser.token;
			return $http.get(SERVER_URL + 'courses/' + course + '/' + semester + '/evaluations/' + id);
		};

		factory.getTemplates = function() {
			$http.defaults.headers.common.Authorization = "Basic " + currentUser.token;
			return $http.get(SERVER_URL + 'evaluationtemplates');
		};

		return factory;
	}
);
