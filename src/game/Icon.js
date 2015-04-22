var PIXI = require('pixi.js');
var Config = require('../Config');

var Icon = function() {
	this.view = new PIXI.DisplayObjectContainer();
	this.images = {};
	this.type = '';

	var i = Config.recipes.length;
	while (i--) {
		var recipe = Config.recipes[i];
		var frame = 'icon_' + recipe.id + '.png';
		var img = PIXI.Sprite.fromFrame(frame);
		img.anchor.x = 0.5;
		img.anchor.y = 0.5;
		img.visible = false;
		this.view.addChild(img);
		this.images[recipe.id] = img;
	}
};

Icon.prototype.setType = function(type) {
	if (this.type == type) return;
	this.type = type;
	for (var f in this.images) {
		this.images[f].visible = f === type;
	}
}

Icon.prototype.dispose = function() {
	if (this.view.parent) this.view.parent.removeChild(this);
	this.view = null;
}

module.exports = Icon;
