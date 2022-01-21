var gulp = require('gulp');
var browserSync = require('browser-sync');
var ghPages = require('gulp-gh-pages');

gulp.task('deploy', function() {
    gulp.src('./app/**/*')
        .pipe(gulp.dest('.tmp'));
    gulp.src('./bowercomponents/**/*')
        .pipe(gulp.dest('.tmp/bowercomponents'));
    
    return gulp.src('.tmp/**/*')
        .pipe(ghPages());
});

gulp.task('default',function(){
    browserSync.init({
    notify: false,
    port: 8080,
    server: {
      baseDir: ['app'],
      routes: {
        '/bowercomponents': 'bowercomponents'
      }
    }
  });
})