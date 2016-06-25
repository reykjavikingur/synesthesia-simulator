var ColorMap = require('synesim/color-map');
var HtmlGenerator = require('synesim/html-generator');

describe('HtmlGenerator', function() {

	it('should be a function', function() {
		expect(HtmlGenerator).toEqual(jasmine.any(Function));
	});

	describe('instance created from new ColorMap', function() {
		var colorMap, htmlGenerator;
		beforeEach(function() {
			colorMap = new ColorMap();
			htmlGenerator = new HtmlGenerator(colorMap);
		});
		it('should be truthy', function() {
			expect(htmlGenerator).toBeTruthy();
		});
		describe('generating HTML from string "k"', function() {
			var text, html;
			beforeEach(function() {
				text = 'k';
				html = htmlGenerator.generate(text);
			});
			it('should return a string', function() {
				expect(html).toEqual(jasmine.any(String));
			});
			describe('HTML element', function() {
				var el;
				beforeEach(function() {
					el = $('<div>' + html + '</div>');
				});
				it('should have one span', function() {
					expect(el.find('span').length).toEqual(1);
				});
				it('should have class "k" on one and only span', function() {
					var spanEl = el.find('span').eq(0);
					expect(spanEl.attr('class')).toEqual('k');
				});
			});
		});
		describe('generating HTML from string "Ok"', function() {
			var html;
			beforeEach(function() {
				html = htmlGenerator.generate('Ok');
			});
			describe('DOM element', function() {
				var el;
				beforeEach(function() {
					el = $('<div>' + html + '</div>');
				});
				it('should have two spans', function() {
					expect(el.find('span').length).toEqual(2);
				});
				it('should have class "o" on first span', function() {
					expect(el.find('span').eq(0).attr('class')).toEqual('o');
				});
				it('should have "O" in first span', function() {
					expect(el.find('span').eq(0).html()).toEqual('O');
				});
				it('should have class "k" on second span', function() {
					expect(el.find('span').eq(1).attr('class')).toEqual('k');
				});
				it('should have "k" in second span', function() {
					expect(el.find('span').eq(1).html()).toEqual('k');
				});
			});
		});
		describe('generating HTML from string "Ok."', function() {
			var html;
			beforeEach(function() {
				html = htmlGenerator.generate('Ok.');
			});
			describe('DOM element', function() {
				var el;
				beforeEach(function() {
					el = $('<div>' + html + '</html>');
				});
				it('should have two spans', function() {
					expect(el.find('span').length).toEqual(2);
				});
				it('should have class "o" on first span', function() {
					expect(el.find('span').eq(0).attr('class')).toEqual('o');
				});
				it('should have "O" in first span', function() {
					expect(el.find('span').eq(0).html()).toEqual('O');
				});
				it('should have class "k" on second span', function() {
					expect(el.find('span').eq(1).attr('class')).toEqual('k');
				});
				it('should have "k" in second span', function() {
					expect(el.find('span').eq(1).html()).toEqual('k');
				});
				it('should have correct text', function() {
					expect(el.text()).toEqual('Ok.');
				});
			});
		});
	});

	describe('instance created with classPrefix option', function() {
		var htmlGenerator;
		beforeEach(function() {
			htmlGenerator = new HtmlGenerator(new ColorMap(), {
				classPrefix: 'synesim-'
			});
		});
		describe('generating HTML from string "k"', function() {
			var html;
			beforeEach(function() {
				html = htmlGenerator.generate('k');
			});
			describe('DOM element', function() {
				var el;
				beforeEach(function() {
					el = $('<div>' + html + '</div>');
				});
				it('should have one span', function() {
					expect(el.find('span').length).toEqual(1);
				});
				fit('should have correct class on the one span', function() {
					expect(el.find('span').eq(0).attr('class')).toEqual('synesim-k');
				});
			});
		});
	});

});