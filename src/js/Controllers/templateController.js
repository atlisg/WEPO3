angular.module('evaluationApp').controller('templateController', [
	'$scope', '$location', '$rootScope', '$routeParams', '$http', 'adminResource', 'currentUser',
	function ($scope, $location, $rootScope, $routeParams, $http, adminResource, currentUser) {
		$scope.template                  = {};
		$scope.template.ID               = $routeParams.ID;
		$scope.template.Title            = '';
		$scope.template.TitleEN          = '';
		$scope.template.IntroText        = '';
		$scope.template.IntroTextEN      = '';
		$scope.template.CourseQuestions  = [];
		$scope.template.TeacherQuestions = [];
		$scope.answerID					 = 0;
		if ($routeParams.ID !== undefined) {
			console.log("fetching info for " + $routeParams.ID);
			adminResource.getTemplate($routeParams.ID).success(function(data) {
				$scope.template.ID               = data.ID;
				$scope.template.Title            = data.Title;
				$scope.template.TitleEN          = data.TitleEN;
				$scope.template.IntroText        = data.IntroText;
				$scope.template.IntroTextEN      = data.IntroTextEN;
				$scope.template.CourseQuestions  = data.CourseQuestions;
				$scope.template.TeacherQuestions = data.TeacherQuestions;
			});
		}
		$scope.options = ['skrifleg' , 'einvals', 'fjölvals'];

		$scope.addQuestion = function(type) {
			var newQ = {
				ID: 0,
				Text: '',
				TextEN: '',
				ImageURL: '',
				Type: 'skrifleg',
				Answers: [{
					ID: $scope.answerID++,
					Text: '',
					TextEN: '',
					ImageURL: '',
					Weight: 5
				}]
			};
			if (type === 'course') {
				if ($scope.template.CourseQuestions.length !== 0) {
					newQ.ID = $scope.template.CourseQuestions[$scope.template.CourseQuestions.length - 1].ID + 1;
				}
				$scope.template.CourseQuestions.push(newQ);
			} else if (type === 'teacher') {
				if ($scope.template.TeacherQuestions.length !== 0) {
					newQ.ID = $scope.template.TeacherQuestions[$scope.template.TeacherQuestions.length - 1].ID + 1;
				}
				$scope.template.TeacherQuestions.push(newQ);
			}
		};

		$scope.addChoice = function (type, questionID) {
			var newA = {
				ID: $scope.answerID++,
				Text: '',
				TextEN: '',
				ImageURL: '',
				Weight: 5
			};
			if (type === 'course') {
				console.log($scope.template.CourseQuestions[questionID]);
				$scope.template.CourseQuestions[questionID].Answers.push(newA);
			} else if (type === 'teacher') {
				console.log($scope.template.TeacherQuestions[questionID]);
				$scope.template.TeacherQuestions[questionID].Answers.push(newA);
			}
		};

		$scope.newTemplate = function() {
			adminResource.createTemplate($scope.template);
		};
	}
]);