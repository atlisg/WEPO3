angular.module('evaluationApp').service('currentUser',
	function() {
		this.token = '';
		this.username = '';
		this.fullName = '';
		this.role = '';
		this.ssn = '';
		this.imageURL = '';
		return this;
	}
);

