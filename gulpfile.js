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
var pugPath = contentPath + 'demo/src/pug/',
    sassPath = contentPath + 'demo/src/sass/',
    //sassPath = contentPath + '/demo/sass/',
    sassUnitPath=contentPath + 'src/component/sass/',
    imgPath = contentPath + 'src/demo/images/',  // 图片路径，暂时没用
    destPath = contentPath + 'demo/pages/',
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
    gulp.src([pugPath + '/**/*.pug']).pipe(pug({
        pretty : true
    })).pipe(gulp.dest(destPath));
});

// sass编译--demo
gulp.task('sass', function() {
    gulp.src(sassPath + 'common.sass').pipe(sass()).pipe(
        gulp.dest(destPath+'/common/'));
});

// sass编译--单个组件组件 -contentPath + '/src/component/sass/css/'
gulp.task('sassUnit', function() {
    gulp.src(sassUnitPath+'*.scss').pipe(sass()).pipe(gulp.dest(sassUnitPath+"css/"));
});

// 构建demo的src里面的js文件到pages对应文件夹下
gulp.task('copySrc',  function() {
    return gulp.src('./demo/src/js/**/*')
        .pipe(gulp.dest(destPath))
});

// 构建demo的src里面的images文件到pages对应文件夹下
gulp.task('copySrc',  function() {
    return gulp.src('./demo/src/images/**/*')
        .pipe(gulp.dest(destPath+'/images/'))
});

// 构建dist下面的js文件到pages对应文件夹下
gulp.task('copyDist',  function() {
    return gulp.src('./dist/**')
        .pipe(gulp.dest(destPath+'dist/'))
});

// 监控--只在开发环境进行
gulp.task('watch', function() {
    gulp.watch(pugPath + '**/*.pug', ['pug']);
    gulp.watch(sassPath + '**/*.scss', ['sass']);
    gulp.watch(sassUnitPath  + '/*.sass', ['sass']);
    gulp.watch( './src/js/**/*.js', ['copy']);
});

// 启动服务--只在开发环境进行
gulp.task('webserver', function() {
    connect.server({
      port:80,
      root:rootPath,
      livereload: true,
    });
});

gulp.task('default', [ 'pug','pugUnit', 'sass','sassUnit','copySrc','copyDist'],function(){
    if(options.env=='localhost') {
        gulp.run('watch');
        gulp.run('webserver');
    }
});

