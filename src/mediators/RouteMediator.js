var Mediator         = require('famous-mediator');
var Engine          = require('famous/core/Engine');

// When router is created
Engine.on('created:Router',function(router){
    
  // mediate router-change event.
  router.on('change',function (route) {
    if(Mediator.sidepanel) Mediator.sidepanel.open(false);
    if(Mediator.pages) Mediator.pages.show(route.id);
  });

  // Whenever the app emits a global 'navigate' event, mediate to invoke the router.
  Engine.on('navigate',function(href){
    //router.set(href);
    //if(Mediator.sidepanel) Mediator.sidepanel.open(false);
  });

});

// Open/close menu
Engine.on('menu',function(open){
  if(Mediator.sidepanel) Mediator.sidepanel.open(open);
});
