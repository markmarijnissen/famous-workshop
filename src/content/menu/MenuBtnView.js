var View            = require('famous/core/View');
var Transform       = require('famous/core/Transform');
var Modifier        = require('famous/core/Modifier');
var Surface         = require('famous/core/Surface');
var template        = require('./Menu.jade');
var TapHandler      = require('../../helpers/TapHandler');

function MenuBtnView(options) {
    View.apply(this, arguments);

    var mod = new Modifier({
      transform: Transform.translate(0,0,1),
      size: [undefined,30]
    });

    var surface = new Surface({
      content: options.author,
      classes: ['menu-btn']
    });
    surface.on('tap',TapHandler);

    this.add(mod).add(surface);
}

MenuBtnView.prototype = Object.create(View.prototype);
MenuBtnView.prototype.constructor = MenuBtnView;

MenuBtnView.DEFAULT_OPTIONS = {};

module.exports = MenuBtnView;