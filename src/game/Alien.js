var PIXI = require('pixi.js');

var Alien = function() {
	this.view = PIXI.Sprite.fromFrame('alien.png');
	this.view.anchor.x = 0.5;
	this.view.anchor.y = 0.5;
}

Alien.prototype.update = function(time){

  this.view.position.x = Math.sin(time*0.05)*30;
  this.view.position.y = Math.cos(time*0.05)*30;
}

module.exports = Alien;
