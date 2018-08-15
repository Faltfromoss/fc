module.exports = function() {
    $.gulp.task('cleanBuild', function() {
        $.dev = false;
        return $.del([
            './build'
        ]);
    });
};