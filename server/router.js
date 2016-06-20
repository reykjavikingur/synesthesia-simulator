var express = require('express');

var router = express.Router();

router.get('/', function (req, res, next) {
	res.render('index', {});
});

router.get('/about', function(req, res, next) {
	var pkg = require('../package.json');
	res.render('about', {
		name: pkg.name,
		version: pkg.version
	});
});

module.exports = router;