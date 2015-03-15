angular.module('evaluationApp', ['ngRoute']);

angular.module('evaluationApp').config(['$routeProvider',
	function ($routeProvider) {

		$routeProvider
			.when('/login',        { templateUrl: '../html/login.html',   controller: 'authenticationController' })
			.when('/evaluations/', { templateUrl: 'evaluations.html', controller: 'evaluationsController' })
			.when('/templates/',   { templateUrl: 'templates.html', controller: 'templatesController' })
			.otherwise({
				redirectTo: '/login'
			});
	}
]);