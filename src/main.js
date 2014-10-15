// Require CSS & index.html
require('famous/core/famous.css');
require('./theme/app.less');
require('./index.html');

// Require Famo.us libs and components
require('famous-polyfills');
require('famous-tapevent'); //adds 'tap' event to Surfaces.
var Engine = require('famous/core/Engine');
var Router = require('famous-router');
var AppView = require('./content/AppView');

// Start Mediators. They connect everything together
require('famous-mediator');
require('famous-mediator/ErrorMediator');
require('./mediators/RouteMediator');

// Configure inputs
var GenericSync     = require('famous/inputs/GenericSync');
var MouseSync       = require('famous/inputs/MouseSync');
var TouchSync       = require('famous/inputs/TouchSync');
var ScrollSync      = require('famous/inputs/ScrollSync');
GenericSync.register({'mouse': MouseSync, 'touch': TouchSync, 'scroll':ScrollSync});

// Create the app!
var config = require('./config');
var router = new Router(config.router);
var app = new AppView(config);

// Launch the App!
var mainContext = Engine.createContext();
mainContext.add(app);