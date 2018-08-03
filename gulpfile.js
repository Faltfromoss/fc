'use strict';

global.$ = {
    gulp: require('gulp'),
    gp: require('gulp-load-plugins')(),
    bs: require('browser-sync').create(),
    autoprefixer: require('autoprefixer')
};

var dev = true;
var tasks = require('./gulp/config/tasks');
tasks.forEach(function (taskPath) {
   require(taskPath)(dev);
});

$.gulp.task('default', () => {
    return new Promise(resolve => {
        dev = false;
        $.gulp.series('clean', 'build', resolve);
    });
});