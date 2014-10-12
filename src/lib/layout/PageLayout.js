var RenderController          = require('famous/views/RenderController');
var Engine                    = require('famous/core/Engine');
var Transform                 = require('famous/core/Transform');
var RenderNode                = require('famous/core/RenderNode');
var Modifier                  = require('famous/core/Modifier');

/**
 * Extends RenderController to store a mapping from name<string> to renderable.
 *
 * Use 'addPage(name,renderable)' to add a page.
 * Use 'show(name)' to show the added page.
 *
 */
function PageLayout() {
    RenderController.prototype.constructor.apply(this, arguments);
    this.pages = {};
    Engine.emit('created',this);
}

PageLayout.prototype = Object.create(RenderController.prototype);
PageLayout.prototype.constructor = PageLayout;
PageLayout.prototype.name = 'PageLayout';

PageLayout.prototype.show = function(name,transition) {
  var args = Array.prototype.splice.call(arguments,0);
  if(typeof args[0] == 'string') {
    args[0] = this.pages[name];
  }
  if(args[0]) {
    if(args[0]._eventInput) {
      args[0]._eventInput.emit('show');
    }
    RenderController.prototype.show.apply(this,args);
  } else {
    Engine.emit('error',{target:this,message:'Page does not exist!',data:name});
  }
};

PageLayout.prototype.addPage = function(name,renderable) {
  this.pages[name] = renderable;
};

module.exports = PageLayout;