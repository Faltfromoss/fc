'use strict';

global.$ = {
    gulp: import('gulp'),
    gp: import('gulp-load-plugins'),
    bs: import('browser-sync').create()
};
var dev = true;
var tasks = require('./gulp/config/tasks');
tasks.forEach(function (taskPath) {
   require(taskPath)(dev);
});

$.gulp.task('default', function () {

});