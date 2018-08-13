module.exports = function() {
    var libs = [
        './node_modules/jquery/dist/jquery.js',
        './node_modules/svg4everybody/dist/svg4everybody.min.js',
        './node_modules/@fortawesome/fontawesome-free/js/all.js',
        './node_modules/owl.carousel/dist/owl.carousel.js',
        './node_modules/jquery.mmenu/dist/jquery.mmenu.all.js'
    ];
    if(!$.dev){
        libs.push($.assetsPath.src.js + 'main.js')
    }
    $.gulp.task('scripts', () => {
        if($.dev)
            copyJS();
        return $.gulp.src(libs)
            .pipe($.gp.if($.dev, $.gp.sourcemaps.init()))
            .pipe($.gp.if($.dev, $.gp.concat('libs.js'), $.gp.concat('main.js')))
            .pipe($.gp.if($.dev, $.gp.uglifyjs()))
            .pipe($.gp.if($.dev, $.gp.sourcemaps.write('./')))
            .pipe($.gulp.dest($.assetsPath.build.js))
            .pipe($.gp.if($.dev, $.browserSync.reload({
                stream: true
            })));
    });
   function copyJS () {
        return $.gulp.src($.assetsPath.src.js + 'main.js')
            .pipe($.gulp.dest($.assetsPath.build.js))
    }
};
