var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('webpack');
var Server = require('webpack-dev-server');
var deploy = require("gulp-gh-pages");

gulp.task('dev',function(){
  DEV_SERVER = true;
  var webpackConfig = require('./webpack.config');
  var compiler = webpack(webpackConfig);
  new Server(compiler,{
    stats: { colors: true }
  }).listen(8080,"localhost",function(err){
    if(err) throw new gutil.PluginError("webpack-dev-server", err);
    gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");
  });
});

gulp.task('build',function(callback){
  var webpackConfig = require('./webpack.config');
  webpack(webpackConfig,function(err,stats){
    if(err) throw new gutil.PluginError("webpack", err);
    gutil.log("[webpack]", stats.toString({
      colors: true
    }));
    callback();
  });
});

gulp.task('deploy', ['build'], function () {
    return gulp.src('./dist/**/*')
        .pipe(deploy());
});

gulp.task('default',['dev']);