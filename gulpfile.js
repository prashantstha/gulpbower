// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var watch = require('gulp-watch');

function swallowError (error) {
  // If you want details of the error in the console
  console.log(error.toString())
  this.emit('end')
}

// Lint Task
gulp.task('lint', function() {
    return gulp.src('js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src(['src/sass/*.scss'])
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('src/css'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('src/js/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('dist'))
    .pipe(rename('all.min.js'))
    .pipe(uglify()).on('error', swallowError)
    .pipe(gulp.dest('dist'));
});



// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch(['src/sass/*.scss','src/sass/{base,component,layout,theme}/*.scss'], ['sass'], ['src/js/*.js'], ['scripts']);
    gulp.watch(['src/js/*.js'], ['scripts']);
});

// Default Task

gulp.task('default', ['lint', 'sass', 'scripts', 'watch']);
