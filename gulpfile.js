var gulp = require('gulp');
var less = require('gulp-less');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var rename = require("gulp-rename");
var paths = {
    less: ['./pages/**/*.less']
};
gulp.task('less', function () {
    return gulp.src(paths.less)
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(less())
        .pipe(rename(function (path) {
            path.extname = ".wxss";
        }))
        .pipe(gulp.dest('pages'));
});

gulp.task('watch', function () {
    gulp.watch(paths.less, ['less']);
});