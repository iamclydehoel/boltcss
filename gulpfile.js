var gulp         = require('gulp');
var browserSync  = require('browser-sync');
var plumber      = require('gulp-plumber');
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cssnano      = require('gulp-cssnano');
var rename       = require('gulp-rename');
var sourcemaps   = require('gulp-sourcemaps');

gulp.task('sync', function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
});

gulp.task('reload', function(){
  browserSync.reload();
});

gulp.task('styles', function(){
  gulp.src('css/src/bolt.scss')
  .pipe(plumber())
  .pipe(sourcemaps.init())
  .pipe(sass())
  .pipe(autoprefixer())
  .pipe(cssnano())
  .pipe(rename('bolt.min.css'))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('css/dist'))
  .pipe(browserSync.stream());
});

gulp.task('watch', function(){
  gulp.watch('**/*.html', ['reload']);
  gulp.watch('css/src/**/*.scss', ['styles']);
});

gulp.task('default', ['sync', 'styles', 'watch']);
