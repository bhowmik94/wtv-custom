var gulp = require('gulp');
// var uglify = require('gulp-uglify');
const minify = require('gulp-minify');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var runSequence = require('run-sequence').use(gulp);


function buildJs() {
    return gulp.src([
        'public/js/**/*.js',
        '!public/js/dist/**/*.js'
    ])
        .pipe(sourcemaps.init())
        .pipe(concat('app.js'))
        // .pipe(uglify())
        .pipe(minify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('public/js/dist'));
}

gulp.task('scripts', function() {
    return buildJs()
    // Minify the file
    //     .pipe(uglify())
        // Output
});

gulp.task('watch', function () {
    gulp.watch([
        'public/js/**/*.js',
        '!public/js/dist/**/*.js'
    ] , function () {
        return buildJs()
    });
});