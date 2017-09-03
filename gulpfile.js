var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var buffer = require('vinyl-buffer');
var ghPages = require('gulp-gh-pages');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var runSequence = require('run-sequence');

/**
 * include run-time module loading for development
 */
gulp.task('dev', function() {
    return gulp.src([
        './node_modules/browser-es-module-loader/dist/babel-browser-build.js',
        './node_modules/browser-es-module-loader/dist/browser-es-module-loader.js',
        './node_modules/babylonjs/dist/preview release/babylon.js',
    ])
        .pipe(concat('macgyvr-full-dev.js'))
        .pipe(gulp.dest('./'));
});

/**
 * don't include module loading, let consumer use their own build process
 */
gulp.task('dist', function() {
    return gulp.src([
        './node_modules/babylonjs/dist/preview release/babylon.js',
    ])
        .pipe(concat('macgyvr-full.js'))
        .pipe(gulp.dest('./'));
});

gulp.task('default', function() {
    runSequence( ['dev', 'dist']);
});

