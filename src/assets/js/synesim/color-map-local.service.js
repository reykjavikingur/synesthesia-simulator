var ColorMap = require('synesim/color-map');

angular.module('synesim')
	.service('colorMapLocal', function() {

		this.read = read;
		this.write = write;

		/**
		 * Reads the color map from local storage.
		 * @return {ColorMap} The local color map
		 */
		function read() {
			return localStorage.colorMap ? ColorMap.fromData(JSON.parse(localStorage.colorMap)) : null;
		}

		/**
		 * Writes the color map to local storage.
		 */
		function write(colorMap) {
			localStorage.colorMap = JSON.stringify(colorMap.toData());
		}

	});