var PIXI = require('pixi.js');
var Config = require('../Config');
var Grandma = require('./Grandma');
var Projectile = require('./Projectile');
var Alien = require('./Alien');
var Time = require('./Time');
var Bar = require('./Bar');
var TouchArea = require('./TouchArea');

var Game = function() {
  this.view = new PIXI.DisplayObjectContainer();

  //range defines the aliens summon origin
  this.range = Config.layout.worldSize.w/2;

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


  this.summonTime = 480;
  this.frame = 0;
  this.grandma.view.position.y = this.ground;

  this.power = 0;
  this.powerCoef = 0.005;

  // if (Config.debug) {
  //   this.summonTime = 30;
  //   this.summonAlien();
  // }
};

Game.prototype.summonAlien = function(){
  var direction = Math.random() < .5 ? 1 : -1;
  var alien = new Alien(direction, this.range);

  alien.view.position.y = this.ground;
  this.aliens.push(alien);
  this.view.addChild( this.aliens[this.aliens.length - 1].view );
}

Game.prototype.shoot = function() {
  var projectile = new Projectile();
  this.projectiles.push(projectile);
  this.view.addChild(projectile.view);
  projectile.spawn(this.grandma.view.position, 'cupcake', 2);
}


// UPDATE
Game.prototype.update = function() {
  this.time.update();
  this.frame += 1;

  this.grandma.update(this.touchArea.getSide());

  // this.bar.update();

  // if(this.frame % this.summonTime === 0){
  //   this.summonAlien();
  // }
  //
  // if(this.aliens.length > 0){
  //   for(var i = 0, len = this.aliens.length; i < len; i++){
  //     this.aliens[i].update();
  //   }
  // }

  if(this.touchArea.down){
    this.power += this.powerCoef;
    this.bar.update(this.power);
  }

  if(this.touchArea.up){
    this.power = 0;
    this.bar.update(this.power);
    this.touchArea.setUp(false);
  }

  if (this.frame%50 === 0) this.shoot();

  var i = this.projectiles.length;
  while (i--) {
    this.projectiles[i].update();
  }
}

module.exports = Game;
