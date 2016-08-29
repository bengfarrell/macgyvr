var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var buffer = require('vinyl-buffer');
var ghPages = require('gulp-gh-pages');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

gulp.task('vrscene', function () {
    return browserify({
        entries: 'src/vrscene.es6',
        standalone: 'CCWCThreeJSVRScene',
        extensions: ['es2015'], debug: true})
        .transform(babelify)
        .bundle()
        .pipe(source('vrscene.js'))
        .pipe(gulp.dest('./'));
});

gulp.task('libs', function() {
    return gulp.src([
        'vrscene.js',
        './node_modules/three/build/three.min.js',
        './node_modules/three/examples/js/effects/VREffect.js',
        './node_modules/three/examples/js/controls/VRControls.js',
        './node_modules/webvr-boilerplate/build/webvr-manager.js',
        './node_modules/webvr-polyfill/build/webvr-polyfill.js'])
        .pipe(concat('ccwc-threejs-vrscene.js'))
        .pipe(gulp.dest('./'));
});

gulp.task('default', ['vrscene', 'libs']);