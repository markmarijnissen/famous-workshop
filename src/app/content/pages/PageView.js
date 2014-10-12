var Engine          = require('famous/core/Engine');
var View            = require('famous/core/View');
var Transform       = require('famous/core/Transform');
var Modifier        = require('famous/core/Modifier');
var Surface         = require('famous/core/Surface');
var template        = require('./Page.jade');
var TapHandler      = require('../../mediators/TapHandler');

function PageView(options) {
    View.apply(this, arguments);

    var mod = new Modifier({
      transform: Transform.translate(0,0,1)
    });

    var surface = new Surface({
      content: template(options.content),
      classes: ['page']
    });
    surface.on('tap',TapHandler);

    this.add(mod).add(surface);
}

PageView.prototype = Object.create(View.prototype);
PageView.prototype.constructor = PageView;

PageView.DEFAULT_OPTIONS = {};

module.exports = PageView;