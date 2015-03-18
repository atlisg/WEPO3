angular.module('evaluationApp').controller('templatesController', [
	'$scope', '$location', '$rootScope', '$routeParams', '$http', 'adminResource', 'currentUser',
	function ($scope, $location, $rootScope, $routeParams, $http, adminResource, currentUser) {

		$scope.templates = {};
		$scope.fullName = currentUser.fullName;
		$scope.infoMessage = '';
		$scope.dateMessage = '';
		$scope.openDate = '';
		$scope.closeDate = '';

		$scope.createTemplate = function() {
			$location.path('/template');
		};

		$scope.makeEvaluation = function(id, startDate, endDate) {
			var start = new Date(startDate).toISOString();
			var end = new Date(endDate).toISOString();
			var now = new Date().toISOString();
			$scope.dateMessage = '';
			$scope.currentID = id;
			if (start <= now) {
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