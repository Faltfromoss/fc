module.exports = function () {
    $.gulp.task('build', $.gulp.series($.gulp.parallel('html', 'images', 'fonts', 'extras'), function () {
        return $.gulp.src('dist/**/*').pipe($.gp.size({title: 'build', gzip: true}));
    }))
};