angular.module('synesim')
	.directive('synesimTextEditor', function(synesim) {

		return {
			restrict: 'E',
			template: require('./text-editor.html'),
			scope: {
				colorMap: '='
			},
			link: postLink
		};

		function postLink(scope, iElement, iAttributes) {
			scope.synesim = synesim;
		}

	})