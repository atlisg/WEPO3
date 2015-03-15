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

		evaluationResource.getEvaluation($scope.evalID, $scope.courseID, $scope.semesterID)
		.success(function(data) {
			console.log(data);
		});
	}
]);