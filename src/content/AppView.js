var View            = require('famous/core/View');
var PageController      = require('famous-pagecontroller');
var PagesView        = require('./pages/PagesView');
var MenuView        = require('./menu-enhanced/MenuView');
var SidepanelLayout = require('famous-sidepanel');

function AppView(options) {
  View.apply(this, arguments);

  // Create Menu
  var menu = new MenuView({items:options.pages.pages});

  // Create Pages
  var content = new PagesView(options.pages);

  // Create SidepanelLayout
  options.sidepanel.sidepanel = menu;
  options.sidepanel.content = content;
  var layout = new SidepanelLayout(options.sidepanel);

  // forward events to the layout (swipe to open)
  layout.subscribe(content);

  // Add to view
  this.add(layout);
}

AppView.prototype = Object.create(View.prototype);
AppView.prototype.constructor = AppView;

AppView.DEFAULT_OPTIONS = {};

module.exports = AppView;