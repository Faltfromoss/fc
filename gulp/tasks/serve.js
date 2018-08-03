module.exports = function(){
    $.gulp.task('serve', $.gulp.series('clean', $.gulp.parallel('views', 'styles', 'scripts', 'fonts')), function () {
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

        $.gulp.watch('app/sass/**/*.sass', ['styles']);
        $.gulp.watch('app/js/**/*.js', ['scripts']);
        $.gulp.watch('app/**/*.pug', ['views']);
        $.gulp.watch('app/fonts/**/*', ['fonts']);
    })
};

