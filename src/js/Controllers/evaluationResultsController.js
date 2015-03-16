angular.module('evaluationApp').controller('evaluationResultsController', [
	'$scope', '$location', '$rootScope', '$routeParams', '$http', 'adminResource', 'studentResource', 'currentUser',
	function ($scope, $location, $rootScope, $routeParams, $http, adminResource, studentResource, currentUser) {
		// If the user didn't go through login,
		// redirect them to the login page.
		if(currentUser.username === '') {
			$location.path('/login');
			return;
		}

		$scope.evalID     = $routeParams.ID;
		$scope.evaluation = {};
		$scope.evaluation.courses = [];
		$scope.questions = {};
		adminResource.getEvaluationResults($scope.evalID).success(function(data) {
			$scope.evaluation = data;
			// Get all of the text questions up
			for (var i = 0; i < $scope.evaluation.Courses.length; i++) {
				$scope.evaluation.Courses[i].textQuestions = [];
				$scope.evaluation.Courses[i].otherQuestions = [];
				for (var j = 0; j < $scope.evaluation.Courses[i].Questions.length; j++) {
					if($scope.evaluation.Courses[i].Questions[j].Type === 'text') {
						$scope.evaluation.Courses[i].textQuestions.push($scope.evaluation.Courses[i].Questions[j]);
					} else {
						$scope.evaluation.Courses[i].otherQuestions.push($scope.evaluation.Courses[i].Questions[j]);
					}
				}
				// for (var i = 0; i < $scope.evaluation..length; i++) {
				// 	$scope.evaluation.[i]
				// };
			}

			console.log("SCOPE.EVAL");
			console.log($scope.evaluation);
		});
	}
]);