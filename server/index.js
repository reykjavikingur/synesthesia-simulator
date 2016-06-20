var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compstache = require('compstache');
var router = require('./router');

function Server(config) {

	var server = express();

	// Browser Sync
	if (!config.production) {
		var browserSync = require('browser-sync');
		var bs = browserSync({
			files: config.dst,
			logSnippet: false
		});
		server.use(require('connect-browser-sync')(bs));
	}

	server.engine('html', compstache.__express);
	server.set('view engine', 'html');
	server.set('views', 'views');

	server.use(logger('dev'));
	server.use(bodyParser.json());
	server.use(bodyParser.urlencoded({extended: false}));
	server.use(cookieParser());
	server.use(express.static(config.dst));

	server.use('/', router);

	// catch 404 and forward
	server.use(function (req, res, next) {
		var err = new Error('Not Found');
		err.status = 404;
		next(err);
	});

	// render error pages
	server.use(function (err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			error: err
		});
	});

	return server;

}

module.exports = Server;