angular.module('evaluationApp').controller('templatesController', [
	'$scope', '$location', '$rootScope', '$routeParams', '$http', 'adminResource', 'currentUser',
	function ($scope, $location, $rootScope, $routeParams, $http, adminResource, currentUser) {
		// If the user didn't go through login,
		// redirect them to the login page.
		if(currentUser.username === '') {
			$location.path('/login');
			return;
		}

		$scope.templates = {};
		$scope.fullName = currentUser.fullName;
		$scope.infoMessage = '';
		$scope.openDate = '';
		$scope.closeDate = '';

		$scope.createTemplate = function() {
			$location.path('/template');
		};

		$scope.makeEvaluation = function(id, startDate, endDate) {
			var start = new Date(startDate).toISOString();
			var end = new Date(endDate).toISOString();
			var converter = {
				TemplateID: id,
				StartDate: start,
				EndDate: end
			};
			adminResource.convertTemplate(converter).success(function(data) {
				console.log("success!");
			}).error(function(data) {
				console.log("error...");
			});
		};

		adminResource.getTemplates().success(function(data) {
			if (data.length === 0) {
				$scope.infoMessage = 'Engin sniðmát eru til staðar.';
			}
			$scope.templates = data;
		}).error(function(data) {
			// Handle this error!
		});
	}
]);