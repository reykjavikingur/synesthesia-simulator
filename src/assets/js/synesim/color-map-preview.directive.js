angular.module('synesim')
	.directive('synesimColorMapPreview', function() {

		return {
			restrict: 'E',
			template: require('./color-map-preview.html'),
			scope: {
				colorMap: '='
			},
			link: postLink
		};

		function postLink(scope, iElement, iAttributes) {

		}

	});