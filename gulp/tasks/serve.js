module.exports = function () {
    $.gulp.task('serve', $.gulp.series('clean', $.gulp.parallel('views', 'styles', 'scripts', 'fonts'), function () {
        $.bs.init({
            notify: false,
            port: 9000,
            server: {
                baseDir: ['dist'],
                routes: {
                    "/img": "app/img"
                }
            }
        });
        $.gulp.watch([
            'app/*.html',
            'app/images/**/*'
        ]).on('change', $.bs.reload);

        $.gulp.watch('app/sass/**/*.sass', $.gulp.series('styles'));
        $.gulp.watch('app/js/**/*.js', $.gulp.series('scripts'));
        $.gulp.watch('app/**/*.pug', $.gulp.series('views'));
        $.gulp.watch('app/fonts/**/*', $.gulp.series('fonts'));
    }))
};

