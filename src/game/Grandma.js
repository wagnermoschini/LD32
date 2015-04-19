var PIXI = require('pixi.js');

var Grandma = function() {
	this.view = PIXI.Sprite.fromFrame('grandma.png');
	this.view.anchor.x = 0.5;
	this.view.anchor.y = 0.5;
}

Grandma.prototype.update = function(direction){
	if(direction === 'left'){
		this.view.scale.x = -1;
	} else {
		this.view.scale.x = 1;
	}
}

module.exports = Grandma;
