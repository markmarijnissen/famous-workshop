var View            = require('famous/core/View');
var PageController      = require('famous-pagecontroller');
var PageView        = require('./pages/PageView');
var MenuView        = require('./menu/MenuView');
var SidepanelLayout = require('famous-sidepanel');

function AppView(options) {
  View.apply(this, arguments);

  // Create Menu
  var menu = new MenuView(options.menu);

  // Create Pages
  var pageController = new PageController({id: 'pages'});
  options.pages.forEach(function(pageOptions){
    pageController.addPage(pageOptions.id,new PageView(pageOptions));
  });

  // Create SidepanelLayout
  var layout = new SidepanelLayout({
    id:'sidepanel',
    sidepanel:menu,
    content:pageController
  });

  // forward events to the layout (swipe to open)
  for(var id in pageController.pages){
    pageController.pages[id].pipe(layout);
  }

  // Add to view
  this.add(layout);
}

AppView.prototype = Object.create(View.prototype);
AppView.prototype.constructor = AppView;

AppView.DEFAULT_OPTIONS = {};

module.exports = AppView;