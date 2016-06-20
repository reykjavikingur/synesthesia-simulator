var gulp = require('gulp');
var gutil = require('gulp-util');
var config = require('./config');

gulp.task('default', ['serve']);

gulp.task('serve', [config.production ? 'serve:start' : 'serve:open']);

gulp.task('build', ['build:html', 'build:misc', 'build:sass', 'build:bower', 'build:js']);

gulp.task('watch', ['watch:html', 'watch:misc', 'watch:sass', 'watch:bower', 'watch:js']);

gulp.task('clean', function (cb) {
	var rimraf = require('rimraf');
	rimraf(config.dst, cb);
});

// BUILD

var htmlFiles = config.src + '/*.html';

gulp.task('build:html', function () {
	return gulp.src(htmlFiles)
		.pipe(gulp.dest(config.dst));
});

gulp.task('watch:html', ['build:html'], function () {
	gulp.watch(htmlFiles, ['build:html']);
});

var sassPath = '/assets/css';
var sassFiles = config.src + sassPath + '/**/*.scss';

gulp.task('build:sass', function () {
	var sass = require('gulp-sass');
	var sourcemaps = require('gulp-sourcemaps');
	return gulp.src(sassFiles)
		//.pipe(sourcemaps.init())
		.pipe(sass({outputStyle: 'compressed'}).on('error', handleError))
		//.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(config.dst + sassPath));

	function handleError(err) {
		sass.logError.call(this, err);
		this.emit('end');
		if (config.production) {
			process.exit(1);
		}
	}
});

gulp.task('watch:sass', ['build:sass'], function () {
	gulp.watch(sassFiles, ['build:sass']);
});

var miscPath = '/assets/misc';
var miscFiles = config.src + miscPath + '/**/*';

gulp.task('build:misc', function () {
	return gulp.src(miscFiles)
		.pipe(gulp.dest(config.dst + miscPath));
});

gulp.task('watch:misc', ['build:misc'], function () {
	gulp.watch(miscFiles, ['build:misc']);
});

gulp.task('build:bower', function () {
	var bower = require('main-bower-files');
	var bowerNormalizer = require('gulp-bower-normalize');
	return gulp.src(bower(), {
		base: './bower_components'
	})
		.pipe(bowerNormalizer({
			bowerJson: './bower.json',
			flatten: true
		}))
		.pipe(gulp.dest(config.dst + '/assets/vendor'));
});

gulp.task('watch:bower', ['build:bower'], function () {
	gulp.watch('bower.json', ['build:bower']);
});

var jsPath = '/assets/js';
var jsMainBase = 'main.js';
var jsMainFile = config.src + jsPath + '/' + jsMainBase;
var jsFiles = config.src + jsPath + '/**/*';
var jsLib = 'lib';
var jsLibFiles = jsLib + '/**/*';

gulp.task('build:js', function () {
	var browserify = require('browserify');
	var source = require('vinyl-source-stream');
	var buffer = require('vinyl-buffer');
	var sourcemaps = require('gulp-sourcemaps');
	var ngAnnotate = require('gulp-ng-annotate');

	return browserify(jsMainFile, {
		debug: true,
		paths: [jsLib],
		transform: ['partialify']
	})
		.bundle()
		.on('error', handleError)
		.pipe(source(jsMainBase))
		.pipe(buffer())
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(ngAnnotate())
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(config.dst + jsPath))
		;

	function handleError(err) {
		console.error(err.toString());
		this.emit('end');
		if (config.production) {
			process.exit(1);
		}
	}

});

gulp.task('watch:js', ['build:js'], function () {
	gulp.watch([jsFiles, jsLibFiles], ['build:js']);
});

gulp.task('serve:start', [config.production ? 'build' : 'watch'], function (cb) {
	var server = require('../server')(config);
	server.listen(config.port, function (err) {
		if (err) {
			console.error('unable to start server', err);
		}
		else {
			console.log('started server on port ' + config.port);
		}
		cb(err);
	});
});

gulp.task('serve:open', ['serve:start'], function (cb) {
	var open = require('open');
	open('http://localhost:' + config.port);
	cb();
});
