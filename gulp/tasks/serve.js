import {clean, fonts, images, extras} from './otherTasks'
import views from "./views";
import scripts from "./scripts";
import styles from './styles';
import html from "./html";

export function serve() {
    $.gulp.series(clean(), $.gulp.parallel(views(), styles(), scripts(), fonts()), function () {
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
        $.gulp.watch(['app/**/*.pug', "app/pug/**/*.pug"], ['views']);
        $.gulp.watch('app/fonts/**/*', ['fonts']);
    })
}

let build = $.gulp.series($.gulp.parallel(html, images(), fonts(), extras()), function () {
    return $.gulp.src('dist/**/*').pipe($.gp.size({title: 'build', gzip: true}));
});

export default build;

