module.exports = function() {
    $.gulp.task('serve', function() {
        $.browserSync.init({
            server: {
                baseDir: './build',
                port: 9000,
                routes:{
                    '/static': 'app/static'
                }
            }
        });
    });
};