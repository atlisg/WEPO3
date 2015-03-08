angular.module('evaluationApp', ['ngRoute']);

angular.module('evaluationApp').config(['$routeProvider',
	function ($routeProvider) {
		$routeProvider
			.when('/login', { templateUrl: 'login.html',   controller: 'loginController' })
			.otherwise({
				redirectTo: '/login'
			});
	}
]);
