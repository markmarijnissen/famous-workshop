var Modules         = require('./Modules');
var Engine          = require('famous/core/Engine');

// When router is created
Engine.on('created:Router',function(router){
    
  // mediate router-change event.
  router.on('change',function (route) {
    if(Modules.sidepanel) Modules.sidepanel.open(false);
    if(Modules.pages) Modules.pages.show(route.id);
  });

  // Whenever the app emits a global 'navigate' event, mediate to invoke the router.
  Engine.on('navigate',router.set);

});

// Open/close menu
Engine.on('menu',function(open){
  if(Modules.sidepanel) Modules.sidepanel.open(open);
});

