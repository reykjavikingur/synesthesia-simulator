var graphemes = require('synesim/graphemes');

describe('graphemes', function() {

	it('should be an array', function() {
		expect(graphemes).toEqual(jasmine.any(Array));
	});

	it('should contain A', function() {
		expect(graphemes).toContain('A');
	});

});