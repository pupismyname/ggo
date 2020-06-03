var gulp = require('gulp');
var less = require('gulp-less');
var del = require('del');

var lessPath = 'src/less/**'
var lessSrc = 'src/less/ggo.less';
var lessDest = 'src/less-build';

gulp.task('build', buildLess);

gulp.task('watch', function () {
  gulp.watch(lessPath, buildLess);
});

gulp.task('clean', function () {
  return del([
    '_site',
    'src/less-build',
  ]);
});

function buildLess (done) {
  gulp.src(lessSrc)
    .pipe(less())
    .pipe(gulp.dest(lessDest))
  return done();
}

