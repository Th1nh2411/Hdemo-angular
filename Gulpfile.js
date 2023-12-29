const gulp = require("gulp");
const connect = require("gulp-connect");
const open = require("gulp-open");

// Task để khởi động server và mở trình duyệt
gulp.task("connect", function (done) {
  connect.server({
    root: "./app", // Thư mục chứa file index.html của ứng dụng
    livereload: true,
    port: 8888,
  });
  done();
});

// Task để mở trình duyệt
gulp.task("open", function (done) {
  gulp.src("./app").pipe(open({ uri: "http://localhost:8888" }));
  done();
});

// Task để theo dõi thay đổi và tái tải trình duyệt
gulp.task("watch", function () {
  gulp.watch(["app/**/*"], gulp.series("reload"));
});

// Task để tái tải trình duyệt
gulp.task("reload", function (done) {
  gulp.src("app/**/*").pipe(connect.reload());
  done();
});

// Task mặc định để chạy tất cả các task trên
gulp.task("default", gulp.parallel("connect", "open", "watch"));
