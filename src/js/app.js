angular.module('evaluationApp', ['ngRoute']);

angular.module('evaluationApp').config(['$routeProvider',
	function ($routeProvider) {
		$routeProvider
			.when('/login',             { templateUrl: '../html/login.html',   controller: 'loginController' })
			.when('/evaluations/:user', { templateUrl: 'evaluations.html', controller: 'loginController' })
			.otherwise({
				redirectTo: '/login'
			});
	}
]);

angular.module('evaluationApp').factory('evaluationResource',
	function($http) {
		var factory = {};

		factory.loginUser = function(loginObject) {
			return $http.post('http://dispatch.ru.is/demo/api/v1/login', loginObject);
		};

		factory.getEvaluations = function() {
			return $http.get('http://dispatch.ru.is/demo/api/v1/my/evaluations');
		};

		return factory;
	}
);

angular.module('evaluationApp').controller('loginController', [
	'$scope', '$location', '$rootScope', '$routeParams', '$http', 'evaluationResource',
	function ($scope, $location, $rootScope, $routeParams, $http, evaluationResource) {
	$scope.token = '';

	$scope.login = function() {
		var loginObject = {user:'bergthor13', pass:'123456'};

		evaluationResource.loginUser(loginObject).then(function(response) {
			console.log(response);
			$scope.token = response.data.Token;
			var theToken = 'Basic ' + $scope.token;
			console.log(theToken);
			// adding the token to the header.
			$http.defaults.headers.common.Authorization = theToken;

			evaluationResource.getEvaluations().success(function(data) {
				// Should be Doddi2.
				console.log(data[0].TemplateName);
			});

			// Bara leika mer
			$location.path('/evaluations/' + loginObject.user);
		});

	};

}]);