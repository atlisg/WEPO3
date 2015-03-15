angular.module('evaluationApp').controller('evaluationsController', [
	'$scope', '$location', '$rootScope', '$routeParams', '$http', 'adminResource', 'studentResource', 'currentUser','dataProcessor',
	function ($scope, $location, $rootScope, $routeParams, $http, adminResource, studentResource, currentUser, dataProcessor) {
		// If the user didn't go through login,
		// redirect them to the login page.
		if(currentUser.username === '') {
			$location.path('/login');
			return;
		}

		$scope.fullName = currentUser.fullName;
		$scope.infoMessage = '';
		$scope.evaluationsS = {};
		$scope.evaluationsA = {};

		$scope.role = currentUser.role;

		if($scope.role === 'admin') {
			adminResource.getEvaluations().success(function(data) {
				console.log(data);
				if(data.length === 0) {
					$scope.infoMessage = 'Engin kennslumöt, sem þú getur tekið, eru til staðar.';
				}
				$scope.evaluationsA = data;
				// Sort the evaluations by start date.
				$scope.evaluationsA.sort(function(a, b){
					if (a.StartDate > b.StartDate) {
						return -1;
					}
					if (a.EndDate < b.EndDate) {
						return 1;
					}
					return 0;
				});

				for (var i = 0; i < $scope.evaluationsA.length; i++) {
					$scope.evaluationsA[i].EndDate   = dataProcessor.formatDate(data[i].EndDate);
					$scope.evaluationsA[i].StartDate = dataProcessor.formatDate(data[i].StartDate);
				}
			}).error(function(data) {
				// TODO: Error handling for the evaluations list.
			});
		} else {
			studentResource.getEvaluations().success(function(data) {
				console.log(data);
				if(data.length === 0) {
					$scope.infoMessage = 'Engin kennslumöt, sem þú getur tekið, eru til staðar.';
				}

				$scope.evaluationsS = data;
			}).error(function(data) {
				// TODO: Error handling for the evaluations list.
			});
		}


		$scope.dateIsActive = function(startDate, endDate) {
			var start = new Date(startDate);
			var end = new Date(endDate);
			var now = new Date(Date.now());
			return start < now && now < end;
		};
	}
]);