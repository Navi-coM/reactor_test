var gulp = require("gulp"),
  rename = require("gulp-rename"),
  sass = require("gulp-sass"),
  autoprefixer = require("gulp-autoprefixer"),
  sourcemaps = require("gulp-sourcemaps"),
  browserSync = require("browser-sync").create();

function css_build(done) {
  gulp
    .src("./scss/**/*.scss")
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
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest("./css/"))
    .pipe(browserSync.stream());

  done();
}

function watchSass() {
  gulp.watch("./scss/**/*", css_build);
}

function watchFiles() {
  gulp.watch("./scss/**/*", css_build);
  gulp.watch("./**/*.html", browserReload);
  gulp.watch("./**/*.js", browserReload);
  gulp.watch("./**/*.php", browserReload);
}

function webserver(done) {
  browserSync.init({
    server: {
      baseDir: "./"
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
