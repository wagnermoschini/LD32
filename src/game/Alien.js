var PIXI = require('pixi.js');
var Config = require('../Config');
var Balloon = require('./Balloon');
var Random = require('../utils/Random');

var Alien = function( direction, rangeX ) {

  this.view = new PIXI.DisplayObjectContainer();
  this.direction = direction;
  this.range = rangeX;
  this.type = 0;
  this.demands = [];
  this.balloon = new Balloon();

  this.randomizeType();
  this.randomizeDemands();

  this.image.scale.x = -this.direction;
  this.view.position.x = rangeX*-this.direction;

  this.view.addChild(this.balloon.view);
  this.balloon.view.y = -26;
}

Alien.prototype.setType = function(type) {
  this.type = type;
  this.image = PIXI.Sprite.fromFrame('alien.png');
  this.image.anchor.x = 0.5;
  this.image.anchor.y = 0.5;
  this.view.addChild(this.image);
}

Alien.prototype.randomizeType = function() {
  var type = Random.range(1, 3, true);
  var demands = [];
  var i = type;
  while (i--) {
    var demandIndex = Random.range(0, 2, true);
    var demandItem = Config.recipes[demandIndex];
    demands.push(demandItem);
  }

  this.setType(type);
}

Alien.prototype.randomizeDemands = function() {
  var type = Random.range(1, 3, true);
  var demands = [];
  var i = this.type;
  while (i--) {
    var index = Random.range(0, 2, true);
    var type = Config.recipes[index];
    demands.push(type);
  }
  this.demands = demands;
  this.balloon.updateDemands(this.demands);
}

Alien.prototype.update = function(){
  this.view.position.x += this.direction;
}

Alien.prototype.removeDemand = function(demand) {
  var demandIndex = this.demands.indexOf(type);
  if (demandIndex < 0) return;
  this.demands.splice(demandIndex, 1);
  this.balloon.removeDemand(demand);
  if (this.demands.length == 0) this.die();
}

Alien.prototype.die = function() {
  console.log('alien explodes!');
  this.dispose();
}

Alien.prototype.dispose = function() {
  if (this.view.parent) thid.view.parent.removeChild(this.view);
  this.view = null;
  this.balloon.dispose();
  this.balloon = null;
}

module.exports = Alien;
