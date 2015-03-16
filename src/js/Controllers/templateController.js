angular.module('evaluationApp').controller('templateController', [
	'$scope', '$location', '$rootScope', '$routeParams', '$http', 'evaluationResource', 'currentUser',
	function ($scope, $location, $rootScope, $routeParams, $http, evaluationResource, currentUser) {
		$scope.template                  = {};
		$scope.template.ID               = $routeParams.ID;
		$scope.template.Title            = '';
		$scope.template.TitleEN          = '';
		$scope.template.IntroText        = '';
		$scope.template.IntroTextEN      = '';
		$scope.template.CourseQuestions  = [];
		$scope.template.TeacherQuestions = [];
		if ($routeParams.ID !== null) {
			console.log("fetching info for " + $routeParams.ID);
			evaluationResource.getTemplate($routeParams.ID).success(function(data) {
				$scope.template.ID               = data.ID;
				$scope.template.Title            = data.Title;
				$scope.template.TitleEN          = data.TitleEN;
				$scope.template.IntroText        = data.IntroText;
				$scope.template.IntroTextEN      = data.IntroTextEN;
				$scope.template.CourseQuestions  = data.CourseQuestions;
				$scope.template.TeacherQuestions = data.TeacherQuestions;
			});
		}
		
		$scope.addQuestion = function() {
			var newQ = {
				ID: 0,
				text: '',
				textEN: '',
				type: '',
				answers: []
			};
			if ($scope.cqstns.length() !== 0) {
				newQ.ID = $scope.cqstns[$scope.cqstns.length() - 1].ID + 1;
			}
			$scope.template.cqstns.push(newQ);
		};

		$scope.newTemplate = function() {
			evaluationResource.createTemplate($scope.template);
		};
	}
]);