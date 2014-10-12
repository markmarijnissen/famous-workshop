// Require CSS
require('famous/core/famous.css');
require('./theme/app.css');

// Copy the index.html to the output folder
require('./index.html');

// Require libs
require('famous-polyfills');
require('dom/TapEvent'); //adds 'tap' event to Surfaces.

// Start mediators. They connect everything together
require('./mediators/ErrorMediator');
require('./mediators/RouteMediator');

// Bootstrap app
var Engine = require('famous/core/Engine');
var AppView = require('./content/AppView');
var Router = require('dom/Router');
var config = require('./data/config');

// Instantiate a router
var router = new Router(config.router);

// Create a new context
var mainContext = Engine.createContext();
// Create a new App;
var app = new AppView(config);

// Launch the App!
mainContext.add(app);