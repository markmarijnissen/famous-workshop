var Engine = require('famous/core/Engine');

module.exports = function(tapEvent){
  var action = tapEvent.target.getAttribute('action');
  if(action === 'menu') {
    Engine.emit('menu',true);
  }
};