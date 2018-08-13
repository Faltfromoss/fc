module.exports = function () {
    $.gulp.task('watch', function () {
        $.gulp.watch('./app/assets/pug/**/*.pug', $.gulp.series('pug'));
        $.gulp.watch('./app/assets/sass/**/*.sass', $.gulp.series('styles'));
        $.gulp.watch('./app/static/svg/*.svg', $.gulp.series('svg'));
        $.gulp.watch('./app/assets/js/**/*.js', $.gulp.series('scripts'));
        $.gulp.watch(['./app/static/img/**/*.{png,jpg,gif}']).on('change', $.browserSync.reload);
    });
};