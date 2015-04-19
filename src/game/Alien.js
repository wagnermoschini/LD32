var PIXI = require('pixi.js');
var Balloon = require('./Balloon');
var Random = require('../utils/Random');

var Alien = function( direction, rangeX ) {

  this.view = new PIXI.DisplayObjectContainer();
  this.direction = direction;
  this.range = rangeX;
  this.type = 0;
  this.balloon = new Balloon();
  this.randomizeType();

  if(this.direction === 'left'){
    this.image.scale.x = -1;
    this.view.position.x = -rangeX;
  } else {
    this.view.position.x = rangeX;
  }

  this.view.addChild(this.balloon.view);
  this.balloon.view.y = -26;
}

Alien.prototype.setType = function(type, demand) {
  this.type = type;
  this.image = PIXI.Sprite.fromFrame('alien.png');
  this.image.anchor.x = 0.5;
  this.image.anchor.y = 0.5;
  this.view.addChild(this.image);
  this.balloon.updateDemands(demand);
}

Alien.prototype.randomizeType = function() {
  var availableDemands = ['donut', 'cupcake', 'cake'];
  var type = Random.range(1, 3, true);

  var demand = [];
  var i = type;
  while (i--) {
    var demandIndex = Random.range(0, 2, true);
    var demandItem = availableDemands[demandIndex];
    demand.push(demandItem);
  }

  this.setType(type, demand);
}

Alien.prototype.update = function(){

  if(this.direction === 'left'){
    this.view.position.x += 1;
  } else {
    this.view.position.x -= 1;
  }

}

module.exports = Alien;
