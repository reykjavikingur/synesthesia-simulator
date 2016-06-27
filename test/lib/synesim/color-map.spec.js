var _ = require('underscore');
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

	describe('raw data source', function() {

		var sourceData;

		beforeEach(function() {
			sourceData = {
				"0": "#fc0707",
				"1": "#050405",
				"2": "#efd20b",
				"3": "#1db815",
				"4": "#e9503b",
				"5": "#0617f6",
				"6": "#14aa0e",
				"7": "#891190",
				"8": "#ec570a",
				"9": "#91f07a",
				"A": "#f20707",
				"B": "#f87a06",
				"C": "#e6f207",
				"D": "#f20d0d",
				"E": "#e89c58",
				"F": "#92430a",
				"G": "#f26960",
				"H": "#fb9b1c",
				"I": "#3b0446",
				"J": "#03ae19",
				"K": "#0c15f4",
				"L": "#980dae",
				"M": "#b696b9",
				"N": "#e0a35c",
				"O": "#f61009",
				"P": "#41e638",
				"Q": "#f6096d",
				"R": "#1f9e05",
				"S": "#f2f706",
				"T": "#823307",
				"U": "#f3dd14",
				"V": "#24bc11",
				"W": "#0b0df6",
				"X": "#762908",
				"Y": "#968e8e",
				"Z": "#1206f9"
			};
		});

		describe('.fromData', function() {

			var sourceDataBackup, instance;

			beforeEach(function() {
				sourceDataBackup = _.clone(sourceData);
				// sanity check
				expect(sourceDataBackup).toEqual(sourceData);
				instance = ColorMap.fromData(sourceData);
			});

			it('should preserve source data', function() {
				expect(sourceData).toEqual(sourceDataBackup);
			});

			it('should have correct color for A', function() {
				expect(instance.color('A')).toEqual('#f20707');
			})

			it('should have correct color for every grapheme from source data', function() {
				_.each(sourceData, function(color, grapheme) {
					expect(instance.color(grapheme)).toEqual(color);
				});
			});

			describe('.toData', function() {
				var data;
				beforeEach(function() {
					data = instance.toData();
				});
				it('should output equivalent data', function() {
					expect(data).toEqual(sourceData);
				});
				it('should dereference output data', function() {
					expect(data).not.toBe(sourceData);
				});
			});

		});

	});

});