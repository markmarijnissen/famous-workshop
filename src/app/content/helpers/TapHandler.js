var Engine = require('famous/core/Engine');

module.exports = function(tapEvent){
  var action = tapEvent.target.getAttribute('action');
  var href= tapEvent.target.getAttribute('href');
  if(action === 'menu') {
    Engine.emit('menu',true);
  } else if(href && href.length > 1) {
    Engine.emit('navigate',href.substr(1));
  }
};