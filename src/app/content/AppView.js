var View            = require('famous/core/View');
var PageLayout      = require('layout/PageLayout');
var PageView        = require('./pages/PageView');
var MenuView        = require('./menu/MenuView');
var SidepanelLayout = require('layout/SidepanelLayout');

function AppView(options) {
  View.apply(this, arguments);

  // Create Menu
  var menu = new MenuView(options.menu);

  // Create Pages
  var pages = new PageLayout({id: 'pages'});
  options.pages.forEach(function(pageOptions){
    pages.addPage(pageOptions.id,new PageView(pageOptions));
  });

  // Create SidepanelLayout
  var layout = new SidepanelLayout({
    id:'sidepanel',
    sidepanel:menu,
    content:pages
  });

  // Add to view
  this.add(layout);
}

AppView.prototype = Object.create(View.prototype);
AppView.prototype.constructor = AppView;

AppView.DEFAULT_OPTIONS = {};

module.exports = AppView;