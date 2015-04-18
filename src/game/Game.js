var PIXI = require('pixi.js');
var Grandma = require('./Grandma');
var Alien = require('./Alien');

var Game = function(container) {
  this.view = new PIXI.DisplayObjectContainer();

  this.scenario = PIXI.Sprite.fromFrame('scenario.png');
  this.alien =  new Alien();
  this.aliens = [];
  this.grandma = new Grandma();

  this.view.addChild(this.scenario);
  this.view.addChild(this.grandma.view);
  this.view.addChild(this.alien.view);

  this.scenario.anchor.x = 0.5;
  this.scenario.anchor.y = 0.5;

  this.time = 0;
};

Game.prototype.update = function() {

  this.time += 1;
  this.alien.update(this.time);
}

module.exports = Game;
