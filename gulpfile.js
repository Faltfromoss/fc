// generated on 2018-07-11 using generator-webstart 1.0.0
const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const browserSync = require('browser-sync').create();
const del = require('del');
const wiredep = require('wiredep').stream;
const runSequence = require('run-sequence');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const $ = gulpLoadPlugins();
const reload = browserSync.reload;

let dev = true;

gulp.task('styles', () => {
    return gulp.src('app/styles/*.sass')
        .pipe($.plumber())
        // .pipe($.if(dev, $.sourcemaps.init()))
        .pipe($.sass.sync({
            outputStyle: 'expanded',
            precision: 10,
            includePaths: ['.']
        }).on('error', $.sass.logError))
        .pipe($.postcss([
            autoprefixer({browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']})
        ]))
        .pipe($.if(dev, $.sourcemaps.write()))
        .pipe(gulp.dest('.tmp/styles'))
        .pipe(reload({stream: true}));
});

gulp.task('views', () => {
    return gulp.src('app/*.pug')
        .pipe($.plumber())
        .pipe($.pug({pretty: true}))
        .pipe(gulp.dest('.tmp'))
        .pipe(reload({stream: true}));
});

function lint(files) {
    return gulp.src(files)
        .pipe($.eslint({fix: true}))
        .pipe(reload({stream: true, once: true}))
        .pipe($.eslint.format())
        .pipe($.if(!browserSync.active, $.eslint.failAfterError()));
}

gulp.task('lint', () => {
    return lint('app/scripts/**/*.js')
        .pipe(gulp.dest('app/scripts'));
});


gulp.task('html', ['views', 'styles'], () => {
    return gulp.src(['app/*.html', '.tmp/*.html'])
        .pipe($.useref({searchPath: ['.tmp', 'app', '.']}))
        .pipe($.if(/\.js$/, $.uglify({compress: {drop_console: true}})))
        .pipe($.if(/\.css$/, $.postcss([cssnano({safe: true, autoprefixer: false})])))
        .pipe($.if(/\.html$/, $.htmlmin({
            collapseWhitespace: true,
            minifyCSS: true,
            minifyJS: {compress: {drop_console: true}},
            processConditionalComments: true,
            removeComments: true,
            removeEmptyAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true
        })))
        .pipe(gulp.dest('dist'));
});

gulp.task('images', () => {
    return gulp.src('app/images/**/*')
        .pipe($.cache($.imagemin()))
        .pipe(gulp.dest('dist/images'));
});

gulp.task('fonts', () => {
    return gulp.src(require('main-bower-files')('**/*.{eot,svg,ttf,woff,woff2}', () => {
    })
        .concat('app/fonts/**/*'))
        .pipe($.if(dev, gulp.dest('.tmp/fonts'), gulp.dest('dist/fonts')));
});

gulp.task('extras', () => {
    return gulp.src([
        'app/*.*',
        '!app/*.html',
        '!app/*.pug'
    ], {
        dot: true
    }).pipe(gulp.dest('dist'));
});

gulp.task('clean', del.bind(null, ['.tmp', 'dist']));

gulp.task('serve', () => {
    runSequence(['clean', 'wiredep'], ['views', 'styles', 'fonts'], () => {
        browserSync.init({
            notify: false,
            port: 9000,
            server: {
                baseDir: ['.tmp', 'app'],
                routes: {
                    '/bower_components': 'bower_components'
                }
            }
        });

        gulp.watch([
            'app/*.html',
            'app/scripts/**/*.js',
            'app/images/**/*',
            '.tmp/fonts/**/*'
        ]).on('change', reload);

        gulp.watch('app/styles/**/*.sass', ['styles']);
        gulp.watch('app/**/*.pug', ['views']);
        gulp.watch('app/fonts/**/*', ['fonts']);
        gulp.watch('bower.json', ['wiredep', 'fonts']);
    });
});

gulp.task('serve:dist', ['default'], () => {
    browserSync.init({
        notify: false,
        port: 9000,
        server: {
            baseDir: ['dist']
        }
    });
});


// inject bower components
gulp.task('wiredep', () => {
    gulp.src('app/styles/*.sass')
        .pipe($.filter(file => file.stat && file.stat.size))
        .pipe(wiredep({
            ignorePath: /^(\.\.\/)+/
        }))
        .pipe(gulp.dest('app/styles'));

    gulp.src('app/layouts/*.pug')
        .pipe(wiredep({
            ignorePath: /^(\.\.\/)*\.\./,
            fileTypes: {
                pug: {
                    block: /(([ \t]*)\/\/-?\s*bower:*(\S*))(\n|\r|.)*?(\/\/-?\s*endbower)/gi,
                    detect: {
                        js: /script\(.*src=['"]([^'"]+)/gi,
                        css: /link\(.*href=['"]([^'"]+)/gi
                    },
                    replace: {
                        js: 'script(src=\'{{filePath}}\')',
                        css: 'link(rel=\'stylesheet\', href=\'{{filePath}}\')'
                    }
                }
            }
        }))
        .pipe(gulp.dest('app/layouts'));
});

gulp.task('build', ['lint', 'html', 'images', 'fonts', 'extras'], () => {
    return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('default', () => {
    return new Promise(resolve => {
        dev = false;
        runSequence(['clean', 'wiredep'], 'build', resolve);
    });
});
