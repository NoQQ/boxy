var Boxy = require('./lib/boxy');

global.boxy = new Boxy();

process.on('error', function(err) {
  console.log(err);
});