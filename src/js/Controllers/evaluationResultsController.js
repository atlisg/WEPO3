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
		adminResource.getEvaluationResults($scope.evalID).success(function(data) {
			console.log(data);
			$scope.evaluation.title = data.TemplateTitle;
			$scope.evaluation.courses = data.Courses;
		});
	}
]);