var PIXI = require('pixi.js');

var Alien = function(x) {
	this.view = PIXI.Sprite.fromFrame('alien.png');
	this.view.anchor.x = 0.5;
	this.view.anchor.y = 0.5;

  this.view.position.x = x;


}

Alien.prototype.update = function(){

  this.view.position.x--;
}

module.exports = Alien;
