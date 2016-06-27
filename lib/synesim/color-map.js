var _ = require('underscore');
var graphemes = require('./graphemes');

function ColorMap() {
	this.graphemes = graphemes;
	_.each(graphemes, function(grapheme) {
		this[grapheme] = '#000000';
	}, this);
}

_.extend(ColorMap, {
	fromData: fromData
});

ColorMap.prototype = {
	color: color,
	toData: toData
};

// STATIC METHODS

function fromData(data) {
	var colorMap = new ColorMap();
	_.each(data, function(color, grapheme) {
		colorMap.color(grapheme, color);
	});
	return colorMap;
}

// INSTANCE METHODS

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

function toData() {
	return _.chain(this.graphemes)
		.map(function(grapheme) {
			return [grapheme, this.color(grapheme)]
		}, this)
		.object()
		.value();
}

function _isValidColor(value) {
	var pattern = /^#[A-F0-9]{6}$/i;
	return pattern.test(value);
}

module.exports = ColorMap;