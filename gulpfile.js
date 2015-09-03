var gulp = require('gulp');
var browserSync = require('browser-sync');

var bs = browserSync.create();

gulp.task('default', ['build']);

gulp.task('build', ['build:assets', 'build:jslib'], function() {
	return gulp.src('src/**/*.*')
		.pipe(gulp.dest('dst'));
});

gulp.task('build:assets', function() {
	return gulp.src('assets/**/*')
		.pipe(gulp.dest('dst/assets'));
});

gulp.task('build:jslib', function() {
	return gulp.src([
			'node_modules/jquery/dist/jquery.min.js',
			'node_modules/underscore/underscore-min.js',
			'node_modules/angular/angular.min.js',
			'node_modules/angular-color-picker/angular-color-picker.js',
			'node_modules/angular-color-picker/angular-color-picker.css'
		])
		.pipe(gulp.dest('dst/js/lib'));
});

gulp.task('serve', ['build'], function(cb) {
	bs.init({
		files: ['dst/**/*.css'],
		server: {
			baseDir: 'dst'
		}
	}, cb);
});

gulp.task('develop', ['serve'], function() {
	gulp.watch(['src/**/*.*'], ['build']);
});