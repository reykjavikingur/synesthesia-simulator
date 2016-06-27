angular.module('synesim')
	.directive('synesimColorMapEditor', function() {

		return {
			restrict: 'E',
			template: require('./color-map-editor.html'),
			scope: {
				colorMap: '='
			},
			link: postLink
		}

		function postLink(scope, iElement, iAttributes) {

		}

	});