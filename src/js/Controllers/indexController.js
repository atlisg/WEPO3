// This controller is used to pass data to the index.html file.
angular.module('evaluationApp').controller('indexController', [
	'$scope', '$rootScope', 'currentUser',
	function ($scope, $rootScope, currentUser) {
		$rootScope.$on('userLoggedIn', function() {
			$scope.userData = currentUser;
		});
	}
]);