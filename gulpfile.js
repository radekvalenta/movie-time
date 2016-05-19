'use strict';

var gulp = require('gulp');
var connect = require('gulp-connect'); // local server
var open = require('gulp-open'); // auto open URl in browser
var browserify = require('browserify');
var vinyl = require('vinyl-source-stream');
var babelify = require('babelify'); // transforms ES6 to ES5
var sass = require('gulp-sass');

var config = {
	port: 	8080,
	devURL: 'http://localhost',
	paths: {
		html: './src/*.html',
		js: './src/**/*.js',
		sass: './src/scss/**/*.scss',
		dist: './dist',
		mainJS: './src/main.js'
	}
}

// start local dev server
gulp.task('server', function() {
	connect.server({
		root: 		['dist'],
		port: 		config.port,
		base: 		config.devURL,
		livereload: true
	});
});

gulp.task('open', ['server'], function() {
	gulp.src('dist/index.html')
		.pipe(open({
			uri: config.devURL + ':' + config.port + '/'
		}));
});

gulp.task('html', function() {
	gulp.src(config.paths.html)
		.pipe(gulp.dest(config.paths.dist))
		.pipe(connect.reload());
});

gulp.task('sass', function() {
	gulp.src(config.paths.sass)
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest(config.paths.dist + '/css'));
});

gulp.task('js', function() {
	browserify(config.paths.mainJS)
		.transform(babelify, {presets: ['es2015', 'react']})
		.bundle()
		.on('error', console.error.bind(console))
		.pipe(vinyl('bundle.js'))
		.pipe(gulp.dest(config.paths.dist + '/scripts'))
		.pipe(connect.reload());
});

gulp.task('watch', function() {
	gulp.watch(config.paths.html, ['html']);
	gulp.watch(config.paths.html, ['sass']);
	gulp.watch(config.paths.js, ['js']);
});

gulp.task('default', ['html', 'sass', 'js', 'open', 'watch']);
