"use strict";
var fs = require('fs');
var gulp = require('gulp');
var less = require('gulp-less');
//确保本地已安装gulp-minify-css [cnpm install gulp-minify-css --save-dev]
var cssmin = require('gulp-minify-css');

var path = require('path');
var webpack = require("webpack");
// var ExtractTextPlugin = reqpuire("extract-text-webpack-lugin");

var srcDir = "./src";

var isWatch = false;  //是否监听
var isProduct = false;  //是否是开发环境
var project = 'iwjw-pc';  // 项目名称

gulp.task('default', () => {
    // 将你的默认的任务代码放在这
    console.log("fdsfsdf");
});
/**
 * 名称：
 *   javascript task
 * 描述：用来做 javascript 的编译，压缩，合并等工作
 *
 */
gulp.task('javascript', () => {
    console.log("fdsfsdf");
    
});

/**
 * 名称：
 *   webpack task
 * 描述：该项目中，默认使用webPack 用来做 javascript 的编译，压缩，合并等工作
 *
 */
//webpack静态处理
gulp.task('webpack', function(callback) {
    var minfy = [];
    isProduct && minfy.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        },
        mangle: {
            except: ['$', 'm', 'webpackJsonpCallback']
        }
    }));
    //webpack配置文件
    var config = {
        devtool: "source-map",	//生成sourcemap,便于开发调试
        entry: getEntry(),		 //获取项目入口js文件
        output: {
            path: path.join(__dirname, "dist/js/"), //文件输出目录
            publicPath: "dist/js/",		//用于配置文件发布路径，如CDN或本地服务器
            filename: "[name].js",		//根据入口文件输出的对应多个文件名
        },
        module: {
            //各种加载器，即让各种文件格式可用require引用
            loaders: [
                // { test: /\.css$/, loader: "style-loader!css-loader"},
                // { test: /\.less$/, loader: "style-loader!csss-loader!less-loader"}
            ]
        },
        resolve: {
            //配置别名，在项目中可缩减引用路径
            alias: {
                jquery: srcDir + "/js/lib/jquery.min.js",
                core: srcDir + "/js/core",
                ui: srcDir + "/js/ui"
            }
        },
        plugins: [
            //提供全局的变量，在模块中使用无需用require引入
            new webpack.ProvidePlugin({
                jQuery: "jquery",
                $: "jquery",
                // nie: "nie"
            }),
            //将公共代码抽离出来合并为一个文件
            new webpack.optimize.CommonsChunkPlugin('common.js'),
            //js文件的压缩
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            })
        ]
    };
    webpack(config, function(err, stats) {
        console.log(stats.toString());
    });
});

/**
 * 描述：
 *   less task
 * 描述：用来做 less 的编译，压缩，合并等工作
 *
 */
gulp.task('less', () => {
    gulp.src(['src/less/*.less','!src/less/extend'])
        .pipe(less())
        .pipe(cssmin()) //兼容IE7及以下需设置compatibility属性 .pipe(cssmin({compatibility: 'ie7'}))
        .pipe(gulp.dest('src/css'));
});

/**
 * 描述：
 *   watch task
 * 描述：该任务用来做监听，当文件发生更改时，自动执行对应的task
 *
 */
gulp.task('watch', function () {
    gulp.watch('src/less/*.less', ['less']); //监听less 文件夹
});


function getEntry() {
    var jsPath = path.resolve(srcDir, 'js');
    var dirs = fs.readdirSync(jsPath);
    var matchs = [], files = {};
    dirs.forEach(function (item) {
        matchs = item.match(/(.+)\.js$/);
        if (matchs) {
            files[matchs[1]] = path.resolve(srcDir, 'js', item);
        }
    });
    return files;
}