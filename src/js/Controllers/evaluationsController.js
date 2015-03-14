angular.module('evaluationApp').controller('evaluationsController', [
	'$scope', '$location', '$rootScope', '$routeParams', '$http', 'evaluationResource', 'currentUser',
	function ($scope, $location, $rootScope, $routeParams, $http, evaluationResource, currentUser) {
		// If the user didn't go through login,
		// redirect them to the login page.
		if(currentUser.username === '') {
			$location.path('/login');
			return;
		}

		$scope.evaluations = {};
		$scope.fullName = currentUser.fullName;
		$scope.infoMessage = '';

		evaluationResource.getEvaluations().success(function(data) {
			if(data.length === 0) {
				$scope.infoMessage = 'Engin kennslumöt, sem þú getur tekið, eru til staðar.';
			}
			$scope.evaluations = data;
		}).error(function(data) {
			// TODO: Error handling for the evaluations list.
		});
	}
]);