var PIXI = require('pixi.js');
var Math2 = require('../Utils/Math.js');

var Colider = function() {}

Colider.prototype.isColide = function(positionA, positionB){

  if(Math.distance(positionTile,0,positionAlien,0) > 10){
    return true;
  }
}

module.exports = Colider;
