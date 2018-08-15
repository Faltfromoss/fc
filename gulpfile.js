global.$ = {
    path: {
        task: require('./gulp/paths/tasks.js')
    },
    gulp: require('gulp'),
    del: require('del'),
    fs: require('fs'),
    browserSync: require('browser-sync').create(),
    gp: require('gulp-load-plugins')(),
    autoprefixer: require('autoprefixer'),
    dev: true,
    assetsPath: {
        src: {
            style: './app/assets/sass/',
            js: './app/assets/js/',
            pug: './app/assets/pug/pages/',
            svg: './app/static/svg/'
        },
        build: {
            style: './build/css/',
            js: './build/js/',
            pug: './build/',
            svg: './build/static/svg',
        }
    }
};

$.path.task.forEach(function(taskPath) {
    require(taskPath)();
});

$.gulp.task('dev', $.gulp.series(
    'clean',
    $.gulp.parallel('styles', 'pug', 'scripts', 'svg')));

$.gulp.task('build',  $.gulp.series(
    'cleanBuild',
    $.gulp.parallel('styles', 'pug', 'scripts', 'svg', 'img', 'fonts')));


$.gulp.task('default', $.gulp.series(
    'dev',
    $.gulp.parallel(
        'watch',
        'serve'
    )
));