var PIXI = require('pixi.js');
var Config = require('../Config');
var Grandma = require('./Grandma');
var Projectile = require('./Projectile');
var Alien = require('./Alien');
var Time = require('./Time');
var Bar = require('./Bar');
var TouchArea = require('./TouchArea');
var Colider = require('./Colider');
var Math2 = require('../utils/Math2');

var Game = function() {
  this.view = new PIXI.DisplayObjectContainer();

  this.range = Config.layout.worldSize.w/2;
  this.scenario = PIXI.Sprite.fromFrame('scenario.png');
  this.aliens = [];
  this.projectiles = [];
  this.grandma = new Grandma();
  this.time = new Time();
  this.bar = new Bar();
  this.touchArea = new TouchArea();

  this.ground = 50;

  this.view.addChild(this.scenario);
  this.view.addChild(this.grandma.view);
  this.view.addChild(this.bar.view);
  this.view.addChild(this.touchArea.view);

  this.scenario.anchor.x = 0.5;
  this.scenario.anchor.y = 0.5;

  this.summonTime = 240;
  this.frame = 0;
  this.grandma.view.position.y = this.ground + 2;

  this.power = 0;
  this.powerCoef = 0.01;

  this.onGameOver = false;
  this.running = true;
  this.onFinish = null;
};

Game.prototype.summonAlien = function(){
  var direction = Math.random() < .5 ? 1 : -1;
  var position = {x:this.range*-direction, y:this.ground};
  var alien = new Alien();
  alien.spawn(position, direction);
  this.view.addChild(alien.view);
  this.aliens.push(alien);
  this.view.addChild(this.grandma.view);
}

Game.prototype.removeAlien = function(alien, dispose) {
  var index = this.aliens.indexOf(alien);
  this.aliens.splice(index, 1);
  if (dispose) {
    alien.dispose();
    alien = null;
  }
}

Game.prototype.shoot = function(direction, recipe) {
  var velocity = (direction == 'left')?-2:2;
  var projectile = new Projectile();
  projectile.spawn(recipe, this.grandma.view.position, velocity);
  this.projectiles.push(projectile);
  this.view.addChild(projectile.view);
}

Game.prototype.removeProjectile = function(projectile, dispose) {
  var index = this.projectiles.indexOf(projectile);
  this.projectiles.splice(index, 1);
  if (dispose) {
    projectile.dispose();
    projectile = null;
  }
}

// UPDATE
Game.prototype.update = function() {
  this.time.update();

  if(this.frame % this.summonTime === 0 && this.running) {
    this.summonAlien();
  }

  this.frame += 1;

  if(this.aliens.length > 0){
    var i = this.aliens.length;
    while (i--) {
      var alien = this.aliens[i];
      if (alien.state == Alien.DEAD) {
        this.removeAlien(alien, true);
      } else {
        alien.update();
      }
    }
  }

  if(this.touchArea.down && this.running){
    this.power += this.powerCoef;
    this.bar.update(this.power);
  }

  var shoot = false;
  if(this.touchArea.up && this.running){
    var recipe = Config.getRecipeByPower(this.power);
    if (recipe) {
      this.shoot(this.touchArea.getSide(), recipe);
    }

    this.power = 0;
    this.bar.update(this.power);
    this.touchArea.setUp(false);
  }

  this.grandma.update(this.touchArea.getSide(), this.touchArea.down, shoot);

  var i = this.projectiles.length;
  while (i--) {
    this.projectiles[i].update();
  }

  // Colision Aliens

  var hasCollision = false;

  if(this.projectiles.length > 0 && this.aliens.length > 0){
    for(var i = this.projectiles.length-1; i >= 0; i--){
      var projectile = this.projectiles[i];
      for(var j = this.aliens.length-1; j >= 0; j--){
        var alien =  this.aliens[j];
        var demand = projectile.recipe.id;
        var distance = Math2.distance( projectile.view.position.x, projectile.view.position.y, alien.view.position.x, alien.view.position.y);
        if (distance < 10 && alien.hasDemand(demand) && alien.state == Alien.WALKING) {
          hasCollision = true;
          alien.removeDemand(demand);
          alien.eat(projectile);
          this.removeProjectile(projectile);
        }
        if (hasCollision) break;
      }
      if (hasCollision) break;
    }
  }

  // End Colision Aliens


  // Colision GrandMa
  if( this.aliens.length > 0 && this.running){
    var i = this.aliens.length;
    while(i--){
      var alien = this.aliens[i];
      if (alien.demands.length == 0) continue;
      var grandmaPos = this.grandma.view.position;
      var alienPos = alien.view.position;
      var distance = Math2.distance(grandmaPos.x, grandmaPos.y, alienPos.x, alienPos.y);
      if(distance < 10){
        alien.eat(this.grandma);
        this.onGameOver = true;
        this.finish();
      }
    }
  }
  // End Colision GrandMa


}

Game.prototype.finish = function() {
  this.running = false;
  // this.grandma.die();
  this.time.addCallback(this, function(){
    if (this.onFinish) this.onFinish();
  }, 3);
}

module.exports = Game;
