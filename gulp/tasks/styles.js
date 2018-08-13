module.exports = function () {
    $.gulp.task('styles', () => {
        return $.gulp.src($.assetsPath.src.style + 'main.sass')
            .pipe($.gp.plumber())
            .pipe($.gp.if($.dev, $.gp.sourcemaps.init()))
            .pipe($.gp.sass.sync({
                outputStyle: 'expanded',
                precision: 10,
                includePaths: ['.']
            }))
            .on('error', $.gp.notify.onError(function (error) {
                return {
                    title: 'Sass',
                    message: error.message
                };
            }))
            .pipe($.gp.postcss([
                $.autoprefixer({browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']})
            ]))
            .pipe($.gp.if($.dev, $.gp.sourcemaps.write('./')))
            .pipe($.gulp.dest($.assetsPath.build.style))
            .pipe($.gp.if($.dev, $.browserSync.reload({
                stream: true
            })))
    });
};
