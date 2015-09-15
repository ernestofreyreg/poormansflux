'use strict';

var
  Gulp,
  del,
  rename,
  uglify,
  paths;

Gulp = require('gulp');
del = require('del');
rename = require('gulp-rename');
uglify = require('gulp-uglify');

paths = {
  jsFiles: ['./src/poormansflux.js'],

  destinations: {
    js: 'dist'
  }
};

Gulp.task('default', ['build']);

Gulp.task('build', [
  'build:js',
  'build:js-min'
]);

Gulp.task('build:js', function() {
  return Gulp.src(paths.jsFiles)
    .pipe(Gulp.dest(paths.destinations.js));
});

Gulp.task('build:js-min', function() {
  return Gulp.src(paths.jsFiles)
    .pipe(uglify())
    .pipe(rename({extname: '.min.js'}))
    .pipe(Gulp.dest(paths.destinations.js));
});

Gulp.task('clean', function() {
  del([
    'dist/*'
  ]);
});

Gulp.task('compress:js', function() {
  return Gulp.src(paths.destinations.js + '/*.js')
    .pipe(uglify())
    .pipe(Gulp.dest(paths.destinations.js));
});
