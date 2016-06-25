var _ = require('underscore');
var graphemes = require('./graphemes');

function ColorMap() {
	_.each(graphemes, function(grapheme) {
		this[grapheme] = '#000000';
	}, this);
}

ColorMap.prototype = {
	color: color
};

function color(grapheme, color) {
	grapheme = grapheme.toUpperCase();
	if (color) {
		if (!_isValidColor(color)) {
			throw new Error('invalid color');
		}
		if (graphemes.indexOf(grapheme) < 0) {
			throw new Error('invalid grapheme');
		}
		this[grapheme] = color;
	}
	return this[grapheme];
}

function _isValidColor(value) {
	var pattern = /^#[A-F0-9]{6}$/i;
	return pattern.test(value);
}

module.exports = ColorMap;