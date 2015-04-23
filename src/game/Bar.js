var PIXI = require('pixi.js');
var Config = require('../Config');
var Icon = require('./Icon');
var Box = require('../ui/Box');
var Math2 = require('../utils/Math2');

var Bar = function() {
  this.view = new PIXI.DisplayObjectContainer();
  this.view.position.y = Config.layout.screenSize.h/Config.layout.scale/2 - 20;

  this.base = PIXI.Sprite.fromFrame('bar_base.png');
  this.base.position.x = -40;
  this.base.position.y = -7;
  this.view.addChild(this.base);

  this.bar = PIXI.Sprite.fromFrame('bar_filling.png');
  this.bar.position.x = -37;
  this.bar.position.y = -4;
  this.view.addChild(this.bar);

  this.cover = PIXI.Sprite.fromFrame('bar_cover.png');
  this.cover.position.x = -40;
  this.cover.position.y = -7;
  this.view.addChild(this.cover);

  this.bar.scale.x = 0;
}

Bar.prototype.update = function(power){
  this.bar.scale.x = power;
}

module.exports = Bar;
