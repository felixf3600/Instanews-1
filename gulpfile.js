const gulp = require("gulp"); // Load Gulp!
const terser = require("gulp-terser"),
    rename = require("gulp-rename"),
    eslint = require('gulp-eslint'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    prettyerror = require('gulp-prettyerror');
const browserSync = require("browser-sync").create();
gulp.task("scripts", function () {
    return gulp
        .src("./js/*.js") // What files do we want gulp to consume?
        .pipe(terser()) // Call the terser function on these files
        .pipe(rename({ extname: ".min.js" })) // Rename the uglified file
        .pipe(gulp.dest("./build/js")); // Where do we put the result?
});

gulp.task("lint", function () {
    return gulp
        .src("./js/*.js")
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
});

gulp.task('sass', function () {
    return gulp
        .src('./sass/style.scss')
        .pipe(prettyerror())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(cssnano())
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest('./build/css'));
});


gulp.task("watch", function () {
    gulp.watch("./js/*.js", gulp.series("scripts", "reload"));
    gulp.watch("./*.html", gulp.series("reload"));
    gulp.watch("./sass/*.scss", gulp.series("sass", "reload"));
});

gulp.task("browser-sync", function () {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task("reload", function (done) {
    browserSync.reload();
    done();
});
gulp.task("default", gulp.parallel("scripts", "sass", "watch", "browser-sync"));
