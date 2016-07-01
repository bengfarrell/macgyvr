var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
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

gulp.task('default', ['vrscene']);