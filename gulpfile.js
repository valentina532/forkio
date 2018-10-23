'use strict'

var gulp = require('gulp')
var minify = require('gulp-uglify')
var sass = require('gulp-sass')
var browserSync = require('browser-sync').create()
var clean = require('gulp-clean')
//var concat = require('gulp-concat')
var imagemin = require('gulp-imagemin')
var autoprefixer = require('gulp-autoprefixer')


gulp.task('clean', function () {
    return gulp.src('./dist/css/', {
            read: false
        })
        .pipe(clean())
})

gulp.task('minify', function () {
    return gulp.src('./src/js/**/*.js')
        .pipe(minify())
        .pipe(gulp.dest('./dist/js'))
})

gulp.task('sass', function () {
    return gulp.src('./src/scss/*.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./dist/css'))
})

gulp.task('imagemin', function () {
    return gulp.src('./src/img/*')
        .pipe(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{
                removeViewBox: false
            }]
        }))
        .pipe(gulp.dest('./dist/img'))
})



// gulp.task('autoprefixer', () =>
//     gulp.dest('./dist/css')
//     .pipe(autoprefixer({
//         browsers: ['last 2 versions'],
//         cascade: false
//     }))
//     .pipe(gulp.dest('./dist/css'))
// );


gulp.task('serve', function () {
    browserSync.init({
        server: "./"
    })
    gulp.src('./src/fonts/*').pipe(gulp.dest('./dist/fonts'));
    gulp.watch('./src/scss/*.scss', ['sass']).on('change', browserSync.reload);
    gulp.watch('./index.html').on('change', browserSync.reload)
})

gulp.task('default', ['serve'], function(){
  console.log('=== ALL DONE ===')
});
