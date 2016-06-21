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
	});

});