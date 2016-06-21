var _ = require('underscore');
var graphemes = require('./graphemes');

function ColorMap() {
	_.each(graphemes, function(grapheme) {
		this[grapheme] = '#000000';
	}, this);
}

module.exports = ColorMap;