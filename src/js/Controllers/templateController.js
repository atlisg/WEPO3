angular.module('evaluationApp').controller('templateController', [
	'$scope', '$location', '$rootScope', '$routeParams', '$http', 'adminResource', 'currentUser',
	function ($scope, $location, $rootScope, $routeParams, $http, adminResource, currentUser) {
		$scope.errorMessage = '';
		$scope.template                  = {};
		$scope.template.ID               = $routeParams.ID;
		$scope.template.Title            = '';
		$scope.template.TitleEN          = '';
		$scope.template.IntroText        = '';
		$scope.template.IntroTextEN      = '';
		$scope.template.CourseQuestions  = [];
		$scope.template.TeacherQuestions = [];
		$scope.answerID					 = 0;
		$scope.questionID				 = 0;
		$scope.dateMessage               = '';
		$scope.currentID                 = 0;

		if ($routeParams.ID !== undefined) {
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
		$scope.options = ['text' , 'single', 'multiple'];

		$scope.addQuestion = function(type) {
			var newQ = {
				ID: $scope.questionID++,
				Text: '',
				TextEN: '',
				ImageURL: '',
				Type: 'text',
				Answers: [{
					ID: $scope.answerID++,
					Text: '',
					TextEN: '',
					ImageURL: '',
					Weight: 5
				}]
			};
			if (type === 'course') {
				$scope.template.CourseQuestions.push(newQ);
			} else if (type === 'teacher') {
				$scope.template.TeacherQuestions.push(newQ);
			}
		};

		$scope.removeQuestion = function(ID, type) {
			if (type === 'course') {
				// find the element in the array
				for (var i = $scope.template.CourseQuestions.length - 1; i >= 0; i--) {
					if ($scope.template.CourseQuestions[i].ID === ID) {
						$scope.template.CourseQuestions.splice(i, 1);
						break;
					}
				}
			} else if (type === 'teacher') {
				// find the element in the array
				for (var j = $scope.template.TeacherQuestions.length - 1; j >= 0; j--) {
					if ($scope.template.TeacherQuestions[j].ID === ID) {
						$scope.template.TeacherQuestions.splice(j, 1);
						break;
					}
				}
			}
		};

		$scope.addChoice = function(question) {
			var newA = {
				ID: $scope.answerID++,
				Text: '',
				TextEN: '',
				ImageURL: '',
				Weight: 5
			};
			question.Answers.push(newA);
		};

		$scope.removeChoice = function(ID, question) {
			// find the element in the array
			for (var k = question.Answers.length - 1; k >= 0; k--) {
				if (question.Answers[k].ID === ID) {
					question.Answers.splice(k, 1);
					break;
				}
			}
		};
		$scope.saveTemplate = function() {
			if ($scope.templateForm.$valid) {
				if($scope.template.CourseQuestions.length === 0 || $scope.template.TeacherQuestions === 0) {
					$scope.errorMessage = 'Þú verður að hafa að minnsta kosti eina spurningu í sniðmátinu.';
				} else {
					adminResource.createTemplate($scope.template).success(function() {
						$location.path('/templates');
					}).error(function() {
						$scope.errorMessage = 'Villa! Ekki tókst að vista sniðmát.';
					});
				}
			} else {
				$scope.errorMessage = 'Þú hefur ekki fyllt út í alla nauðsynlega reiti.';
			}
		};

		$scope.makeEvaluation = function(id, startDate, endDate) {
			var start = new Date(startDate).toISOString();
			var end = new Date(endDate).toISOString();
			var now = new Date().toISOString();
			$scope.dateMessage = '';
			$scope.currentID = id;
			if (start < now) {
				$scope.dateMessage = 'Opnunardagsetning verður að vera á morgun eða seinna.';
				return;
			}
			if (end <= start) {
				$scope.dateMessage = 'Lokunardagsetning verður að vera á eftir opnunardagsetningu.';
				return;
			}
			var converter = {
				TemplateID: id,
				StartDate: start,
				EndDate: end
			};

			adminResource.convertTemplate(converter).success(function(data) {
				$location.path('/evaluations');
			}).error(function(data) {
				$scope.dateMessage = 'Villa! Ekki tókst að opna kennslumat.';
			});
		};
	}
]);