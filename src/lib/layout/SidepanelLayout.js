var View          = require('famous/core/View');
var Engine        = require('famous/core/Engine');
var Modifier        = require('famous/core/Modifier');
var Transform       = require('famous/core/Transform');
var StateModifier   = require('famous/modifiers/StateModifier');
var Easing          = require('famous/transitions/Easing');
var Transitionable  = require('famous/transitions/Transitionable');
var GenericSync     = require('famous/inputs/GenericSync');


/**
 A typical sidepanel that swipes from the left.

 emits events:
    'sidepanel': true (opened) | false (closed)
    'opening'
    'closing'
  

 public API (and listens to)
    open(<boolean> value): true (open) | false (close) | null (toggle)

 **/
function SidepanelLayout(options) {
    View.apply(this, arguments);
    Engine.emit('created',this);

    // show sidepanel or not...
    this.animating = false;
    this.opened = false;
    // position content X
    this.contentPos = new Transitionable(0);

    window.contentPos = this.contentPos;

    // Add sidepanel and content
    if(!!options.sidepanel) {
      _addSidepanel.call(this,options.sidepanel);
    } else {
      Engine.emit('error',{target:this,message:'No sidepanel!'});
    }
    if(!!options.content) {
      _addContent.call(this,options.content);
    } else {
      Engine.emit('error',{target:this,message:'No content!'});
    }

    // handle Swipe
    _handleSwipe.call(this);

    // handle events
    this._eventInput.on('open',this.open);

}
SidepanelLayout.prototype = Object.create(View.prototype);
SidepanelLayout.prototype.constructor = SidepanelLayout;
SidepanelLayout.prototype.name = 'SidepanelLayout';

SidepanelLayout.DEFAULT_OPTIONS = {
  sidepanel: null,    //RenderNode for sidepanel
  content: null,      //Rendernode for content
  background: null,

  maxPos: 1e4,
  width: 225,  //How much should content move?
  transition: {
      duration: 300,
      curve: 'easeOut'
  },
  moveThreshold: 20, // when should you start moving?
  posThreshold: 138,  //When should sidepanel open?
  velThreshold: 0.75,  //When should sidepanel open?
};

SidepanelLayout.prototype.open = function(value,instant) {
  if(value !== false && value !== true) value = !this.opened;
  if(value !== this.opened) {
    if(value) {
      _open.call(this,instant);
    } else {
      _close.call(this,instant);
    }
  }
};

function _opened(){
  this.opened = true;
  this.animating = false;
  this._eventOutput.emit('sidepanel',true);
}

function _open(instant) {
  this._eventOutput.emit('opening');
  this.dragging = false;
  if(instant === true && !this.animating){
    this.contentPos.set(this.options.width);
    _opened.call(this);
  } else {
    this.animating = true;
    this.contentPos.set(this.options.width, this.options.transition, _opened.bind(this));
  }
}

function _closed(){
  this.opened = false;
  this.animating = false;
  this._eventOutput.emit('sidepanel',false);
}

function _close(instant) {
  this._eventOutput.emit('closing');
  this.dragging = false;
  if(instant === true && !this.animating){
    this.contentPos.set(0);
    _closed.call(this);
  } else {
    this.animating = true;
    this.contentPos.set(0, this.options.transition, _closed.bind(this));
  }
}

function _handleSwipe() {
  var sync = new GenericSync(
      ['mouse', 'touch'],
      {direction : GenericSync.DIRECTION_X}
  );

  // Listen to touch events from INPUT
  this._eventInput.pipe(sync);

  sync.on('start',function(data){
    this.dragging = data.clientX < this.options.moveThreshold;
  }.bind(this));

  sync.on('update', function(data) {
      if(this.animating || !this.dragging) return;
      var touchPos = data.position;
      var currentPosition = this.contentPos.get();
      var position = Math.max(0, currentPosition + data.delta);
      position = Math.min(this.options.maxPos,position);
      this.contentPos.set(position);
  }.bind(this));

  sync.on('end', (function(data) {
      this.dragging = false;
      if(this.animating) return;
      var velocity = data.velocity;
      var position = this.contentPos.get();

      if(this.contentPos.get() > this.options.posThreshold) {
          if(velocity < -this.options.velThreshold) {
              _close.call(this);
          } else {
              _open.call(this);
          }
      } else {
          if(velocity > this.options.velThreshold) {
              _open.call(this);
          } else {
              _close.call(this);
          }
      }
  }).bind(this));
}

function _addContent(content) {
  this.content = content;
  this.contentMod = new Modifier({
    transform: function() {
        return Transform.translate(this.contentPos.get(), 0, 0);
    }.bind(this)
  });
  this.add(this.contentMod).add(content);
}

function _addSidepanel(sidepanel) {
  this.sidepanel = sidepanel;
  this.sidepanelMod = new StateModifier({
    transform: Transform.translate(0,0,-1000),
    size: [undefined,undefined]
  });
  this.add(this.sidepanelMod).add(sidepanel);
}

module.exports = SidepanelLayout;