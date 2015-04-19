var PIXI = require('pixi.js');
var Icon = require('./Icon');

var Balloon = function() {
	this.view = new PIXI.DisplayObjectContainer();
	this.bases = [];	
	this.icons = [];

	for (var i = 0; i < 3; i++) {
		var index = i + 1;
		var frame = 'balloon_' + index + '.png';
		var base = PIXI.Sprite.fromFrame(frame);
		base.anchor.x = 0.5;
		base.anchor.y = 0.5;
		this.bases.push(base);
		this.view.addChild(base);
		base.visible = false;
	}
};

Balloon.prototype.setup = function(iconTypes) {
	var i = this.bases.length;
	this.bases[iconTypes.length - 1].visible = true;

	var len = iconTypes.length;
	var spacing = 11;
	var offset = (len - 1)*spacing/2;
	for (var i = 0; i < len; i++) {
		var icon = new Icon(iconTypes[i]);
		icon.view.position.x = i*spacing - offset;
		this.view.addChild(icon.view);
		this.icons.push(icon);
	}
} 

module.exports = Balloon;