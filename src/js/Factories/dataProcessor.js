angular.module('evaluationApp').factory('dataProcessor',
	function () {

		var factory = {};

		factory.formatDate = function(date) {
			var d = new Date(date);
			var sec  = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds();
			var min  = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
			var hour = d.getHours()   < 10 ? '0' + d.getHours()   : d.getHours();
			var day  = d.getDate()    < 10 ? '0' + d.getDate()    : d.getDate();
			var mnth = d.getMonth()+1 < 10 ? '0' + (d.getMonth()+1) : (d.getMonth()+1);
			var year = d.getFullYear();
			return day + '.' + mnth + '.' + year + ', ' + hour + ':' + min;
		};

		return factory;
	}
);
