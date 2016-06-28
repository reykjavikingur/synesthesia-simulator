angular.module('synesim')
	.controller('synesimController', function($log, $scope, synesim) {

		synesim.colorMap()
			.then(function(r) {
				$scope.colorMap = r;
			}, function(e) {
				$log.error('unable to load color map', e);
			});

	});