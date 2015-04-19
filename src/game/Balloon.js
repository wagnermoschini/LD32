var PIXI = require('pixi.js');
var Config = require('../Config');
var Icon = require('./Icon');

var Balloon = function() {
	this.view = new PIXI.DisplayObjectContainer();
	this.bases = [];	
	this.icons = [];
	this.demands = [];

	for (var i = 0; i < 3; i++) {
		var frame = 'balloon_' + (i + 1) + '.png';
		var base = PIXI.Sprite.fromFrame(frame);
		base.anchor.x = 0.5;
		base.anchor.y = 0.5;
		base.visible = false;
		this.view.addChild(base);
		this.bases[i] = base;
	}

	var i = Config.demandMaxLength;
	while (i--) {
		var icon = new Icon();
		this.icons[i] = icon;
		this.view.addChild(icon.view);
	}
};

Balloon.prototype.updateDemands = function(demands) {
	if (demands) this.demands = demands;

	var i = this.bases.length;
	while (i--) {
		var visible = i == (this.demands.length - 1);
		this.bases[i].visible = visible;	
	}

	var spacing = 11;
	var offset = (this.demands.length - 1)*spacing/2;
	var i = this.icons.length;
	
	while (i--) {
		var icon = this.icons[i];
		icon.setType(this.demands[i]);
		icon.view.position.x = i*spacing - offset;
	}
} 

Balloon.prototype.removeDemand = function(type) {
	var demandIndex = this.demands.indexOf(type);
	this.demands.splice(demandIndex, 1);
	this.updateDemands();
}

Balloon.prototype.dispose = function() {
	var i = this.icons.length;
	while (i--) {
		this.icons[i].dispose();
	}
	this.icons[i] = null;

	if (this.view.parent) this.view.parent.removeChild(this);
	this.view = null;
}

module.exports = Balloon;