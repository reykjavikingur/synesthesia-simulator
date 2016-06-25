var ColorMap = require('synesim/color-map');

describe('ColorMap', function() {

	it('should be a function', function() {
		expect(ColorMap).toEqual(jasmine.any(Function));
	});

	describe('instance', function() {
		var instance;
		beforeEach(function() {
			instance = new ColorMap();
		});
		it('should be truthy', function() {
			expect(instance).toBeTruthy();
		});
		it('should have property A', function() {
			expect(instance.A).toBeTruthy();
		});

		describe('get color from grapheme', function() {
			it('should return pure black given A', function() {
				expect(instance.color('A')).toEqual('#000000');
			});
			it('should return pure black given a', function() {
				expect(instance.color('a')).toEqual('#000000');
			});
			it('should return nothing given AB', function() {
				expect(instance.color('AB')).toBeFalsy();
			});
		});

		describe('set color for graphemes A, B', function() {
			beforeEach(function() {
				instance.color('A', '#ff0000');
				instance.color('B', '#ff8800');
			});
			it('should return correct color for A', function() {
				expect(instance.color('A')).toEqual('#ff0000');
			});
			it('should return correct color for a', function() {
				expect(instance.color('a')).toEqual('#ff0000');
			});
			it('should return correct color for B', function() {
				expect(instance.color('B')).toEqual('#ff8800');
			});
			it('should return pure black for C', function() {
				expect(instance.color('C')).toEqual('#000000');
			});
		});

		describe('set color for grapheme a, b', function() {
			beforeEach(function() {
				instance.color('a', '#ff0000');
				instance.color('b', '#ff8800');
			});
			it('should return correct color for A', function() {
				expect(instance.color('A')).toEqual('#ff0000');
			});
			it('should return correct color for a', function() {
				expect(instance.color('a')).toEqual('#ff0000');
			});
		});

		it('should throw error when setting color for AB', function() {
			expect(function() {
				instance.color('AB', '#ff00ff');
			}).toThrowError();
		});

		it('should throw error when setting invalid color for A', function() {
			expect(function() {
				instance.color('A', '#ff000');
			}).toThrowError();
		});
	});

});