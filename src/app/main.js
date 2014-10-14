// Require CSS
require('famous/core/famous.css');
require('./theme/app.less');

// Copy the index.html to the output folder
require('./index.html');

// Require libs
require('famous-polyfills');
require('famous-tapevent'); //adds 'tap' event to Surfaces.

// Start mediators. They connect everything together
require('famous-mediator/ErrorMediator');
require('./mediators/RouteMediator');


// Configure inputs
var GenericSync     = require('famous/inputs/GenericSync');
var MouseSync       = require('famous/inputs/MouseSync');
var TouchSync       = require('famous/inputs/TouchSync');
var ScrollSync      = require('famous/inputs/ScrollSync');
GenericSync.register({'mouse': MouseSync, 'touch': TouchSync, 'scroll':ScrollSync});

// Bootstrap app
var Engine = require('famous/core/Engine');
var AppView = require('./content/AppView');
var Router = require('famous-router');
var config = require('./data/config');

// Instantiate a router
var router = new Router(config.router);

// Create a new context
var mainContext = Engine.createContext();
// Create a new App;
var app = new AppView(config);

// Launch the App!
mainContext.add(app);