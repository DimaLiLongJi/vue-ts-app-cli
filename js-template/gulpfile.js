// 插件
const gulp = require('gulp');
const clean = require('gulp-clean');
const zip = require('gulp-zip');
const dateFormat = require('dateformat');
const now = new Date();
const runSequence = require('run-sequence');
const copy = require('gulp-copy');
const imagemin = require('gulp-imagemin'); // 压缩图片
const pngquant = require('imagemin-pngquant'); // 压缩 png
const mozjpeg = require('imagemin-mozjpeg'); // 压缩 jpg
const cache = require('gulp-cache'); // 缓存
const minimist = require('minimist'); // 获取命令参数
const argv = minimist(process.argv.slice(2), {
  default: {
    env: 'production'
  }
});
const env = {
  test: 'hljmobile_test',
  gray: 'hljmobile_gray',
  production: 'hljmobile'
};

// 输出目录名字
const outDirName = env[argv.env];

gulp.task('copy', function () {
  return gulp.src(['dist/**/*', '!dist/img/**/*'])
    .pipe(copy('build/' + outDirName, {
      prefix: 1
    }));
});

// 删除之前build
gulp.task('clean', function () {
  return gulp.src('build', {
    read: false
  })
    .pipe(clean());
});

// 压缩图片
gulp.task('imagemin', function () {
  return gulp.src('dist/img/**/*.{jpg,png,gif,svg}', {
    base: 'dist'
  })
    // 压缩图片
    .pipe(cache(
      imagemin([
        pngquant({
          quality: '60'
        }),
        mozjpeg({
          quality: 60
        })
      ])
    ))
    .pipe(gulp.dest('build/' + outDirName));
});

// 压缩
gulp.task('zip', function () {
  return gulp.src('build/' + outDirName + '/**/*', {
    base: 'build'
  })
    .pipe(zip(dateFormat(now, 'yyyymmddHHMM') + outDirName + '.zip'))
    .pipe(gulp.dest('build'));
});

// 上传
gulp.task('up', function () {
  return gulp.src('build/*' + outDirName + '.zip', {
    base: 'build'
  });
});

// 默认任务
gulp.task('default', ['clean'], function () {
  runSequence(['copy', 'imagemin'], 'zip', 'up');
});
