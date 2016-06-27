angular.module('synesim')
	.controller('synesimController', function($scope, synesim) {

		synesim.colorMap()
			.then(function(r) {
				$scope.colorMap = r;
			});

	});