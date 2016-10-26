var gulp = require('gulp'),
  less = require('gulp-less'),
  autoprefixer = require('gulp-autoprefixer'),
  minifycss = require('gulp-minify-css'),
  // concat = require('gulp-concat'),
  // cache = require('gulp-cache'),
  uglify = require('gulp-uglify'),
  // clean = require('gulp-clean'),
  // del = require('del'),
  browserSync = require('browser-sync'),
  reload  = browserSync.reload;

var rootDir = './';
var srcDir = './static/';
var distDir = './dist/';

gulp.task('styles', function () {
  return gulp.src(srcDir + '*.less')
    .pipe(less())
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(minifycss({
      keepBreaks: false
    }))
    .pipe(gulp.dest(distDir))
    .pipe(reload({stream: true}))
});

gulp.task('minJs', function () {
  return gulp.src(srcDir + '*.js')
    .pipe(gulp.dest(distDir))
    .pipe(uglify())
    .pipe(gulp.dest(distDir))
    .pipe(reload({stream: true}))
});

// gulp.task('clean', function () {
//   gulp.src(srcDir, { read:false })
//     .pipe(clean());
// });


gulp.task('server', ['styles', 'minJs', 'watch'], function() {
  browserSync({
    files: "./index.html",
    server: {
      baseDir: "./",
      index: "./index.html"
    }
  });
});

gulp.task('mobile', ['styles', 'minJs', 'watch'], function () {
  browserSync({
    files: "./mobile.html",
    server: {
      baseDir: "./",
      index: "./mobile.html"
    }
  });
});


gulp.task('watch', ['styles'], function () {
  gulp.watch(srcDir + '*.less', function () {
    gulp.run('styles');
  });
  gulp.watch(srcDir + '*.js', function () {
    gulp.run('minJs');
  });
});






