var PIXI = require('pixi.js');

var Icon = function(type) {
	this.view = PIXI.Sprite.fromFrame('icon_' + type + '.png');
	this.view.anchor.x = 0.5;
	this.view.anchor.y = 0.5;
};

module.exports = Icon;