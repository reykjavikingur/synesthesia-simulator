var CssGenerator = require('synesim/css-generator');
var HtmlGenerator = require('synesim/html-generator');

angular.module('synesim')
	.directive('synesimTextRenderer', function() {

		return {
			template: '<style type="text/css"></style><div></div>',
			scope: {
				text: '=',
				colorMap: '='
			},
			link: postLink
		};

		function postLink(scope, iElement, iAttributes) {

			var styleEl = iElement.find('style');
			var divEl = iElement.find('div');
			iElement.addClass('text-renderer');

			var cssGenerator, htmlGenerator;

			scope.$watch('colorMap', function() {
				if (scope.colorMap) {
					cssGenerator = new CssGenerator(scope.colorMap, {
						classPrefix: 'syn'
					});
					htmlGenerator = new HtmlGenerator(scope.colorMap, {
						classPrefix: 'syn'
					});
					var css = cssGenerator.generate();
					styleEl.html(css);
				}
			});

			scope.$watchCollection('[text, colorMap]', function() {
				if (scope.colorMap && scope.text) {
					var html = htmlGenerator.generate(scope.text);
					divEl.html(html);
				}
			});
		}

	})