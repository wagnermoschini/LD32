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
  this.deadCount = 0;
  this.wave = null;


  this.movie = new Movie();
  var frameRate = 0.125;
  this.movie.addScene('alien1_walking', frameRate, Movie.LOOP);
  this.movie.addScene('alien2_walking', frameRate, Movie.LOOP);
  this.movie.addScene('alien3_walking', frameRate, Movie.LOOP);
  this.movie.addScene('alien1_eating', frameRate, Movie.ONCE, 'alien1_walking', [{frame:1, action:_onEat}, {frame:3, action:_onEatComplete}]);
  this.movie.addScene('alien2_eating', frameRate, Movie.ONCE, 'alien2_walking', [{frame:1, action:_onEat}, {frame:3, action:_onEatComplete}]);
  this.movie.addScene('alien3_eating', frameRate, Movie.ONCE, 'alien3_walking', [{frame:1, action:_onEat}, {frame:3, action:_onEatComplete}]);
  this.movie.addScene('alien1_exploding', frameRate, Movie.ONCE, null, [{frame:5, action:_onExplodeComplete}]);
  this.movie.addScene('alien2_exploding', frameRate, Movie.ONCE, null, [{frame:5, action:_onExplodeComplete}]);
  this.movie.addScene('alien3_exploding', frameRate, Movie.ONCE, null, [{frame:5, action:_onExplodeComplete}]);

  function _onEat() {
    self.onEat();
  }

  function _onEatComplete() {
    self.onEatComplete();
  }

  function _onExplodeComplete() {
    self.state = Alien.DEAD;
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

Alien.prototype.spawn = function(position, direction, wave) {

  this.wave = wave;
  this.direction = direction;

  this.setType( this.randomizeType(this.wave.aliens) );

  this.demands = this.randomizeDemands( this.wave.demandType[this.type] );
  this.balloon.updateDemands(this.demands);

  this.view.position.x = position.x;
  this.view.position.y = position.y;
  this.state = Alien.WALKING;

}

Alien.prototype.randomizeType = function(max) {
  return Random.range(0, max, true);
}

Alien.prototype.setType = function(type) {

  this.type = type;
  this.score = Config.score[this.type];
  this.config = Config.aliens[this.type];
  this.id = this.config.id;
  this.speed = this.config.speed * this.wave.speedRatio;

  this.movie.view.visible = true;
  this.movie.play(this.id + '_walking');

  var size = this.config.size;
  this.movie.view.position.x = -size/2;
  this.image.position.y = -size + 16;
  this.image.scale.x = -this.direction;
  this.balloon.view.y = this.image.position.y - 8;
}

Alien.prototype.randomizeDemands = function(max) {
  var demands = [];
  var i = this.config.demands;
  while (i--) {
    var index = Random.range(0, max, true);
    var type = Config.recipes[index].id;
    demands.push(type);
  }

  return demands;
}

Alien.prototype.update = function(){
  if (this.state == Alien.WALKING) {
    var velocity = this.direction*this.speed*Config.overallAlienSpeed;
    this.view.position.x += velocity;
  }
  if (this.mustDie) this.state = Alien.DEAD;
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
  this.thingToEat.beEaten();
  this.thingToEat = null;
}

Alien.prototype.onEatComplete = function() {
  if (this.state != Alien.EATING) return;
  this.state = Alien.WALKING;
  this.movie.play(this.id + '_walking');
  if (this.demands.length == 0) this.die();
}

Alien.prototype.die = function() {
  this.state = Alien.DYING;
  this.movie.play(this.id + '_exploding');
}

Alien.prototype.dispose = function() {
  this.balloon.dispose();
  this.balloon = null;
  if (this.view.parent) this.view.parent.removeChild(this.view);
  this.view = null;
}

module.exports = Alien;
