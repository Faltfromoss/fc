module.exports = function() {
    $.gulp.task('pug', ()=>  {
        return $.gulp.src($.assetsPath.src.pug + '*.pug')
            .pipe($.gp.pug({
                locals : {
                    nav: JSON.parse($.fs.readFileSync('./app/data/navigation.json', 'utf8')),
                    content: JSON.parse($.fs.readFileSync('./app/data/content.json', 'utf8')),
                    dev: $.dev
                },
                pretty: true
            }))
            .on('error', $.gp.notify.onError(function(error) {
                return {
                    title: 'Pug',
                    message: error.message
                };
            }))
            .pipe($.gulp.dest($.assetsPath.build.pug))
            .on('end', $.browserSync.reload);
    });
};
