'use strict';

global.$ = {
    gulp: import('gulp'),
    gp: import('gulp-load-plugins'),
    bs: import('browser-sync').create()
};
import views from 'gulp/tasks/views'

let dev = true;

export default new Promise(resolve => {
    dev = false;
    $.gulp.series(clean(), build, resolve);
});