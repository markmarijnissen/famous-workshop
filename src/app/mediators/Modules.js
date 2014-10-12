var Engine = require('famous/core/Engine');

// cache for all modules that are created
var modules = window.Modules = {};

// when a module is created...
Engine.on('created',function(module){
  // try to find the name
  var name;
  if(module.options) {
    name = module.options.id || module.options.name || module.id || module.name;
  } else {
    name = module.id || module.name;
  }
  
  if(name) {
    // store module for later reference
    modules[name] = module;

    // broadcast module creation
    Engine.emit('created:'+name,module);
    console.log('created:'+name);
  }

});

module.exports = modules;
