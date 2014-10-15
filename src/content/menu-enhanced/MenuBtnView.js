var View            = require('famous/core/View');
var Engine          = require('famous/core/Engine');
var Transform       = require('famous/core/Transform');
var Modifier        = require('famous/core/Modifier');
var Surface         = require('famous/core/Surface');
var TapHandler      = require('../../helpers/TapHandler');

function MenuBtnView(options) {
    View.apply(this, arguments);

    var mod = new Modifier({
      transform: Transform.translate(0,0,1),
      size: [undefined,50]
    });

    var surface = new Surface({
      content: options.content.author,
      classes: ['menu-btn']
    });
    surface.on('tap',function(){
      Engine.emit('navigate',options.id);
    });

    this.add(mod).add(surface);
}

MenuBtnView.prototype = Object.create(View.prototype);
MenuBtnView.prototype.constructor = MenuBtnView;

MenuBtnView.DEFAULT_OPTIONS = {};

module.exports = MenuBtnView;