module.exports = function() {
    var libs = [
        './node_modules/jquery/dist/jquery.js',
        './node_modules/svg4everybody/dist/svg4everybody.min.js',
        './node_modules/@fortawesome/fontawesome-free/js/all.js',
        './node_modules/owl.carousel/dist/owl.carousel.js',
        './node_modules/jquery.mmenu/dist/jquery.mmenu.all.js',
        './node_modules/jquery.mmenu/dist/addons/fixedelements/jquery.mmenu.fixedelements.js'
    ];

    var minify = false,
        uglify = false;

    $.gulp.task('scripts', () => {
        if($.dev) {
            copyJS();
        }
        else{
            libs.push($.assetsPath.src.js + 'main.js');
            minify = true;
            uglify = true;
        }
        return $.gulp.src(libs)
            .pipe($.gp.if($.dev, $.gp.sourcemaps.init()))
            .pipe($.gp.if(minify, $.gp.minify()))
            .pipe($.gp.if($.dev, $.gp.concat('libs.js'), $.gp.concat('main.js')))
            .pipe($.gp.if(uglify, $.gp.uglifyjs()))
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
