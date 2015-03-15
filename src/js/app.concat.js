angular.module('evaluationApp', ['ngRoute']);

angular.module('evaluationApp').config(['$routeProvider',
	function ($routeProvider) {

		$routeProvider
			.when('/login',        { templateUrl: '../html/login.html',       controller: 'authenticationController' })
			.when('/evaluations/', { templateUrl: '../html/evaluations.html', controller: 'evaluationsController'    })
			.when('/evaluation/:semesterID/:courseID/:ID', { templateUrl: '../html/evaluation.html', controller: 'evaluationController'    })
			.otherwise({
				redirectTo: '/login'
			});
	}
]);
angular.module('evaluationApp').directive('evaluationQuestion', function() {
	return {restrict: 'E', templateUrl: '../html/evaluationQuestion.html'};
});
angular.module('evaluationApp').constant('SERVER_URL', "http://dispatch.ru.is/demo/api/v1/");
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

		factory.getEvaluation = function(id, course, semester) {
			$http.defaults.headers.common.Authorization = "Basic " + currentUser.token;
			return $http.get(SERVER_URL + 'courses/' + course + '/' + semester + '/evaluations/' + id);
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
		$scope.submitted = false;
		$scope.login = function() {
			$scope.errorMessage = '';
			$scope.submitted = true;
			var loginObject = { user: $scope.user,
				                pass: $scope.pass };

			if ($scope.loginForm.$valid) {
				evaluationResource.loginUser(loginObject).success(function(data) {
					// Put in the data for the user that logged in.
					$scope.getUserData(data);
					$rootScope.$broadcast('userLoggedIn');
					$location.path('/evaluations');
				}).error(function() {
					$scope.errorMessage = 'Það kom upp villa. Þú hefur mögulega slegið inn rangt notandanafn eða lykilorð.';
				});
			}

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
angular.module('evaluationApp').controller('evaluationController', [
	'$scope', '$location', '$rootScope', '$routeParams', '$http', 'evaluationResource', 'currentUser',
	function ($scope, $location, $rootScope, $routeParams, $http, evaluationResource, currentUser) {
		// If the user didn't go through login,
		// redirect them to the login page.
		if(currentUser.username === '') {
			$location.path('/login');
			return;
		}
		$scope.evalID     = $routeParams.ID;
		$scope.courseID   = $routeParams.courseID;
		$scope.semesterID = $routeParams.semesterID;

		$scope.evaluation = {};

		evaluationResource.getEvaluation($scope.evalID, $scope.courseID, $scope.semesterID)
		.success(function(data) {
			$scope.evaluation.id       = data.ID;
			$scope.evaluation.title    = data.Title;
			$scope.evaluation.intro    = data.IntroText;
			$scope.evaluation.courseQ  = data.CourseQuestions;
			$scope.evaluation.teacherQ = data.TeacherQuestions;
			console.log($scope.evaluation);
		});
	}
]);
angular.module('evaluationApp').controller('evaluationsController', [
	'$scope', '$location', '$rootScope', '$routeParams', '$http', 'evaluationResource', 'currentUser',
	function ($scope, $location, $rootScope, $routeParams, $http, evaluationResource, currentUser) {
		// If the user didn't go through login,
		// redirect them to the login page.
		if(currentUser.username === '') {
			$location.path('/login');
			return;
		}

		$scope.fullName = currentUser.fullName;
		$scope.infoMessage = '';
		$scope.evaluations = {};

		evaluationResource.getEvaluations().success(function(data) {
			console.log(data);
			if(data.length === 0) {
				$scope.infoMessage = 'Engin kennslumöt, sem þú getur tekið, eru til staðar.';
			}
			$scope.evaluations = data;
		}).error(function(data) {
			// TODO: Error handling for the evaluations list.
		});

		$scope.dateIsActive = function(startDate, endDate) {
			var start = new Date(startDate);
			var end = new Date(endDate);
			var now = new Date(Date.now());
			return start < now && now < end;
		};
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