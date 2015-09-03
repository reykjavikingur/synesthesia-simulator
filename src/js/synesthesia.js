angular.module('mc.synesthesia', ['mp.colorPicker'])

.service('SynesthesiaColorMapService', function() {

	var GRAPHEME_STRING = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

	var DEFAULT_COLOR = '#000000';

	this.graphemes = function graphemes() {
		return GRAPHEME_STRING.split('');
	};

	this.colorMap = function colorMap() {
		return _.chain(this.graphemes())
			.map(function(grapheme) {
				return [grapheme, DEFAULT_COLOR];
			})
			.object()
			.value();
	};

	this.dataUrl = function dataUrl(colorMap) {
		var jsonString = JSON.stringify(colorMap);
		var base64String = btoa(jsonString);
		var prefix = 'data:text/plain;base64,';
		return prefix + base64String;
	};

	this.fromDataUrl = function fromDataUrl(dataUrl) {
		var base64String = dataUrl.replace(/^data:.*?;base64,/, '');
		var jsonString = atob(base64String);
		var object = JSON.parse(jsonString);
		this.validate(object);
		return object;
	};

	this.validate = function validate(colorMap) {
		var colorPattern = /^#[0-9A-F]{6}$/i;
		_.each(this.graphemes(), function(grapheme) {
			if (!colorMap.hasOwnProperty(grapheme)) {
				throw new Error('missing grapheme "' + grapheme + '"');
			}
			var color = colorMap[grapheme];
			if (!colorPattern.test(color)) {
				throw new Error('invalid color "' + color + '" for grapheme "' + grapheme + '"');
			}
		});
	};

})

.controller('SynesthesiaController', function($scope, $log, SynesthesiaColorMapService) {

	// Initialization

	$scope.sampleText = 'Grapheme-color synesthesia is a condition causing a person to experience each symbol (character of the alphabet and digit) as though it were a particular color, in addition to the physical color with which it was printed or displayed on a screen.';

	$scope.graphemes = SynesthesiaColorMapService.graphemes();

	$scope.selectedGrapheme = $scope.graphemes[0];

	$scope.colorMap = SynesthesiaColorMapService.colorMap();

	$scope.selectedColor = $scope.colorMap[$scope.selectedGrapheme];

	$scope.fileDataUrl = null;

	// Watchers
	
	$scope.$watch('fileDataUrl', function(fileDataUrl) {
		if (Boolean(fileDataUrl)) {
			$scope.colorMap = SynesthesiaColorMapService.fromDataUrl(fileDataUrl);
		}
	});

	// Methods

	$scope.selectGrapheme = function selectGrapheme(grapheme) {
		$scope.selectedGrapheme = grapheme;
	};

	$scope.downloadColorMap = function downloadColorMap() {
		window.open(SynesthesiaColorMapService.dataUrl($scope.colorMap), '_blank');
	};

})

.directive('mcSynesthesize', function() {

	return {
		scope: {
			text: '@',
			colorMap: '@'
		},
		link: function postLink(scope, iElement, iAttributes) {

			scope.$watchCollection('[text, colorMap]', function(newValues) {
				var text = newValues[0];
				var colorMap = scope.$eval(newValues[1]);
				if (Boolean(text) && Boolean(colorMap)) {
					var html = '';
					var chars = text.split('');
					_.each(chars, function(char) {
						var grapheme = char.toUpperCase();
						if (colorMap.hasOwnProperty(grapheme)) {
							html += '<span class="syn' + grapheme + '">' + char + '</span>';
						} else {
							html += char;
						}
					});
					iElement.html(html);
				} else {
					iElement.html('');
				}
			});

		}
	};

})

.directive('mcFileDataUrl', function($log) {

	return {
		restrict: 'A',
		scope: {
			mcFileDataUrl: '='
		},
		link: function postLink(scope, iElement, iAttributes) {
			iElement.on('change', function(changeEvent) {
				$log.debug('file input changed');
				var reader = new FileReader();
				reader.onload = function(loadEvent) {
					$log.debug('file loaded');
					scope.$apply(function() {
						scope.mcFileDataUrl = loadEvent.target.result;
					});
				};
				reader.readAsDataURL(changeEvent.target.files[0]);
			});
		}

	};

})

;