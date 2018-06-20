var gulp = require('gulp');

var clean = require('gulp-clean');
var less = require('gulp-less');
var minifyCSS = require('gulp-csso');
var pug = require('gulp-pug');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var autoprefixer = require('gulp-autoprefixer');

var runSequence = require('run-sequence');
var server = require('gulp-server-livereload');
var watch = require('gulp-watch');
var batch = require('gulp-batch');
var gutil = require('gulp-util');
var rename = require("gulp-rename");

gulp.task('clean', function () {
	// Remove old static folder

	return gulp.src('./static', { read: false })
		.pipe(clean());
});

gulp.task('css', function () {
	// Compile CSS

	return gulp.src(['./src/less/style.less'])
		.pipe(less())
		.pipe(autoprefixer({ browsers: ['last 20 versions'] }))
		.pipe(minifyCSS())
		.pipe(rename('style.min.css'))
		.pipe(gulp.dest('./static/css'));
});

gulp.task('js', function() {
	// Concat JS

	return gulp.src(['./src/js/vue.min.js', './src/js/vue-resource.js', './src/js/app.js'])
		.pipe(concat('scripts.min.js'))
		.pipe(uglify())
		.on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
		.pipe(gulp.dest('./static/js'))
});

gulp.task('static', function () {
	// Copy static files

	return gulp.src(['./src/icons/**', './src/img/**'], { base: './src/' })
		.pipe(gulp.dest('./static'));
});

gulp.task('html', function () {
	// Compile HTML

	return gulp.src(['./src/pug/*.pug', '!./src/pug/_*.pug'])
		.pipe(pug({ pretty: true }))
		.pipe(gulp.dest('./'));
});



// Default build task

gulp.task('build', function (callback) {
	runSequence('clean', ['css', 'js', 'static', 'html'], callback);
});



// Watch and server with livereload

gulp.task('watch', function () {
	watch('./src/**', batch(function (events, done) {
		gulp.start('build', done);
	}));
});

gulp.task('server', ['watch'], function () {
	gulp.src('./')
		.pipe(server({
			livereload: true,
			directoryListing: true,
			open: true
		}));
});