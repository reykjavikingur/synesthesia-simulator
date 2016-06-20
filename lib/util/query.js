/**
 * Returns query string as object
 */
function query() {
	var qs = window.location.search;
	var obj = {};
	if (qs && qs.length > 0) {
		qs = qs.substring(1); // remove initial '?'
		var parts = qs.split('&');
		parts.forEach(function(part) {
			var pair = part.split('=');
			obj[pair[0]] = pair[1];
		});
	}
	return obj;
}

module.exports = query;