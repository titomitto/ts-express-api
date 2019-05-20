var gulp = require('gulp');
var ts = require('gulp-typescript');
var clean = require('gulp-clean');

var project = ts.createProject('tsconfig.json');

gulp.task('compile-ts', function () {
    return gulp.src('./src/**/*.ts')
        .pipe(project())
        .pipe(gulp.dest('src'));
});

gulp.task('watch', function () {
    gulp.watch('./src/**/*.ts', gulp.series('compile-ts'));
});

gulp.task('clean-js', function () {
    return gulp.src('./src/**/*.js', { read: false })
        .pipe(clean());
});


gulp.task('clean', gulp.series('clean-js'));
gulp.task('default', gulp.series('compile-ts'));