var _ = require('underscore');

function CssGenerator(colorMap, options) {
	if (!colorMap) {
		throw new Error('CssGenerator must be instantiated with a ColorMap');
	}
	this.colorMap = colorMap;
	this.options = _.clone(options || {});
	_.defaults(this.options, {
		classPrefix: ''
	});
}

CssGenerator.prototype = {
	generate: generate
}

function generate() {
	return _.map(this.colorMap.graphemes, function(grapheme) {
		var className = this.options.classPrefix + grapheme.toLowerCase();
		return [
			'.' + className + '{',
			'color:' + this.colorMap.color(grapheme) + ';',
			'}\n'
		].join('');
	}, this).join('');
}

module.exports = CssGenerator;