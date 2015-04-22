var PIXI = require('pixi.js');
var Config = require('../Config');
var Balloon = require('./Balloon');
var Random = require('../utils/Random');
var Movie = require('../utils/Movie');

var Alien = function() {
  var self = this;

  this.view = new PIXI.DisplayObjectContainer();
  this.image = new PIXI.DisplayObjectContainer();
  this.direction = 0;
  this.type = 0;
  this.id = '';
  this.speed = 0;
  this.state = 0;
  this.thingToEat = null;
  this.demands = [];
  this.balloon = new Balloon();

  this.movie = new Movie();
  var frameRate = 0.1;
  this.movie.addScene('alien1_walking', frameRate, Movie.LOOP);
  this.movie.addScene('alien2_walking', frameRate, Movie.LOOP);
  this.movie.addScene('alien3_walking', frameRate, Movie.LOOP);
  this.movie.addScene('alien1_eating', frameRate, Movie.ONCE, 'alien1_walking', [{frame:1, action:_onEat}, {frame:3, action:_onEatComplete}]);
  this.movie.addScene('alien2_eating', frameRate, Movie.ONCE, 'alien2_walking', [{frame:1, action:_onEat}, {frame:3, action:_onEatComplete}]);
  this.movie.addScene('alien3_eating', frameRate, Movie.ONCE, 'alien3_walking', [{frame:1, action:_onEat}, {frame:3, action:_onEatComplete}]);

  function _onEat() {
    self.onEat();
  }

  function _onEatComplete() {
    self.onEatComplete();
  }

  this.image.addChild(this.movie.view);
  this.view.addChild(this.image);
  this.view.addChild(this.balloon.view);

}

Alien.SLEEPING = 0;
Alien.WALKING = 1;
Alien.EATING = 2;
Alien.DYING = 3;
Alien.DEAD = 4;

Alien.prototype.spawn = function(position, direction) {
  this.direction = direction;
  this.randomizeType();
  this.randomizeDemands();
  this.view.position.x = position.x;
  this.view.position.y = position.y;
  this.state = Alien.WALKING;
}

Alien.prototype.randomizeType = function() {
  var type = Random.range(1, 3, true);
  this.setType(type);
}

Alien.prototype.setType = function(type) {
  this.config = Config.aliens[type - 1];
  this.type = type;
  this.id = this.config.id;
  this.speed = this.config.speed;

  this.movie.view.visible = true;
  this.movie.play(this.id + '_walking');

  var size = this.config.size;
  this.movie.view.position.x = -size/2;
  this.image.position.y = -size + 16;
  this.image.scale.x = -this.direction;
  this.balloon.view.y = this.image.position.y - 8;
}

Alien.prototype.randomizeDemands = function() {
  var demands = [];
  var i = this.config.demands;
  while (i--) {
    var index = Random.range(0, 2, true);
    var type = Config.recipes[index];
    demands.push(type);
  }
  this.demands = demands;
  this.balloon.updateDemands(this.demands);
}

Alien.prototype.update = function(){
  if (this.state == Alien.WALKING) {
    var velocity = this.direction*this.speed*Config.overallAlienSpeed;
    this.view.position.x += velocity;
  }
  this.movie.update();
}

Alien.prototype.hasDemand = function(demand) {
  return this.demands.indexOf(demand) >= 0;
}

Alien.prototype.removeDemand = function(demand) {
  var demandIndex = this.demands.indexOf(demand);
  if (demandIndex < 0) return false;
  this.demands.splice(demandIndex, 1);
  this.balloon.removeDemand(demand);
  this.dead == this.demands.length == 0;
}

Alien.prototype.eat = function(something) {
  this.thingToEat = something;
  this.movie.play(this.id + '_eating');
  this.state = Alien.EATING;
}

Alien.prototype.onEat = function() {
  if (!this.thingToEat) return;
  this.thingToEat.dispose();
  this.thingToEat = null;
}

Alien.prototype.onEatComplete = function() {
  this.state = Alien.WALKING;
  if (this.demands.length == 0) this.die();
}

Alien.prototype.die = function() {
  this.state = Alien.DEAD;
  console.log('alien explodes!');
}

Alien.prototype.dispose = function() {
  this.balloon.dispose();
  this.balloon = null;
  if (this.view.parent) this.view.parent.removeChild(this.view);
  this.view = null;
}

module.exports = Alien;
