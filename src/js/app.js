angular.module('evaluationApp', ['ngRoute', 'chart.js']);

angular.module('evaluationApp').config(['$routeProvider',
	function ($routeProvider) {

		$routeProvider
			.when('/login',        { templateUrl: '../html/login.html', controller: 'authenticationController' })
			.when('/templates/',   { templateUrl: '../html/templates.html', controller: 'templatesController' })
			.when('/template/',    { templateUrl: '../html/template.html', controller: 'templateController' })
			.when('/template/:ID', { templateUrl: '../html/template.html', controller: 'templateController' })
			.when('/evaluations/', { templateUrl: '../html/evaluations.html', controller: 'evaluationsController' })
			.when('/evaluation/:ID', { templateUrl: '../html/evaluationResults.html', controller: 'evaluationResultsController' })
			.when('/evaluation/:semesterID/:courseID/:ID', { templateUrl: '../html/evaluation.html', controller: 'evaluationController' })
			.otherwise({
				redirectTo: '/login'
			});
	}
]);