// including plugins
var gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
var runSequence = require('run-sequence');
var clean = require('gulp-clean');
var folder = './www/';

var codes = [];

// npm init
// npm install gulp browser-sync gulp-minify-html gulp-minify-css gulp-uglify run-sequence gulp-clean gulp-inject-partials gulp-sitemap gulp-imagemin --save

// https://julienrenaux.fr/2014/05/25/introduction-to-gulp-js-with-practical-examples/

gulp.task('default', ['maintask'], function (callback) {
	//runs maintask first, then:
	return callback;
});

gulp.task('maintask', function(callback) {
	// it runs 'clean' then 'copyall' then the other ones in parallel then callback
	return runSequence(
		'clean',
		'copyall',
		['minify-html'],
		callback);
});


gulp.task('clean', function () {
    return gulp.src('./dist/', {read: false})
        .pipe(clean());
});

gulp.task('copyall', function () {
	return gulp.src([folder + '**/*', folder + '*', folder + '.*'])
		.pipe(gulp.dest('./dist/'));
});

gulp.task('minify-html', () => {
	return gulp.src(folder + '**/*.html')
	.pipe(htmlmin({
		collapseWhitespace: true,
		removeComments: true,
		removeAttributeQuotes: true,
		minifyJS: true
	}))
	.pipe(gulp.dest('./dist/'));
});
