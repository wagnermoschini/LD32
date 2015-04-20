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

  //range defines the aliens summon origin
  this.range = Config.layout.worldSize.w/4;

  this.scenario = PIXI.Sprite.fromFrame('scenario.png');
  // this.alien =  new Alien('left',this.range);
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
  this.grandma.view.position.y = this.ground;

  this.power = 0;
  this.powerCoef = 0.01;

  // if (Config.debug) {
  //   this.summonTime = 30;
  //   this.summonAlien();
  // }
};

Game.prototype.summonAlien = function(){
  var direction = Math.random() < .5 ? 1 : -1;
  var alien = new Alien(direction, this.range, 1, 0);

  alien.view.position.y = this.ground;
  this.aliens.push(alien);
  this.view.addChild( this.aliens[this.aliens.length - 1].view );
}

Game.prototype.shoot = function(direction, power) {
  var direction = (direction == 'left')?-2:2;
  var recipe = this.getRecipe(power);

  var projectile = new Projectile();
  this.projectiles.push(projectile);
  this.view.addChild(projectile.view);

  projectile.spawn(this.grandma.view.position, recipe, direction);
}

Game.prototype.getRecipe = function(power){
  if(power >= 0.8) return Config.recipes[2];
  if(power >= 0.5) return Config.recipes[1];
  if(power >= 0.2) return Config.recipes[0];
}


// UPDATE
Game.prototype.update = function() {
  this.time.update();
  this.frame += 1;

  this.grandma.update(this.touchArea.getSide());

  // this.bar.update();

  if(this.frame % this.summonTime === 0) {
    this.summonAlien();
  }

  if(this.aliens.length > 0){
    for(var i = 0, len = this.aliens.length; i < len; i++){
      this.aliens[i].update();
    }
  }

  if(this.touchArea.down){
    this.power += this.powerCoef;
    this.bar.update(this.power);
  }

  if(this.touchArea.up){

    if(this.power >= 0.2) this.shoot(this.touchArea.getSide(), this.power);

    this.power = 0;
    this.bar.update(this.power);
    this.touchArea.setUp(false);
  }

  var i = this.projectiles.length;
  while (i--) {
    this.projectiles[i].update();
  }

  // Colision Aliens

  var hasCollision = false;

  if(this.projectiles.length > 0 && this.aliens.length > 0){
    for(var i = this.projectiles.length-1; i >= 0; i--){
      for(var j = this.aliens.length-1; j >= 0; j--){
        var projectile = this.projectiles[i];
        var alien =  this.aliens[j];
        var demand = projectile.type;
        var distance = Math2.distance( projectile.view.position.x, projectile.view.position.y, alien.view.position.x, alien.view.position.y);
        if (distance < 10 && alien.hasDemand(demand)) {
          hasCollision = true;
          var isDead = alien.removeDemand(demand);
          if (isDead) {
            alien.die();
            this.aliens.splice(j, 1);
          }
          projectile.dispose();
          this.projectiles.splice(i, 1);
        }
        if (hasCollision) break;
      }
      if (hasCollision) break;
    }
  }

  // End Colision Aliens


  // Colision GrandMa
  if( this.aliens.length > 0){
    var aliensLength = this.aliens.length;
    while(aliensLength--){
      var distance = Math2.distance( this.grandma.view.position.x, this.grandma.view.position.y, this.aliens[aliensLength].view.position.x, this.aliens[aliensLength].view.position.y);
      if(distance < 10){
        console.log('colide :(');
      }
    }
  }
  // End Colision GrandMa


}

module.exports = Game;
