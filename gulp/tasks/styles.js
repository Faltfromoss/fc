export default function styles() {
    return $.gulp.src('app/sass/*.sass')
        .pipe($.gp.plumber())
        .pipe($.gp.if(dev, $.gp.sourcemaps.init()))
        .pipe($.gp.sass.sync({
            outputStyle: 'expanded',
            precision: 10,
            includePaths: ['.']
        }).on('error', $.gp.sass.logError))
        .pipe($.gp.postcss([
            autoprefixer({browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']})
        ]))
        .pipe($.gp.if(dev, sourcemaps.write('./')))
        .pipe($.gulp.dest('dist/css'))
        .pipe($.bs.reload({stream: true}));
}