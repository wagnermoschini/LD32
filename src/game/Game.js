var PIXI = require('pixi.js');
var Grandma = require('./Grandma');

var Game = function(container) {
  this.view = new PIXI.DisplayObjectContainer();
  
  this.scenario = PIXI.Sprite.fromFrame('scenario.png');
  this.alien = PIXI.Sprite.fromFrame('alien.png');
  this.grandma = new Grandma();

  this.view.addChild(this.scenario);
  this.view.addChild(this.grandma.view);
  this.view.addChild(this.alien);

  this.scenario.anchor.x = 0.5;
  this.scenario.anchor.y = 0.5;

  this.alien.anchor.x = 0.5;
  this.alien.anchor.y = 0.5;

  this.time = 0;
};

Game.prototype.update = function() {
  this.alien.position.x = Math.sin(this.time*0.05)*30;
  this.alien.position.y = Math.cos(this.time*0.05)*30;
  this.time += 1;
}

module.exports = Game;
