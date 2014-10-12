var Engine = require('famous/core/Engine');

Engine.on('error',function(err){
  var target = typeof err.target == "string"? err.target: err.target && err.target.constructor && err.target.constructor.name? err.target.constructor.name: err.target || "UnknownTarget";
  console.error("Error "+target+": "+err.message,err.data);
});