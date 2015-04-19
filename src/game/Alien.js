var PIXI = require('pixi.js');

var Alien = function( direction, rangeX ) {

  this.direction = direction;
  this.range = rangeX;

  this.view = PIXI.Sprite.fromFrame('alien.png');
	this.view.anchor.x = 0.5;
	this.view.anchor.y = 0.5;


  if(this.direction === 'left'){
    this.view.scale.x = -1;
    this.view.position.x = -rangeX;
  } else {
    this.view.position.x = rangeX;
  }

}

Alien.prototype.update = function(){

  if(this.direction === 'left'){
    this.view.position.x += 1;
  } else {
    this.view.position.x -= 1;
  }

}

module.exports = Alien;
