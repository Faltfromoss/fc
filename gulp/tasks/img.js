module.exports = function() {

    $.gulp.task('img', () => {
        return $.gulp.src('./app/static/img/**/*.{png,jpg,gif}')
            .pipe($.gp.tinypng(YOUR_API_KEY))
            .pipe($.gulp.dest('./build/static/img/'));
    });
};
