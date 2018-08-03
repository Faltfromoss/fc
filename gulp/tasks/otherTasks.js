const del = require('del');

export function images (){
    return $.gulp.src('app/img/**/*')
        .pipe($.gp.cache($.gp.imagemin()))
        .pipe($.gulp.dest('dist/img'));
}

export function fonts () {
    return $.gulp.src('app/fonts/**/*')
        .pipe($.gulp.dest('dist/fonts'));
}

export function extras () {
    return $.gulp.src([
        'app/*.*',
        '!app/*.pug'
    ], {
        dot: true
    }).pipe($.gulp.dest('dist'));
}

export function clean (){
    del.bind(null, ['dist']);
}
