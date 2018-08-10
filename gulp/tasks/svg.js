module.exports = function () {
    $.gulp.task('svg', function () {
        return $.gulp.src('./app/img/svg/*.svg')
            .pipe($.gp.svgmin({
                js2svg: {
                    pretty: true
                },
                plugins: [{
                    removeAttrs: {
                        attrs: ['fill', 'stroke', 'style']
                    }
                }]
            }))
            // .pipe($.gp.replace('&gt;', '>'))
            .pipe($.gp.svgSprite({
                mode: {
                    symbol: {
                        sprite: 'sprite.svg'
                    }
                }
            }))
            .pipe($.gulp.dest('./app/img'));
    })
};