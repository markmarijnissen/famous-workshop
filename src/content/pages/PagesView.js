var Engine                = require('famous/core/Engine');
var View                  = require('famous/core/View');
var PageView              = require('./PageView');
var RenderController      = require('famous/views/RenderController');

function PagesView(options) {
  var self = this;
  View.apply(this, arguments);

  // Create RenderController
  this.controller = new RenderController({
    inTransition: false,    // Specify transition like: {curve:'easeIn', duration: 500}, 
    outTransition: false,
    overlap: false
  });

  // Specify page in/out transformation:
  // 
  // this.controller.inTransformFrom(function(value){});
  // this.controller.inOpacityFrom(function(value){});
  // this.controller.inOriginFrom(function(value){});
  // this.controller.outTransformFrom(function(value){});
  // this.controller.outOpacityFrom(function(value){});
  // this.controller.outOriginFrom(function(value){});

  // Create pages
  this.pages = {};
  options.pages.forEach(function(pageOptions){
    // create a page
    var page = new PageView(pageOptions);
    // store the page in a hash
    self.pages[pageOptions.id] = page;
    // forward events from the PageView (surface) to this view.
    page.pipe(self._eventOutput);
  });

  // Add to view
  this.add(this.controller);

  // For the mediators
  Engine.emit('created',this);
}

PagesView.prototype = Object.create(View.prototype);
PagesView.prototype.constructor = PagesView;
PagesView.DEFAULT_OPTIONS = {
  id: 'pages'
};

PagesView.prototype.show = function(name){
  // show the page!
  // 
  // Called by the RouterMediator when the route (#page1) changes.
  this.controller.show(this.pages[name]);
};

module.exports = PagesView;