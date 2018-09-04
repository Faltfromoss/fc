module.exports = function() {
    $.gulp.task('svg', () => {
        return $.gulp.src($.assetsPath.src.svg + '**/*.svg')
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
            .pipe($.gp.replace('&gt;', '>'))
            .pipe($.gp.svgSprite({
                shape: {
                  id: {
                      separator: ''
                  }
                },
                mode: {
                    symbol: {
                        sprite: "sprite.svg"
                    }
                }
            }))
            .pipe($.gulp.dest($.assetsPath.build.svg));
    });
};

// module.exports = function() {
//     $.gulp.task('svg', () => {
//         return $.gulp.src($.assetsPath.src.svg + 'menu.svg')
//             .pipe($.gp.svgmin({
//                 js2svg: {
//                     pretty: true
//                 },
//                 plugins: [{
//                     removeAttrs: {
//                         attrs: ['fill', 'stroke', 'style']
//                     }
//                 }]
//             }))
//             .pipe($.gp.replace('&gt;', '>'))
//             .pipe($.gulp.dest($.assetsPath.build.svg));
//     });
// };
