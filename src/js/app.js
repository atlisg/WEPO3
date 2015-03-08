angular.module('evaluationApp', ['ngRoute']);

angular.module('evaluationApp').config(['$routeProvider',
	function ($routeProvider) {
		$routeProvider
			.when('/login', { templateUrl: '../html/login.html',   controller: 'loginController' })
			.otherwise({
				redirectTo: '/login'
			});
	}
]);

angular.module('evaluationApp').controller('loginController', [
	'$scope', '$location', '$rootScope', '$routeParams', '$http',
	function ($scope, $location, $rootScope, $routeParams, $http) {
	$scope.token = '';
	$rootScope.login = function() {
		var loginObject = {user:'bergthor13', pass:'123456'};
		$http.post('http://dispatch.ru.is/demo/api/v1/login', loginObject)
		.then(function(response) {
			console.log(response);
			$scope.token = response.data.Token;
			console.log('Basic ' + $scope.token);
		});
		var tok = 'Basic ' + $scope.token;
		// var config = {method:         'GET',
		//               url:            'http://dispatch.ru.is/demo/api/v1/my/evaluations',
		//               headers:        {'Authorization': tok},
		//               withCredentials:false};

		var config = {headers:{'Authorization': tok,
		                       'Accept': 'application/json;odata=verbose'}, withCredentials:true};

		$http.get('http://dispatch.ru.is/demo/api/v1/my/evaluations', config)
		 .then(function(response) {
		 	console.log(response);
		 });
	};

}]);