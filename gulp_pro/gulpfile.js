var projectPath = "C:\\Users\\86187\\Desktop\\work\\WeChatGameList\\LittleGame\\ShootBulb\\build\\wechatgame";

var gulp = require('gulp');
var tinypng_nokey = require('gulp-tinypng-nokey');

gulp.task('default', function (cb) {
    gulp.src([projectPath + "/res/raw-assets/**/*.{png,jpg,jpeg}"])
        .pipe(tinypng_nokey())
        .pipe(gulp.dest(projectPath + "/res/dest/"))
        .on("end", cb);
});

var javascriptObfuscator = require("gulp-javascript-obfuscator")

gulp.task("js", function (cb) {
    gulp.src([projectPath + "/src/project.js"])
        .pipe(javascriptObfuscator({
            // compact: true,//类型：boolean默认：true
            mangle: true,//短标识符的名称，如a，b，c
            stringArray: true,
            target: "browser",
        }))
        .pipe(gulp.dest(projectPath + "/js-dst")
        .on("end", cb));
});
