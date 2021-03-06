var View            = require('famous/core/View');
var Transform       = require('famous/core/Transform');
var Modifier        = require('famous/core/Modifier');
var Surface         = require('famous/core/Surface');
var template        = require('./Menu.jade');
var TapHandler      = require('../../helpers/TapHandler');

function MenuView(options) {
    View.apply(this, arguments);

    var mod = new Modifier({
      transform: Transform.translate(0,0,1)
    });

    var surface = new Surface({
      content: template(options.content),
      classes: ['menu']
    });
    
    surface.on('tap',TapHandler);

    this.add(mod).add(surface);
}

MenuView.prototype = Object.create(View.prototype);
MenuView.prototype.constructor = MenuView;

MenuView.DEFAULT_OPTIONS = {};

module.exports = MenuView;