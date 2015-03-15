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
angular.module('evaluationApp').constant('SERVER_URL', "http://dispatch.ru.is/h07/api/v1/");
angular.module('evaluationApp').service('currentUser',
	function() {
		this.token = '';
		this.username = '';
		this.fullName = '';
		this.role = '';
		this.ssn = '';
		this.imageURL = '';
		return this;
	}
);


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

		factory.getTemplates = function() {
			$http.defaults.headers.common.Authorization = "Basic " + currentUser.token;
			return $http.get(SERVER_URL + 'evaluationtemplates');
		};

		return factory;
	}
);


angular.module('evaluationApp').controller('authenticationController', [
	'$scope', '$location', '$rootScope', '$routeParams', '$http', 'evaluationResource', 'currentUser',
	function ($scope, $location, $rootScope, $routeParams, $http, evaluationResource, currentUser) {
		$scope.user = 'bergthor13';
		$scope.pass = '123456';
		$scope.errorMessage = '';
		$scope.warningMessage = '';
		$scope.login = function() {
			$scope.errorMessage = '';
			$scope.warningMessage = '';
			var loginObject = { user: $scope.user,
				                pass: $scope.pass };

			// Error checking the form.
			if ($scope.user.length === 0 || $scope.pass.length === 0) {

				if ($scope.user.length === 0) {
					$scope.warningMessage = 'Þú verður að setja inn notandanafn. ';
				}

				if ($scope.pass.length === 0) {
					$scope.warningMessage += 'Þú verður að setja inn lykilorð. ';
				}

				return;
			}

			evaluationResource.loginUser(loginObject).success(function(data) {
				// Put in the data for the user that logged in.
				console.log(currentUser.role);
				$scope.getUserData(data);
				$rootScope.$broadcast('userLoggedIn');
				if (currentUser.role === 'admin') {
					$location.path('/templates');
				} else {
					$location.path('/evaluations');
				}
			}).error(function() {
				$scope.errorMessage = 'Það kom upp villa. Þú hefur mögulega slegið inn rangt notandanafn eða lykilorð.';
			});
		};

		$scope.getUserData = function(loginData) {
			currentUser.token    = loginData.Token;
			currentUser.username = loginData.User.Username;
			currentUser.fullName = loginData.User.FullName;
			currentUser.role     = loginData.User.Role;
			currentUser.ssn      = loginData.User.SSN;
			currentUser.imageURL = loginData.User.ImageURL;
		};

		$rootScope.logout = function() {
			currentUser.token    = '';
			currentUser.username = '';
			currentUser.fullName = '';
			currentUser.role     = '';
			currentUser.ssn      = '';
			currentUser.imageURL = '';
			$location.path('/login');

		};
}]);
angular.module('evaluationApp').controller('evaluationsController', [
	'$scope', '$location', '$rootScope', '$routeParams', '$http', 'evaluationResource', 'currentUser',
	function ($scope, $location, $rootScope, $routeParams, $http, evaluationResource, currentUser) {
		// If the user didn't go through login,
		// redirect them to the login page.
		if(currentUser.username === '') {
			$location.path('/login');
			return;
		}

		$scope.evaluations = {};
		$scope.fullName = currentUser.fullName;
		$scope.infoMessage = '';

		evaluationResource.getEvaluations().success(function(data) {
			if(data.length === 0) {
				$scope.infoMessage = 'Engin kennslumöt, sem þú getur tekið, eru til staðar.';
			}
			$scope.evaluations = data;
		}).error(function(data) {
			// TODO: Error handling for the evaluations list.
		});
	}
]);
// This controller is used to pass data to the index.html file.
angular.module('evaluationApp').controller('indexController', [
	'$scope', '$rootScope', 'currentUser',
	function ($scope, $rootScope, currentUser) {
		$rootScope.$on('userLoggedIn', function() {
			$scope.userData = currentUser;
		});
	}
]);
angular.module('evaluationApp').controller('templatesController', [
	'$scope', '$location', '$rootScope', '$routeParams', '$http', 'evaluationResource', 'currentUser',
	function ($scope, $location, $rootScope, $routeParams, $http, evaluationResource, currentUser) {
		// If the user didn't go through login,
		// redirect them to the login page.
		if(currentUser.username === '') {
			$location.path('/login');
			return;
		}

		$scope.templates = {};
		$scope.fullName = currentUser.fullName;
		$scope.infoMessage = '';

		evaluationResource.getTemplates().success(function(data) {
			if (data.length === 0) {
				$scope.infoMessage = 'Engin sniðmát eru til staðar.';
			}
			$scope.templates = data;
		}).error(function(data) {
			// Handle this error!
		});
	}
]);