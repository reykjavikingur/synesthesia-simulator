var _ = require('underscore');

function HtmlGenerator(colorMap, options) {
	if (!colorMap) {
		throw new Error('HtmlGenerator must be constructed with a ColorMap');
	}
	this.colorMap = colorMap;
	this.options = _.clone(options || {});
	_.defaults(this.options, {
		classPrefix: ''
	});
}

HtmlGenerator.prototype = {
	generate: generate
}

function generate(text) {
	return _.map(text.split(''), function(char) {
		if (this.colorMap.color(char)) {
			var cssClass = this.options.classPrefix + char.toLowerCase();
			return '<span class="' + cssClass + '">' + char + '</span>';
		} else {
			return char;
		}
	}, this).join('');
}

module.exports = HtmlGenerator;