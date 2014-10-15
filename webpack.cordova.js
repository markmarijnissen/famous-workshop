var CordovaPlugin = require('webpack-cordova-plugin');
/**
 * Extend the default config.
 */
var config = require('./webpack.config.js');

/**
 * Add the Webpack Cordova Plugin
 */
config.plugins.push(new CordovaPlugin({
  config: 'config.xml',                     // Location of Cordova' config.xml (will be created if not found)
  src: 'index.html',            // Set entry-point of cordova in config.xml
  version: true,                            // Set config.xml' version. (true = use version from package.json)
}));

/**
 * Set webpack-dev-server content-base. This is equired to load the correct Cordova Javascript.
 */
var argv = require('optimist').argv;
if(argv.ios){
  config.devServer.contentBase = 'platforms/ios/www';
}
else if(argv.android) {
  config.devServer.contentBase = 'platforms/android/assets/www';
} else {
  console.log('Use --android or --ios to enable Cordova plugins!');
}

module.exports = config;



