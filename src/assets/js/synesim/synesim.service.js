var ColorMap = require('synesim/color-map');

angular.module('synesim')
	.service('synesim', function($q, $http) {

		var cachedColorMap;

		this.colorMap = colorMap;

		function colorMap() {
			if (cachedColorMap) {
				return $q.when(cachedColorMap);
			} else {
				return $http({
						method: 'GET',
						url: this.endpoint,
						headers: {
							accept: 'application/json'
						}
					})
					.then(function(r) {
						try {
							return ColorMap.fromData(r.data);
						} catch (e) {
							return $q.reject(e);
						}
					});
			}
		}

	});