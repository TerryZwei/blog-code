/**
 * create by Terry on 16/7/24.
 */
module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),//读取配置文件
        //合并
        concat: {
            build: {
                files: [{
                    'dest/scripts/app.js': ['dest/scripts/page/a.min.js','dest/scripts/page/b.min.js']
                }]
                
            },  
        },

        //清除
        clean: {
            build: ['dest/**']
        },

        //压缩
        uglify: {
            build: {
                files:[{
                    expand: true, //
                    cwd: 'dest/scripts', //要压缩的目录路径
                    src: '**/*.js', //要压缩的对应的js文件
                    dest: 'dest/scripts',//压缩后目标文件生成位置
                    ext: '.min.js' //生成目标文件的扩展名称
                }]
                
            }
        },
        //拷贝
        copy: {
            dev: {
                files:[{
                    expand: true,
                    cwd: 'src/',
                    src: ['**'],
                    dest: 'dest/'
                }]
            }
        }
    });
    //加载相对应的插件
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    // 默认运行的任务,
    grunt.registerTask('default',['clean','copy','uglify','concat']);
};