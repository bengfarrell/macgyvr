var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var buffer = require('vinyl-buffer');
var ghPages = require('gulp-gh-pages');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var runSequence = require('run-sequence');


gulp.task('daydream', function() {
    return gulp.src([
        './thirdpartylibs/daydream-controller.js/files/MadgwickAHRS.js',
        './thirdpartylibs/daydream-controller.js/DaydreamController.js',
        ])
        .pipe(concat('macgyvr-daydream.js'))
        .pipe(gulp.dest('./'));
});

/**
 * include run-time module loading for development
 */
gulp.task('dev', function() {
    return gulp.src([
        './node_modules/browser-es-module-loader/dist/babel-browser-build.js',
        './node_modules/browser-es-module-loader/dist/browser-es-module-loader.js',
        './node_modules/aframe/dist/aframe-master.js',
        'macgyvr-daydream.js',
    ])
        .pipe(concat('macgyvr-full-dev.js'))
        .pipe(gulp.dest('./'));
});

/**
 * don't include module loading, let consumer use their own build process
 */
gulp.task('dist', function() {
    return gulp.src([
        './node_modules/aframe/dist/aframe-master.js',
        'macgyvr-daydream.js',
    ])
        .pipe(concat('macgyvr-full.js'))
        .pipe(gulp.dest('./'));
});

gulp.task('default', function() {
    runSequence( ['daydream', 'dev', 'dist']);
});

