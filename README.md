#famous-workshop
> Workshop accompanying an introduction to famo.us. Based on [famous-webpack-seed](https://github.com/markmarijnissen/famous-webpack-seed).

### 

---

### Getting started

####Installation

Make sure you have [Node.js](http://nodejs.org/) installed and `npm` is in your path.

```bash
npm install -g webpack webpack-dev-server # install webpack
git clone https://github.com/markmarijnissen/famous-webpack-seed # clone this repository
# rm -rf .git # optionally remove git history
npm install # install dependencies
```

####Development

```bash
webpack-dev-server --reload=localhost # or: gulp
```

Now navigate to:

* [http://localhost:8080/menu/index.html](http://localhost:8080/menu/index.html)
* [http://localhost:8080/webpack-dev-server](http://localhost:8080/webpack-dev-server) (lists all bundles)

The optional `--reload=ip` flag [adds the live-reload snippet](https://github.com/markmarijnissen/webpack-reload-plugin) to your bundle(s).


####Production
```bash
webpack --minify --env=production # or: gulp build
```

* The optional `--minify` flag minifies the output.
* The optional `--env=xxx` flag sets a global `ENV` variable (default: `window.TARGET='dev'`).

####Deploy to Github pages
```
gulp deploy
```

---

### Getting started with Cordova 

####Installation:

```bash
npm install -g cordova
webpack --config webpack.cordova.js  # automatically creates a Cordova config.xml
# change app ID in config.xml (optional)
cordova platform add ios # or android
```

The `webpack.cordova.js` configuration uses the [webpack-cordova-plugin](https://github.com/markmarijnissen/webpack-cordova-plugin) to add Cordova to your project.

####Development:

```bash
webpack-dev-server --config webpack.cordova.js --reload=192.168.0.1 --ios # or --android

# in seperate terminal-tab, launch cordova
cordova run ios # or android
```

* The `--reload` flag enables live reloading, and points Cordova to your **webpack-dev-server**.

* The `--ios` or `--android` flags ensure the correct Cordova and plugin javascript is loaded. The javascript is different for each platform and located at `platform/ios/www ` or `platform/android/assets/www `.

####Production:
```bash
webpack --config webpack.cordova.js [--minify]  [--env=production]
cordova run ios # or android
```

####Cordova troubleshooting
For more information and troubleshooting see the [webpack-cordova-plugin](https://github.com/markmarijnissen/webpack-cordova-plugin).

---

## Read more

See original famous-webpack-seed at [https://github.com/markmarijnissen/famous-webpack-seed](https://github.com/markmarijnissen/famous-webpack-seed).