function moveJS() {
    return $.gulp.src('app/js/*.js')
        .pipe($.gulp.dest('dist/js'));
}
module.exports = function (dev) {
  $.gulp.task('scripts', function () {
      let assets = [
          './node_modules/jquery/dist/jquery.js',
          './node_modules/@fortawesome/fontawesome-free/js/all.js',
          './node_modules/owl.carousel/dist/owl.carousel.js'
      ];
      if(!dev)
          assets.push('app/js/main.js');
      else
          moveJS();
      return $.gulp.src(assets)
          .pipe($.gp.if(dev, $.gp.sourcemaps.init()))
          .pipe($.gp.if(dev, $.gp.concat('vendors.js'), $.gp.concat('main.js')))
          .pipe($.gp.if(dev, $.gp.sourcemaps.write('./')))
          .pipe($.gulp.dest('dist/js'))
          .pipe($.bs.reload({stream: true}));
  })
};