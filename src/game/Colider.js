var PIXI = require('pixi.js');
var Math2 = require('../utils/Math2.js');

var Colider = function() {}

Colider.prototype.isColide = function (ax, ay, bx, by) {

  if( Math2.distance(ax, ay, bx, by) > 10){
    return true;
  }
}

module.exports = Colider;
