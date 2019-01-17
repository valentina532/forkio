'use strict'

const gulp = require('gulp')
const browserSync = require('browser-sync').create()
const clean = require('gulp-clean')
const sass = require('gulp-sass')
const minify = require('gulp-uglify')
const imagemin = require('gulp-imagemin')
const autoprefixer = require('gulp-autoprefixer')
const concat = require('gulp-concat')
const babel = require('gulp-babel')
const gulpSequence = require('gulp-sequence')

gulp.task('clean', () =>
 	gulp.src('./dist', {
      read: false
    })
    .pipe(clean())
)

gulp.task('minjs', () =>
 gulp.src('./src/js/**/*.js')
 	.pipe(babel({
  	presets: ['@babel/env']
  }))
  .pipe(minify())
  .pipe(concat('script.min.js'))
  .pipe(gulp.dest('./dist/js'))
)

gulp.task('sass', () =>
 gulp.src('./src/scss/*.scss')
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(autoprefixer({
	    browsers: ['last 2 versions'],
	    cascade: false
		}))
		.pipe(concat('style.min.css'))
		.pipe(gulp.dest('./dist/css'))
)

gulp.task('imagemin', () =>
	gulp.src('./src/img/*')
	  .pipe(imagemin({
	    interlaced: true,
	    progressive: true,
	    svgoPlugins: [{
	        removeViewBox: false
	    }]
	  }))
	  .pipe(gulp.dest('./dist/img'))
)

gulp.task('makedist', ['sass', 'minjs', 'imagemin'], () => {
	gulp.src('./src/fonts/*').pipe(gulp.dest('./dist/fonts'))

})

gulp.task('devserver', ['makedist'], () => {
	browserSync.init({
    server: "./"
	})
	gulp.watch('./src/js/**/*.js', ['minjs']).on('change', browserSync.reload)
	gulp.watch('./src/scss/*.scss', ['sass']).on('change', browserSync.reload)
	gulp.watch('./index.html').on('change', browserSync.reload)
})

gulp.task('build', gulpSequence('clean', 'makedist'))
gulp.task('dev', gulpSequence('clean', 'devserver'))
