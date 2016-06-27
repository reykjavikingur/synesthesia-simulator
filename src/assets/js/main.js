var query = require('util/query'); // include from "lib"
var audit = require('./audit'); // include locally

console.log('main script');

// If the query string includes the parameter "audit", then write navigator information to console.
var q = query();
if (q.audit) {
	audit.log();
}

require('./synesim/synesim.module');