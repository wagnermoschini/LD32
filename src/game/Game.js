var PIXI = require('pixi.js');
var Grandma = require('./Grandma');
var Alien = require('./Alien');
var Timer = require('./Time');

var Game = function(w) {


  this.view = new PIXI.DisplayObjectContainer();

  //range defines the aliens summon origin
  this.range = w/2;

  this.scenario = PIXI.Sprite.fromFrame('scenario.png');
  this.alien =  new Alien(w/2);
  this.aliens = [];
  this.grandma = new Grandma();
  this.time = new Timer(0);

  this.view.addChild(this.scenario);
  this.view.addChild(this.grandma.view);
  this.view.addChild(this.alien.view);

  this.scenario.anchor.x = 0.5;
  this.scenario.anchor.y = 0.5;
};

Game.prototype.update = function() {
  this.time.update();

  this.alien.update(this.time.get());
}

module.exports = Game;
