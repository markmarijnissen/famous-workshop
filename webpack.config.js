var webpack = require('webpack');
var ReloadPlugin = require('webpack-reload-plugin');
var path = require('path');
var isDevServer = process.argv.join('').indexOf('webpack-dev-server') > -1 || global.DEV_SERVER;

// Support for extra commandline arguments
var argv = require('optimist')
            //--env=XXX: sets a global ENV variable (i.e. window.ENV="XXX")
            .alias('e','env').default('e','dev')
            //--minify:  minifies output
            .alias('m','minify')
            .argv;

var config = {
  context: path.join(__dirname, "src"),
  entry: ['./main'],
  output:{
    path: path.join(__dirname, "dist"),
    filename:"js/bundle.js",
    publicPath: isDevServer ? '/': ''
  },
  resolve: {
    alias: {
      'famous':'famous/src',
      'common':path.join(__dirname,'src','common')
    }
  },
  devtool:'#eval',
  devServer: {
    publicPath: '/'
  },
  module:{
    loaders:[
      { test: /\.json$/,            loader: "json-loader" },
      { test: /\.coffee$/,          loader: "coffee-loader" },
      { test: /\.css$/,             loader: "style-loader!css-loader" },
      { test: /\.less$/,            loader: "style-loader!css-loader!less-loader" },
      { test: /\.jade$/,            loader: "jade-loader" },
      { test: /\.(png|jpg|gif)$/,   loader: "url-loader?limit=50000&name=[path][name].[ext]" },
      { test: /\.(eot|ttf|svg|woff)(\?.*)?$/, loader: "file-loader?name=[path][name].[ext]" },
      { test: /index\.html$/,       loader: "file-loader?name=[path][name].[ext]" }
    ]
  },
  plugins:[
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(require(path.resolve(__dirname,'package.json')).version),
      ENV: JSON.stringify(argv.env)
    }),
    new ReloadPlugin(isDevServer? 'localhost': null)
  ]
};

if(argv.minify){
  delete config.devtool;
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({mangle:false}));
}


module.exports = config;


