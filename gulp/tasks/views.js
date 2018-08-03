export default function views() {
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
}