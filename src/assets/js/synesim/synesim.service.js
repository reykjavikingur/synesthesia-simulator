var ColorMap = require('synesim/color-map');

angular.module('synesim')
	.service('synesim', function($q, colorMapRemote, colorMapLocal) {

		this.colorMap = colorMap;

		function colorMap(value) {
			if (value) {
				colorMapLocal.write(value);
			}
			var localValue = colorMapLocal.read();
			if (localValue) {
				return $q.when(localValue);
			} else {
				return colorMapRemote.read()
					.then(function(r) {
						colorMapLocal.write(r);
						return r;
					});
			}
		}

	});