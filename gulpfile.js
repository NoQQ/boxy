var gulp = require('gulp'),
    less = require('gulp-less'),
    run = require('gulp-run');

gulp.task('build', function() {
    gulp.src(['src/**/*', '!src/**/*.less'])
        .pipe(gulp.dest('build'));
    
    gulp.src(['src/client/assets/css/boxy.less'])
        .pipe(less())
        .pipe(gulp.dest('build/client/assets/css'));
});

gulp.task('watch', function() {
    gulp.watch('src/**/*', ['build'])
});

gulp.task('run', function() {
    run('npm start').exec();
});
