var ColorMap = require('synesim/color-map');

angular.module('synesim')
	.service('colorMapRemote', function($q, $http) {

		this.read = read;

		/**
		 * Reads the color map data from remote resource.
		 * @return {Promise} The promise resolving to ColorMap
		 */
		function read() {
			if (!this.endpoint) {
				return $q.reject(new Error('unable to read remote color map data without endpoint'));
			}
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

	})