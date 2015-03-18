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
		$scope.graphData   = {};
		$scope.graphLabels = {};
		$scope.teachers = {};
		$scope.courses = {};
		$scope.currentCourse = '';
		$scope.infoMessage = '';
		$scope.getTeachers = function(data) {
			$scope.teachers = data;
			var currentCourse = $scope.courses[$scope.currentCourse];
			for (var i = 0; i < $scope.teachers.length; i++) {
				$scope.teachers[i].otherQ = [];
				$scope.teachers[i].textQ  = [];
				var j;
				for (j = 0; j < currentCourse.teacherOtherQuestions.length; j++) {
					if(currentCourse.teacherOtherQuestions[j].TeacherSSN === $scope.teachers[i].SSN) {
						$scope.teachers[i].otherQ.push(currentCourse.teacherOtherQuestions[j]);
					}
				}
				for (j = 0; j < currentCourse.teacherTextQuestions.length; j++) {
					if(currentCourse.teacherTextQuestions[j].TeacherSSN === $scope.teachers[i].SSN) {
						$scope.teachers[i].textQ.push(currentCourse.teacherTextQuestions[j]);
					}
				}
			}
		};

		adminResource.getEvaluationResults($scope.evalID).success(function(data) {
			console.log(data);
			$scope.evaluation = data;
			if(data.Courses.length === 0) {
				$scope.infoMessage = "Því miður hefur enginn svarað þessu kennslumati. Vinsamlega reynið aftur síðar.";
			}
			// Get all of the text questions up
			for (var i = 0; i < $scope.evaluation.Courses.length; i++) {
				// Add this to each course.
				$scope.evaluation.Courses[i].teacherTextQuestions  = [];
				$scope.evaluation.Courses[i].teacherOtherQuestions = [];
				$scope.evaluation.Courses[i].courseTextQuestions   = [];
				$scope.evaluation.Courses[i].courseOtherQuestions  = [];

				$scope.courses[$scope.evaluation.Courses[i].CourseID] = $scope.evaluation.Courses[i];
				$scope.currentCourse = $scope.evaluation.Courses[i].CourseID;
				for (var j = 0; j < $scope.evaluation.Courses[i].Questions.length; j++) {
					if($scope.evaluation.Courses[i].Questions[j].Type === 'text') {
						if($scope.evaluation.Courses[i].Questions[j].TeacherSSN === null) {
							$scope.evaluation.Courses[i].courseTextQuestions.push($scope.evaluation.Courses[i].Questions[j]);
						} else {
							$scope.evaluation.Courses[i].teacherTextQuestions.push($scope.evaluation.Courses[i].Questions[j]);
						}
					} else {
						if($scope.evaluation.Courses[i].Questions[j].TeacherSSN === null) {
							$scope.evaluation.Courses[i].courseOtherQuestions.push($scope.evaluation.Courses[i].Questions[j]);
						} else {
							$scope.evaluation.Courses[i].teacherOtherQuestions.push($scope.evaluation.Courses[i].Questions[j]);
						}
					}
				}
				console.log($scope.graphData);
				$scope.populateGraph($scope.evaluation.Courses[i].courseOtherQuestions);
				$scope.populateGraph($scope.evaluation.Courses[i].teacherOtherQuestions);
				//$scope.evaluation.Courses = courses;

				adminResource.getTeachersForCourse($scope.evaluation.Courses[i].CourseID, $scope.evaluation.Courses[i].Semester).success($scope.getTeachers);

			}
			console.log($scope.graphData);
		});

		$scope.populateGraph = function(list) {
			var graphData = {};
			var key, k;
			for (var j = 0; j < list.length; j++) {
				if (list[j].TeacherSSN === null) {
					key = list[j].QuestionID;
				} else {
					key = list[j].QuestionID + list[j].TeacherSSN;
				}
				list[j].uniqueID = key;
				graphData[key] = [];
				$scope.graphData  [key] = [];
				$scope.graphLabels[key] = [];
				for (k = 0; k < list[j].OptionsResults.length; k++) {
					graphData[key].push(list[j].OptionsResults[k].Count);
					$scope.graphData[key].push(list[j].OptionsResults[k].Count);
					$scope.graphLabels[key].push(list[j].OptionsResults[k].AnswerText);
				}
			}
		};
}]);