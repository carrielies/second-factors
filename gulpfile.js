'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var replace = require('gulp-replace');

gulp.task('default', function () {
    gulp.src('./node_modules/govuk_frontend_toolkit/images/**/*')
    // Perform minification tasks, etc here
        .pipe(gulp.dest('./public/images'));

    gulp.src('./node_modules/govuk_frontend_toolkit/javascripts/**/*')
    // Perform minification tasks, etc here
        .pipe(gulp.dest('./public/javascripts'));


    // return gulp.src('./assets/stylesheets/govuk.scss')
    //     .pipe(sass.sync().on('error', sass.logError))
    //     .pipe(replace('url("/public/images', 'url("/govgw/assets/images'))
    //     .pipe(gulp.dest('./public/stylesheets'));
});
