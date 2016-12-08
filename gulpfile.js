var gulp = require("gulp");
var sourcemaps = require("gulp-sourcemaps");
var babel = require("gulp-babel");
var concat = require("gulp-concat");
var nodemon = require("gulp-nodemon");
var clean = require('gulp-clean');
var path = require("path");

gulp.task("compile", function () {
  return gulp.src("src/**/*.js")
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist"));
});

gulp.task("clean",function(){
  var stream = gulp.src("dist")
  .pipe(clean());
  return stream;
});

gulp.task("watch",function(){
  watch = gulp.watch("src/**/*.js");
  watch.on("change",function(event){
    file = event.path
    dirname = path.dirname(file);
    dirname = dirname.replace(__dirname,"").replace("/src","dist")
    gulp.src(event.path)
    .pipe(babel())
    .pipe(gulp.dest(dirname));
  });
});

gulp.task("start",function () {
  nodemon({
    script: 'dist/index',
    ext: 'js json',
    "events": {
      "restart": "echo 'display notification \"App restarted due to:\n'$FILENAME'\" with title \"nodemon\"'"
    },
    env: { 'NODE_ENV': 'development' }
    // env: { 'NODE_ENV': 'production' }
  });
});

gulp.task("release",["clean"],function(){
  gulp.start(["compile"])
});

gulp.task("dev",["compile","watch"],function(){
  gulp.start("start");
});
