angular.module('evaluationApp').controller('evaluationsController', [
	'$scope', '$location', '$rootScope', '$routeParams', '$http', 'evaluationResource', 'currentUser',
	function ($scope, $location, $rootScope, $routeParams, $http, evaluationResource, currentUser) {
		// If the user didn't go through login,
		// redirect them to the login page.
		if(currentUser.username === '') {
			$location.path('/login');
			return;
		}

		$scope.fullName = currentUser.fullName;
		$scope.infoMessage = '';
		$scope.evaluations = {};

		evaluationResource.getEvaluations().success(function(data) {
			console.log(data);
			if(data.length === 0) {
				$scope.infoMessage = 'Engin kennslumöt, sem þú getur tekið, eru til staðar.';
			}
			$scope.evaluations = data;
		}).error(function(data) {
			// TODO: Error handling for the evaluations list.
		});

		$scope.dateIsActive = function(startDate, endDate) {
			var start = new Date(startDate);
			var end = new Date(endDate);
			var now = new Date(Date.now());
			return start < now && now < end;
		};
	}
]);