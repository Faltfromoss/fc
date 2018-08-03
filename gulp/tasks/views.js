module.exports = function () {
    $.gulp.task('views', function () {
        return $.gulp.src('app/*.pug')
            .pipe($.gp.plumber())
            .pipe($.gp.pug({
                pretty: true,
                locals: {
                    dev: dev
                }
            }))
            .pipe($.gulp.dest('dist'))
            .pipe($.bs.reload({stream: true}));
    })
};