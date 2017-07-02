var gulp            = require('gulp');
var browserSync     = require('browser-sync');
var connect         = require('gulp-connect-php');
var plumber         = require('gulp-plumber');
var sass            = require('gulp-sass');
var autoprefixer    = require('gulp-autoprefixer');
var cssnano         = require('gulp-cssnano');
var rename          = require('gulp-rename');
var order           = require('gulp-order');
var concat          = require('gulp-concat');
var uglify          = require('gulp-uglify');
var sourcemaps      = require('gulp-sourcemaps');

gulp.task('sync', function() {
  connect.server({}, function (){
    browserSync({
      port: 8080,
      ui: false,
      notify: false,
      proxy: 'localhost:8000'
    });
  });
});

gulp.task('reload', function(){
  browserSync.reload();
});

gulp.task('styles', function(){
  gulp.src('assets/css/src/bolt.scss')
  .pipe(plumber())
  .pipe(sourcemaps.init())
  .pipe(sass())
  .pipe(autoprefixer())
  .pipe(cssnano())
  .pipe(rename('bolt.min.css'))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('assets/css/dist'))
  .pipe(browserSync.stream());
});

gulp.task('scripts', function() {
  gulp.src(['assets/js/src/**/*.js'])
  .pipe(plumber())
  .pipe(sourcemaps.init())
  .pipe(order([
    'assets/js/src/plugins/**/*.js',
    'assets/js/src/bolt.js'
  ], { base: './' }))
  .pipe(concat('bolt.min.js'))
  .pipe(uglify())
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('assets/js/dist/'))
  .pipe(browserSync.stream());
});

gulp.task('watch', function(){
  gulp.watch('**/*.{php,html}', ['reload']);
  gulp.watch('assets/js/src/**/*.js', ['scripts']);
  gulp.watch('assets/css/src/**/*.scss', ['styles']);
})

gulp.task('default', ['sync', 'styles', 'scripts', 'watch'])
