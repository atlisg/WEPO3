angular.module('evaluationApp').controller('evaluationController', [
	'$scope', '$location', '$rootScope', '$routeParams', '$http', 'adminResource', 'studentResource', 'currentUser',
	function ($scope, $location, $rootScope, $routeParams, $http, adminResource, studentResource, currentUser) {
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

		studentResource.getEvaluation($scope.evalID, $scope.courseID, $scope.semesterID)
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