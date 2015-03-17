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

		  $scope.today = function() {
    $scope.dt = new Date();
  };
  $scope.today();

  $scope.clear = function () {
    $scope.dt = null;
  };

  // Disable weekend selection
  $scope.disabled = function(date, mode) {
    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  };

  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };
  $scope.toggleMin();

  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened = true;
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];
	}
]);