const del = require('del');

module.exports = function () {
    $.gulp.task('images', function () {
        return $.gulp.src('app/img/**/*')
            .pipe($.gp.cache($.gp.imagemin()))
            .pipe($.gulp.dest('dist/img'));
    });
    $.gulp.task('fonts', function () {
        return $.gulp.src('app/fonts/**/*')
            .pipe($.gulp.dest('dist/fonts'));
    });
    $.gulp.task('extras', function () {
        return $.gulp.src([
            'app/*.*',
            '!app/*.pug'
        ], {
            dot: true
        }).pipe($.gulp.dest('dist'));
    });
    $.gulp.task('clean', del.bind(null, ['dist']));
};