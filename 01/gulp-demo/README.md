# gulp

#### 安装

* `npm install -g gulp` //安装gulp环境
* `npm install` //安装依赖包

#### 运行

执行命令`gulp`



```javascript
/**
 * create by Terry on 16/7/24
 */
var gulp = require('gulp');
var uglify = require('gulp-uglify'); //压缩代码
var util = require('gulp-util'); //工具
var watchPath = require('gulp-watch-path'); //文件变化所在的位置
var combiner = require('stream-combiner2'); //捕获流处理过程中的错误
var sourcemaps = require('gulp-sourcemaps'); //使用sourcemap帮助开发调式,定位错误
var less = require('gulp-less'); //编译less
var minifycss = require('gulp-minify-css'); //压缩css

// 错误输出错误信息
var handleErr = function(err){
    var colors = util.colors;
    console.log('\n');
    util.log(colors.red('Error!'));
    util.log('fileName: ' + colors.red(err.fileName))
    util.log('lineNumber: ' + colors.red(err.lineNumber))
    util.log('message: ' + err.message)
    util.log('plugin: ' + colors.yellow(err.plugin))
};

// 压缩js
gulp.task('uglify',function(){
    var combined = combiner.obj([
        gulp.src('src/scripts/**/*.js'), //需要压缩的js文件路径
        sourcemaps.init(),
        uglify(), //压缩js
        sourcemaps.write('./'),
        gulp.dest('dest/scripts') //生成的js文件的目录
    ]);
    
    // gulp.src('src/scripts/**/*.js')
    //     .pipe(uglify())
    //     .pipe(gulp.dest('dest/scripts'));
});

// 监听js文件变化,进行压缩和生成对应的sourcemap
gulp.task('watchjs',function(){
    gulp.watch('src/scripts/**/*.js', function(event){
        var paths = watchPath(event, 'src/', 'dest/'); //watchPath(回调函数的 event, 需要被替换的起始字符串, 第三个参数是新的的字符串, 扩展名(非必填))
        util.log(util.colors.green(event.type)+'  '+paths.srcPath); //输出改变的文件原路径
        util.log('Dist:' + paths.distPath); //处理后的文件路径

        var combined = combiner.obj([
            gulp.src(paths.srcPath),
            sourcemaps.init(),
            uglify(),
            sourcemaps.write('./'),
            gulp.dest(paths.distDir)
        ]);
        combined.on('error', handleErr);
    });
});
// 监听less文件的变化
gulp.task('watchless', function(){
    gulp.watch('src/styles/**/*.less', function(event){
        var paths = watchPath(event, 'src/', 'dest/');
        util.log(util.colors.green(event.type)+'  '+paths.srcPath); //输出改变的文件原路径
        util.log('Dist:' + paths.distPath); //处理后的文件路径

        var combined = combiner.obj([
            gulp.src(paths.srcPath),
            sourcemaps.init(),
            less(),//编译less
            minifycss(),//压缩css
            sourcemaps.write('./'),
            gulp.dest(paths.distDir)
        ]);
        combined.on('error', handleErr);
    });
});
// less生成对应的css文件
gulp.task('lesscss', function(){
    var combined = combiner.obj([
        gulp.src('src/styles/**/*.less'),
            sourcemaps.init(),
            less(),
            minifycss(),
            sourcemaps.write('./'),
            gulp.dest('dest/styles')
    ]);
    combined.on('error',handleErr);
});
gulp.task('default',['uglify','lesscss','watchjs','watchless']);
```

