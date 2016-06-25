var Color = require('color');
var ColorMap = require('synesim/color-map');
var CssGenerator = require('synesim/css-generator');

describe('CssGenerator', function() {

	it('should be a function', function() {
		expect(CssGenerator).toEqual(jasmine.any(Function));
	});

	describe('instance created from new ColorMap', function() {
		var colorMap, cssGenerator;
		beforeEach(function() {
			colorMap = new ColorMap();
			cssGenerator = new CssGenerator(colorMap);
		});
		it('should be truthy', function() {
			expect(cssGenerator).toBeTruthy();
		});
		describe('generating CSS', function() {
			var css, el;
			beforeEach(function() {
				css = cssGenerator.generate();
				el = $('<div><style type="text/css">' + css + '</style><span class="a">a</span></div>');
				$(document.body).append(el);
			});
			afterEach(function() {
				el.remove();
			});
			it('should have pure black color style on span', function() {
				var actualColor = Color(el.find('span').eq(0).css('color'));
				var expectedColor = Color('#000000');
				expect(actualColor.rgbArray()).toEqual(expectedColor.rgbArray());
			});
		});
	});

	describe('instance created from ColorMap with few customizations', function() {
		var cssGenerator;
		beforeEach(function() {
			var colorMap = new ColorMap();
			colorMap.color('A', '#ff0000');
			colorMap.color('B', '#ff8800');
			cssGenerator = new CssGenerator(colorMap);
		});
		describe('generating CSS', function() {
			var css, el;
			beforeEach(function() {
				css = cssGenerator.generate();
				el = $('<div><style type="text/css">' + css + '</style><span class="a">a</span></div>');
				$(document.body).append(el);
			});
			afterEach(function() {
				el.remove();
			});
			it('should have correct style on first span', function() {
				var actualColor = Color(el.find('span').eq(0).css('color'));
				var expectedColor = Color('#ff0000');
				expect(actualColor.rgbArray()).toEqual(expectedColor.rgbArray());
			});
		});
	});

	describe('instance created with classPrefix', function() {
		var cssGenerator;
		beforeEach(function() {
			var colorMap = new ColorMap();
			colorMap.color('A', '#ff0000');
			cssGenerator = new CssGenerator(colorMap, {
				classPrefix: 'synesim-'
			});
		});
		describe('generating CSS', function() {
			var css, el;
			beforeEach(function() {
				css = cssGenerator.generate();
				el = $('<div><style type="text/css">' + css + '</style><span class="synesim-a">a</span></div>');
				$(document.body).append(el);
			});
			afterEach(function() {
				el.remove();
			});
			it('should have correct style on first span', function() {
				var actualColor = Color(el.find('span').eq(0).css('color'));
				var expectedColor = Color('#ff0000');
				expect(actualColor.rgbArray()).toEqual(expectedColor.rgbArray());
			});
		});
	});

});