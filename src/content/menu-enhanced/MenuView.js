var View            = require('famous/core/View');
var Modifier        = require('famous/core/Modifier');
var Transform       = require('famous/core/Transform');
var Surface         = require('famous/core/Surface');
var MenuBtnView     = require('./MenuBtnView');
var SequentialLayout = require('famous/views/SequentialLayout');

function MenuView(options) {
    View.apply(this, arguments);

    // Background!
    var mod = new Modifier({
      transform: Transform.translate(0,0,-1)
    });
    var surface = new Surface({
      content: '',
      classes: ['menu']
    });
    this.add(mod).add(surface);

    // Menu Items
    var items = [];
    var layout = new SequentialLayout({
      direction: 1
    });
    layout.sequenceFrom(items);

    options.items.forEach(function(pageOptions){
      items.push(new MenuBtnView(pageOptions));
    });

    this.add(layout);
}

MenuView.prototype = Object.create(View.prototype);
MenuView.prototype.constructor = MenuView;

MenuView.DEFAULT_OPTIONS = {};

module.exports = MenuView;