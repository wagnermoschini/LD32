var PIXI = require('pixi.js');
var Config = require('../Config');

var Icon = function() {
	this.view = new PIXI.DisplayObjectContainer();
	this.images = [];
	this.type = '';

	var i = Config.recipes.length;
	while (i--) {
		var frame = 'icon_' + Config.recipes[i] + '.png';
		var img = PIXI.Sprite.fromFrame(frame);
		img.anchor.x = 0.5;
		img.anchor.y = 0.5;
		img.visible = false;
		this.view.addChild(img);
		this.images[i] = img;
	}
};

Icon.prototype.setType = function(type) {
	if (this.type == type) return;
	this.type = type;
	var i = this.images.length;
	var typeIndex = Config.recipes.indexOf(type);
	while (i--) {
		this.images[i].visible = i == typeIndex;
	}
}

Icon.prototype.dispose = function() {
	if (this.view.parent) this.view.parent.removeChild(this);
	this.view = null;
}

module.exports = Icon;
