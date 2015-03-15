angular.module('evaluationApp').controller('authenticationController', [
	'$scope', '$location', '$rootScope', '$routeParams', '$http', 'evaluationResource', 'currentUser',
	function ($scope, $location, $rootScope, $routeParams, $http, evaluationResource, currentUser) {
		$scope.user = 'bergthor13';
		$scope.pass = '123456';
		$scope.errorMessage = '';
		$scope.warningMessage = '';
		$scope.submitted = false;
		$scope.login = function() {
			$scope.errorMessage = '';
			$scope.submitted = true;
			var loginObject = { user: $scope.user,
				                pass: $scope.pass };

			if ($scope.loginForm.$valid) {
				evaluationResource.loginUser(loginObject).success(function(data) {
					// Put in the data for the user that logged in.
					$scope.getUserData(data);
					$rootScope.$broadcast('userLoggedIn');
					$location.path('/evaluations');
				}).error(function() {
					$scope.errorMessage = 'Það kom upp villa. Þú hefur mögulega slegið inn rangt notandanafn eða lykilorð.';
				});
			}

		};

		$scope.getUserData = function(loginData) {
			currentUser.token    = loginData.Token;
			currentUser.username = loginData.User.Username;
			currentUser.fullName = loginData.User.FullName;
			currentUser.role     = loginData.User.Role;
			currentUser.ssn      = loginData.User.SSN;
			currentUser.imageURL = loginData.User.ImageURL;
		};

		$rootScope.logout = function() {
			currentUser.token    = '';
			currentUser.username = '';
			currentUser.fullName = '';
			currentUser.role     = '';
			currentUser.ssn      = '';
			currentUser.imageURL = '';
			$location.path('/login');

		};
}]);