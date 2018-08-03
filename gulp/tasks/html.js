import views from 'views';
import styles from 'styles';
import scripts from 'scripts';
import log from 'fancy-log';

let html = $.gulp.series(views(), styles(), scripts(), function () {
    return $.gulp.src(['dist/**/*'])
        .pipe($.gp.if(/\.js$/, $.gp.uglify({compress: {drop_console: true}})))
        .on('error', function (err) { log(colors.red('[Error]'), err.toString()); })
        .pipe($.gp.if(/\.css$/, $.gp.postcss([cssnano({safe: true, autoprefixer: false})])))
        .pipe($.gp.if(/\.html$/, $.gp.htmlmin({
            collapseWhitespace: true,
            minifyCSS: true,
            minifyJS: {compress: {drop_console: true}},
            processConditionalComments: true,
            removeComments: true,
            removeEmptyAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true
        })))
        .pipe($.gulp.dest('dist'));
});

export default html;