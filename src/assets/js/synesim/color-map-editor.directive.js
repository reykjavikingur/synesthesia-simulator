angular.module('synesim')
	.directive('synesimColorMapEditor', function(synesim) {

		return {
			restrict: 'E',
			template: require('./color-map-editor.html'),
			scope: {
				colorMap: '='
			},
			link: postLink
		}

		function postLink(scope, iElement, iAttributes) {

			scope.$watch('colorMap', function() {
				_setCode();
			});

			scope.selectGrapheme = function selectGrapheme(grapheme) {
				scope.selectedGrapheme = grapheme;
				scope.selectedColor = scope.colorMap.color(grapheme);
			};

			scope.deselectGrapheme = function deselectGrapheme() {
				scope.selectedGrapheme = null;
				scope.selectedColor = null;
				if (scope.colorMap) {
					synesim.colorMap(scope.colorMap);
				}
			}

			scope.$watch('selectedColor', function() {
				if (scope.selectedColor && scope.selectedGrapheme && scope.colorMap) {
					scope.colorMap.color(scope.selectedGrapheme, scope.selectedColor);
					_setCode();
				}
			});

			function _setCode() {
				if (scope.colorMap) {
					var data = scope.colorMap.toData();
					scope.code = JSON.stringify(data);
				} else {
					scope.code = '';
				}
			}

		}

	});