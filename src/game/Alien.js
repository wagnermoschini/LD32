var PIXI = require('pixi.js');
var Config = require('../Config');
var Balloon = require('./Balloon');
var Random = require('../utils/Random');
var Movie = require('../utils/Movie');

var Alien = function( direction, rangeX ) {

  this.view = new PIXI.DisplayObjectContainer();
  this.image = new PIXI.DisplayObjectContainer();
  this.direction = direction;
  this.range = rangeX;
  this.type = 0;
  this.demands = [];
  this.balloon = new Balloon();

  this.view.addChild(this.balloon.view);
  this.movie = new Movie();
  this.movie.addScene('alien1_walking', 0.1, Movie.LOOP);
  this.movie.addScene('alien2_walking', 0.1, Movie.LOOP);
  this.movie.addScene('alien3_walking', 0.1, Movie.LOOP);

  this.view.addChild(this.image);

  this.randomizeType();
  this.randomizeDemands();
  this.view.position.x = rangeX*-this.direction;
}

Alien.prototype.setType = function(type) {
  var id = Config.aliens[type-1];
  this.type = type;
  this.image.addChild(this.movie.view);
  this.movie.view.visible = true;
  this.movie.play(id+'_walking');

  var size = 24;

  switch (type) {
    case 1:
      size = 24;
      break;
    case 2:
      size = 32;
      break;
    case 3:
      size = 42;
      break;
  }

  this.movie.view.position.x = -size/2;
  this.image.position.y = -size + 16;
  this.image.scale.x = -this.direction;
  this.balloon.view.y = this.image.position.y - 8;
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
  var speed = 0.75;
  if (this.type == 3) speed = 0.2;
  this.view.position.x += this.direction*speed;
  this.movie.update();
}

Alien.prototype.hasDemand = function(demand) {
  return this.demands.indexOf(demand) >= 0;
}

Alien.prototype.removeDemand = function(demand) {
  var demandIndex = this.demands.indexOf(demand);
  if (demandIndex < 0) return false;
  console.log(demand);
  this.demands.splice(demandIndex, 1);
  this.balloon.removeDemand(demand);
  return this.demands.length == 0;
}

Alien.prototype.die = function() {
  console.log('alien explodes!');
}

Alien.prototype.dispose = function() {
  this.balloon.dispose();
  this.balloon = null;
  if (this.view.parent) this.view.parent.removeChild(this.view);
  this.view = null;
}

module.exports = Alien;
