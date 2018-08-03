'use strict'

global.$ = {
    gulp: import('gulp'),
    gp: import('gulp-load-plugins'),
    bs: import('browser-sync').create()
};

let dev = true;

export default new Promise(resolve => {
    dev = false;
    $.gulp.series(clean(), build, resolve)
    runSequence(['clean'], 'build', resolve);
});