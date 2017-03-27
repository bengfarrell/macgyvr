var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var buffer = require('vinyl-buffer');
var ghPages = require('gulp-gh-pages');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');


gulp.task('daydream', function() {
    return gulp.src([
        './thirdpartylibs/daydream-controller.js/files/MadgwickAHRS.js',
        './thirdpartylibs/daydream-controller.js/DaydreamController.js',
        ])
        .pipe(concat('macgyvr-daydream.js'))
        .pipe(gulp.dest('./'));
});
