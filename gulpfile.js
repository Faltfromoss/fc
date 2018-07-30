const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const del = require('del');
const plumber = require('gulp-plumber');
const gulpIf = require('gulp-if');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const pug = require('gulp-pug');
const log = require('fancy-log');
const colors = require('ansi-colors');
const useref = require('gulp-useref');
const uglify = require('gulp-uglify');
const postcss = require('gulp-postcss');
const htmlmin = require('gulp-htmlmin');
const cache = require('gulp-cache');
const size = require('gulp-size');
const imagemin = require('gulp-imagemin');
const eslint = require('gulp-eslint');
const runSequence = require('run-sequence');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const concat = require('gulp-concat');
const reload = browserSync.reload;

let dev = true;

gulp.task('styles', () => {
    return gulp.src('app/sass/*.sass')
        .pipe(plumber())
        .pipe(gulpIf(dev, sourcemaps.init()))
        .pipe(sass.sync({
            outputStyle: 'expanded',
            precision: 10,
            includePaths: ['.']
        }).on('error', sass.logError))
        .pipe(postcss([
            autoprefixer({browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']})
        ]))
        .pipe(gulpIf(dev, sourcemaps.write('./')))
        .pipe(gulp.dest('dist/css'))
        .pipe(reload({stream: true}));
});

gulp.task('views', () => {
    return gulp.src('app/*.pug')
        .pipe(plumber())
        .pipe(pug({
            pretty: true,
            locals: {
                dev: dev
            }
        }))
        .pipe(gulp.dest('dist'))
        .pipe(reload({stream: true}));
});

function moveJS() {
    return gulp.src('app/js/*.js')
        .pipe(gulp.dest('dist/js'));
}

gulp.task('scripts', () => {
    let assets = [
        './node_modules/jquery/dist/jquery.js',
        './node_modules/@fortawesome/fontawesome-free/js/all.js',
        './node_modules/owl.carousel/dist/owl.carousel.js'
    ];
    if(!dev)
        assets.push('app/js/main.js');
    else
        moveJS();
    return gulp.src(assets)
        .pipe(gulpIf(dev, sourcemaps.init()))
        .pipe(gulpIf(dev, concat('vendors.js'), concat('main.js')))
        .pipe(gulpIf(dev, sourcemaps.write('./')))
        .pipe(gulp.dest('dist/js'))
        .pipe(reload({stream: true}));
});

function lint(files) {
    return gulp.src(files)
        .pipe(eslint({fix: true}))
        .pipe(reload({stream: true, once: true}))
        .pipe(eslint.format())
        .pipe(gulpIf(!browserSync.active, $.eslint.failAfterError()));
}

gulp.task('lint', () => {
    return lint('app/js/**/*.js')
        .pipe(gulp.dest('app/js'));
});


gulp.task('html', ['views', 'styles', 'scripts'], () => {
    return gulp.src(['dist/**/*'])
        .pipe(gulpIf(/\.js$/, uglify({compress: {drop_console: true}})))
        .on('error', function (err) { log(colors.red('[Error]'), err.toString()); })
        .pipe(gulpIf(/\.css$/, postcss([cssnano({safe: true, autoprefixer: false})])))
        .pipe(gulpIf(/\.html$/, htmlmin({
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
    return gulp.src('app/img/**/*')
        .pipe(cache(imagemin()))
        .pipe(gulp.dest('dist/img'));
});

gulp.task('fonts', () => {
    return gulp.src('app/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'));
});

gulp.task('extras', () => {
    return gulp.src([
        'app/*.*',
        '!app/*.pug'
    ], {
        dot: true
    }).pipe(gulp.dest('dist'));
});

gulp.task('clean', del.bind(null, ['dist']));

gulp.task('serve', () => {
    runSequence('clean', ['views', 'styles', 'scripts', 'fonts'], () => {
        browserSync.init({
            notify: false,
            port: 9000,
            server: {
                baseDir: ['dist'],
                routes: {
                    "/img": "app/img"
                }
            }
        });

        gulp.watch([
            'app/*.html',
            'app/images/**/*'
        ]).on('change', reload);

        gulp.watch('app/sass/**/*.sass', ['styles']);
        gulp.watch('app/js/**/*.js', ['scripts']);
        gulp.watch(['app/**/*.pug', "app/pug/**/*.pug"], ['views']);
        gulp.watch('app/fonts/**/*', ['fonts']);
    });
});

gulp.task('serve:build', ['default'], () => {
    browserSync.init({
        notify: false,
        port: 9000,
        server: {
            baseDir: ['dist']
        }
    });
});

gulp.task('build', ['html', 'images', 'fonts', 'extras'], () => {
    return gulp.src('dist/**/*').pipe(size({title: 'build', gzip: true}));
});

gulp.task('default', () => {
    return new Promise(resolve => {
        dev = false;
        runSequence(['clean'], 'build', resolve);
    });
});
