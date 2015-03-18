angular.module('evaluationApp').controller('evaluationController', [
	'$scope', '$location', '$rootScope', '$routeParams', '$http', 'adminResource', 'studentResource', 'currentUser',
	function ($scope, $location, $rootScope, $routeParams, $http, adminResource, studentResource, currentUser) {
		// If the user didn't go through login,
		// redirect them to the login page.
		if(currentUser.username === '') {
			$location.path('/login');
			return;
		}
		$scope.addCheckedToModel = function(list) {
			for (var i = 0; i < list.length; i++) {
				list[i].checked = true;
			}
		};

		$scope.addSelectedToModel = function(list) {
			for (var i = 0; i < list.length; i++) {
				list[i].selected = null;
			}
		};
		$scope.evalID     = $routeParams.ID;
		$scope.courseID   = $routeParams.courseID;
		$scope.semesterID = $routeParams.semesterID;
		$scope.evaluationFromServer = {};
		$scope.teachers   = [];
		$scope.model      = {};
		$scope.model.teachers = [];
		$scope.answers    = {};
		$scope.answerObj  = {
			QuestionID : null, //
			TeacherSSN : null, // empty if not applicable (for instance, this is an answer for a question which was directed towards the course in general, instead of the teachers in the course).
			Value      : null  // a text, can be a string or the ID of the option(s) selected by the student (i.e. a commaseparated list of ID's if it is possible to choose multiple answers)
		};
		$scope.evaluation = {};

		studentResource.getEvaluation($scope.evalID, $scope.courseID, $scope.semesterID).success(function(data) {
			console.log(data);
			$scope.evaluationFromServer = data;
			$scope.model.id       = data.ID;
			$scope.model.title    = data.Title;
			$scope.model.intro    = data.IntroText;
			$scope.model.courseQ  = data.CourseQuestions;
			$scope.model.courseID = $scope.courseID;

			for (var i = 0; i < data.CourseQuestions.length; i++) {

				if (data.CourseQuestions[i].Type === 'multiple') {
					$scope.answers[data.CourseQuestions[i].ID] = {QuestionID: data.CourseQuestions[i].ID, TeacherSSN: null, Value: []};
					for (var j = 0; j < data.CourseQuestions[i].Answers.length; j++) {
						$scope.answers[data.CourseQuestions[i].ID].Value.push(null);
					}
				} else {
					$scope.answers[data.CourseQuestions[i].ID] = {QuestionID: data.CourseQuestions[i].ID, TeacherSSN: null, Value: null};
				}
			}

			studentResource.getTeachersForCourse($scope.courseID, $scope.semesterID).success(function(data) {
				$scope.model.teachers = data;
				var i;
				for (i = 0; i < $scope.model.teachers.length; i++) {
					$scope.model.teachers[i].questions = [];
					$scope.model.teachers[i].questions = $scope.evaluationFromServer.TeacherQuestions;
				}

				// Prepare the answers object.
				for (i = 0; i < data.length; i++) {
					for (var j = 0; j < $scope.evaluationFromServer.TeacherQuestions.length; j++) {
						if ($scope.evaluationFromServer.TeacherQuestions[j].Type === 'multiple') {

							$scope.answers[$scope.evaluationFromServer.TeacherQuestions[j].ID+data[i].SSN] = {QuestionID: $scope.evaluationFromServer.TeacherQuestions[j].ID, TeacherSSN: data[i].SSN, Value: []};
							for (var k = 0; k < $scope.evaluationFromServer.TeacherQuestions[j].Answers.length; k++) {
								$scope.answers[$scope.evaluationFromServer.TeacherQuestions[j].ID+data[i].SSN].Value.push(null);
							}
						} else {
							$scope.answers[$scope.evaluationFromServer.TeacherQuestions[j].ID+data[i].SSN] = {QuestionID: $scope.evaluationFromServer.TeacherQuestions[j].ID, TeacherSSN: data[i].SSN, Value: null};
						}
					}
				}
				console.log("ANS");
				console.log($scope.answers);
			});
});

$scope.postEvaluation = function() {

	var arr = [];

	for (var key in $scope.answers) {
		if($scope.answers.hasOwnProperty(key)) {
			// console.log($scope.answers[key]);
			arr.push($scope.answers[key]);
		}
	}

	var concatted = $scope.evaluationFromServer.CourseQuestions.concat($scope.evaluationFromServer.TeacherQuestions);

	for (var i = 0; i < arr.length; i++) {
		if (arr[i].Value === null) {continue;}
		if (arr[i].Value.constructor === Array) {
			for (var j = 0; j < concatted.length; j++) {
				for (var k = 0; k < concatted[j].Answers.length; k++) {
					if (arr[i].Value[k] === true) {
						arr[i].Value[k] = concatted[j].Answers[k].ID;
					}
				}
			}
			console.log(arr[i].Value);
			arr[i].Value = arr[i].Value.join();
		}
	}
	studentResource.postEvaluation($scope.courseID, $scope.semesterID, $scope.evalID, arr).success(function(data) {
		console.log("success");
		console.log(data);
	});
	//console.log(arr);
};
}
]);