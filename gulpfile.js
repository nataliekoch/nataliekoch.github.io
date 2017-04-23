// Load plugins
var gulp          = require('gulp'),
    autoprefixer  = require('gulp-autoprefixer'),
    livereload    = require('gulp-livereload'),
    minifycss     = require('gulp-minify-css'),
    rename        = require('gulp-rename'),
    sass          = require('gulp-sass'),
    uglify        = require('gulp-uglify'),
    pump          = require('pump'),
    notify        = require('gulp-notify')

// File locations
var paths = {
  scripts: {
    src:  'scripts/*.js',
    dest: 'public/scripts'
  },
  styles: {
    src:  'scss/main.scss',
    dest: 'public/stylesheets'
  }
};

gulp.task('styles', function () {
  return gulp.src(paths.styles.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer('last 3 version'))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(rename({
    	suffix: '.min'
    }))
    .pipe(minifycss())
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(livereload())
    .pipe(notify({
    	message: 'Styles task complete.'
    }));
});

gulp.task('scripts', function () {
  return gulp.src(paths.scripts.src)
    .pipe(rename({
    	suffix: '.min'
    }))
    .pipe(uglify())
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(notify({
    	message: 'Scripts task complete'
    }));
});

gulp.task('default', function () {
  livereload.listen();
  gulp.watch('scss/**/*.scss', ['styles']);
  gulp.watch('scripts/*.js', ['scripts']);
});
