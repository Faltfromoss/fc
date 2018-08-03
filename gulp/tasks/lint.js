function lintJS(files) {
    return $.gulp.src(files)
        .pipe($.gp.eslint({fix: true}))
        .pipe($.bs.reload({stream: true, once: true}))
        .pipe($.gp.eslint.format())
        .pipe($.gp.if(!$.bs.active, $.gp.eslint.failAfterError()));
}

module.exports = function () {
    $.gulp.task('lint', function () {
        return lintJS('app/js/**/*.js')
            .pipe($.gulp.dest('app/js'));
    })
};