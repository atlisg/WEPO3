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
		$scope.teachers = [];
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
					if(currentCourse.teacherOtherQuestions[j].TeacherSSN === $scope.teachers[i].SSN)
						$scope.teachers[i].otherQ.push(currentCourse.teacherOtherQuestions[j]);
				}
				for (j = 0; j < currentCourse.teacherTextQuestions.length; j++) {
					if(currentCourse.teacherTextQuestions[j].TeacherSSN === $scope.teachers[i].SSN)
						$scope.teachers[i].textQ.push(currentCourse.teacherTextQuestions[j]);
				}
			}
		};

		adminResource.getEvaluationResults($scope.evalID).success(function(data) {
			$scope.evaluation = data;
			if(data.Courses.length === 0) {
				$scope.infoMessage = "Því miður hefur enginn svarað þessu kennslumati. Vinsamlega reynið aftur síðar."
			}
			var courses = $scope.evaluation.Courses;
			// Get all of the text questions up
			for (var i = 0; i < courses.length; i++) {
				courses[i].teacherTextQuestions  = [];
				courses[i].teacherOtherQuestions = [];
				courses[i].courseTextQuestions   = [];
				courses[i].courseOtherQuestions  = [];
				$scope.courses[courses[i].CourseID] = courses[i];
				$scope.currentCourse = courses[i].CourseID;
				for (var j = 0; j < courses[i].Questions.length; j++) {
					if(courses[i].Questions[j].Type === 'text') {
						if(courses[i].Questions[j].TeacherSSN === null) {
							courses[i].courseTextQuestions.push(courses[i].Questions[j]);
						} else {
							courses[i].teacherTextQuestions.push(courses[i].Questions[j]);
						}
					} else {
						if(courses[i].Questions[j].TeacherSSN === null) {
							courses[i].courseOtherQuestions.push(courses[i].Questions[j]);
						} else {
							courses[i].teacherOtherQuestions.push(courses[i].Questions[j]);
						}
					}
				}

				$scope.populateGraph(courses[i].courseOtherQuestions);
				$scope.populateGraph(courses[i].teacherOtherQuestions);
				$scope.evaluation.Courses = courses;

				adminResource.getTeachersForCourse(courses[i].CourseID, courses[i].Semester).success($scope.getTeachers);

			}
			$scope.graphData["75"].push(34);
			$scope.graphLabels["75"].push("Testing");
			$scope.graphData["75"].push(65);
			$scope.graphLabels["75"].push("Testing");
			$scope.graphData["75"].push(133);
			$scope.graphLabels["75"].push("Testing");

			$scope.graphData["76"].push(37);
			$scope.graphLabels["76"].push("Testing");
			$scope.graphData["76"].push(59);
			$scope.graphLabels["76"].push("Testing");

		});

$scope.populateGraph = function(list) {
	var key, k;
	for (var j = 0; j < list.length; j++) {
		if (list[j].TeacherSSN === null) {
			key = list[j].QuestionID;
		} else {
			key = list[j].QuestionID + list[j].TeacherSSN;
		}
		list[j].uniqueID = key;

		$scope.graphData  [key] = [];
		$scope.graphLabels[key] = [];
		for (k = 0; k < list[j].OptionsResults.length; k++) {
			$scope.graphData[key].push(list[j].OptionsResults[k].Count);
			$scope.graphLabels[key].push(list[j].OptionsResults[k].AnswerText);
		}

	}
};
}]);