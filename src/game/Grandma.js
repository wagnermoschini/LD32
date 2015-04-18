var PIXI = require('pixi.js');

var Grandma = function() {
	this.view = PIXI.Sprite.fromFrame('grandma.png');
	this.view.anchor.x = 0.5;
	this.view.anchor.y = 0.5;
}

module.exports = Grandma;
