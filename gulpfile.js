var gulp = require("gulp"),
  rename = require("gulp-rename"),
  sass = require("gulp-sass"),
  autoprefixer = require("gulp-autoprefixer"),
  sourcemaps = require("gulp-sourcemaps"),
  browserSync = require("browser-sync").create();

function css_build(done) {
  gulp
    .src("./app/scss/**/*.scss")
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        errorLogToConsole: true,
        outputStyle: "compressed"
      })
    )
    .on("error", console.error.bind(console))
    .pipe(
      autoprefixer({
        cascade: false
      })
    )
    .pipe(rename({ suffix: ".min" }))
    .pipe(sourcemaps.write("./app/"))
    .pipe(gulp.dest("./app/css/"))
    .pipe(browserSync.stream());

  done();
}

function watchSass() {
  gulp.watch("./app/scss/**/*", css_build);
}

function watchFiles() {
  gulp.watch("./app/scss/**/*", css_build);
  gulp.watch("./app/**/*.html", browserReload);
  gulp.watch("./app/**/*.js", browserReload);
  gulp.watch("./app/**/*.php", browserReload);
}

function webserver(done) {
  browserSync.init({
    server: {
      baseDir: "./app"
    },
    port: 3000
  });
  done();
}

function browserReload(done) {
  browserSync.reload();
  done();
}

gulp.task("default", gulp.parallel(watchFiles, webserver));
