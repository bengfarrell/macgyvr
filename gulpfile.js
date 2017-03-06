var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var buffer = require('vinyl-buffer');
var ghPages = require('gulp-gh-pages');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var runSequence = require('run-sequence');

gulp.task('vrscene', function () {
    return browserify({
        entries: 'src/vrscene.js',
        standalone: 'MacgyVRScene',
        extensions: ['es2015'], debug: true})
        .transform(babelify)
        .bundle()
        .pipe(source('vrscene.js'))
        .pipe(gulp.dest('./'));
});

gulp.task('vrscene-debug', function () {
    return browserify({
        entries: 'src/vrscene-debug.js',
        standalone: 'MacgyVRScene',
        extensions: ['es2015'], debug: true})
        .transform(babelify)
        .bundle()
        .pipe(source('vrscene-debug.js'))
        .pipe(gulp.dest('./'));
});

gulp.task('playground', function() {
    return browserify({
        entries: './playground/vrplayground.js',
        standalone: 'VRPlayground',
        cache: {},
        packageCache: {},
        extensions: ['es2015'], debug: true})
        .transform(babelify)
        .bundle()
        .pipe(source('vrplayground-build.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./playground'));
});

gulp.task('libs', function() {
    return gulp.src([
        'vrscene.js',
        './src/import.js',
        './node_modules/webvr-polyfill/build/webvr-polyfill.js',
        './node_modules/three/build/three.min.js',
        './node_modules/three/examples/js/effects/VREffect.js',
        './node_modules/three/examples/js/controls/VRControls.js',
        './node_modules/webvr-boilerplate/build/webvr-manager.js',
        './src/webvrmanager-fix.js'])
        .pipe(concat('macgyvr.js'))
        .pipe(gulp.dest('./'));
});

gulp.task('libs-debug', function() {
    return gulp.src([
        'vrscene-debug.js',
        './src/import.js',
        './node_modules/webvr-polyfill/build/webvr-polyfill.js',
        './node_modules/three/build/three.js',
        './node_modules/three/examples/js/effects/VREffect.js',
        './node_modules/three/examples/js/controls/VRControls.js',
        './node_modules/webvr-boilerplate/build/webvr-manager.js',
        './src/webvrmanager-fix.js'
        ])
        .pipe(concat('macgyvr-debug.js'))
        .pipe(gulp.dest('./'));
});

gulp.task('extras', function() {
    return gulp.src([
        './node_modules/createjs-tweenjs/lib/tweenjs-0.6.0.min.js',
        ])
        .pipe(concat('macgyvr-extras.js'))
        .pipe(gulp.dest('./'));
});

gulp.task('default', function() {
    runSequence( ['vrscene', 'vrscene-debug'], 'libs', 'libs-debug', 'extras');
});
