angular.module('evaluationApp').factory('adminResource',
	function ($http, SERVER_URL, currentUser) {

		var factory = {};

		factory.loginUser = function(loginObject) {
			return $http.post(SERVER_URL + 'login', loginObject);
		};

		factory.getEvaluations = function() {
			$http.defaults.headers.common.Authorization = "Basic " + currentUser.token;
			return $http.get(SERVER_URL + 'evaluations');
		};

		factory.getTemplates = function() {
			$http.defaults.headers.common.Authorization = "Basic " + currentUser.token;
			return $http.get(SERVER_URL + 'evaluationtemplates');
		};

		factory.getEvaluationResults = function(id) {
			$http.defaults.headers.common.Authorization = "Basic " + currentUser.token;
			return $http.get(SERVER_URL + 'evaluations/'+id);
		};

		factory.getTemplates = function() {
			$http.defaults.headers.common.Authorization = "Basic " + currentUser.token;
			return $http.get(SERVER_URL + 'evaluationtemplates');
		};

		factory.getTemplate = function(id) {
			$http.defaults.headers.common.Authorization = "Basic " + currentUser.token;
			return $http.get(SERVER_URL + 'evaluationtemplates/' + id);
		};

		factory.createTemplate = function(template) {
			$http.defaults.headers.common.Authorization = "Basic " + currentUser.token;
			return $http.post(SERVER_URL + 'evaluationtemplates', template);
		};

		factory.getTeachersForCourse = function(course, semester) {
			$http.defaults.headers.common.Authorization = "Basic " + currentUser.token;
			return $http.get(SERVER_URL + 'courses/' + course + '/' + semester + '/teachers');
		};

		return factory;
	}
);
