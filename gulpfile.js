var gulp = require('gulp');
var pug = require('gulp-pug');
var minimist = require('minimist');
var sass = require('gulp-sass');
var connect = require('gulp-connect');
//var proxy = require('http-proxy-middleware');
//var rev = require('gulp-rev');                      // 生成md5签名
//var revReplace = require('gulp-rev-replace');       // 替换成md5签名的文件
var knownOptions = {
    string : 'env',
    default : {
        env: 'localhost',       // 默认是本地环境
        rev: 'false'            // 是否生成md5签名，暂时还用不到
    }
}
var options = minimist(process.argv.slice(2), knownOptions);
var contentPath = './';
var pugPath = contentPath + 'src/demo/pug/',
    sassPath = contentPath + 'src/demo/sass/',
    //jsPath = contentPath + 'src/js/',
    imgPath = contentPath + 'src/demo/images/',  // 图片路径，暂时没用
    destPath = contentPath + 'src/demo/pages/',
    configPath = contentPath + 'env/',
    rootPath = contentPath ;
// pug编译
gulp.task('pug', function() {
    gulp.src([ pugPath + 'index.pug', pugPath + 'pack.pug']).pipe(pug({
        pretty : true
    })).pipe(gulp.dest(destPath));
});
// pug编译
gulp.task('pugUnit', function() {
    gulp.src([pugPath + 'unit/**/*.pug']).pipe(pug({
        pretty : true
    })).pipe(gulp.dest(destPath+'unit/'));
});

// sass编译
gulp.task('sass', function() {
    gulp.src(sassPath + '*.sass').pipe(sass()).pipe(
            gulp.dest(destPath));
});

// 监控--只在开发环境进行
gulp.task('watch', function() {
    gulp.watch(pugPath + '**/*.pug', ['pug']);
    gulp.watch(sassPath + '**/*.scss', ['sass']);
});

// 启动服务--只在开发环境进行
gulp.task('webserver', function() {
    connect.server({
      port:80,
      root:rootPath,
      livereload: true,
    });
});

gulp.task('default', [ 'pug','pugUnit', 'sass'],function(){
    if(options.env=='localhost') {
        gulp.run('watch');
        gulp.run('webserver');
    }
});

