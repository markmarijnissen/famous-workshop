var View            = require('famous/core/View');
var Engine          = require('famous/core/Engine');

/**
 * Useful for quickly creating elements within applications
 *   with large event systems.  Consists of a RenderNode paired with
 *   an input EventHandler and an output EventHandler.
 *   Meant to be copied and renamed by a developer.
 *
 * @class View
 * @uses EventHandler
 * @uses OptionsManager
 * @uses RenderNode
 * @constructor
 */
function EmptyView(options) {
    View.apply(this, arguments);

    Engine.emit('created',this);
}

EmptyView.prototype = Object.create(View.prototype);
EmptyView.prototype.constructor = EmptyView;

EmptyView.DEFAULT_OPTIONS = {};

module.exports = EmptyView;