var PIXI = require('pixi.js');
var Config = require('../Config');

var Bar = function() {
	// this.view = PIXI.Sprite.fromFrame('grandma.png');
	// this.view.anchor.x = 0.5;
	// this.view.anchor.y = 0.5;

  this.view = new PIXI.DisplayObjectContainer();
  this.view.position.y = -(Config.layout.screenSize.h/Config.layout.scale/2) + 20;

  this.base = PIXI.Sprite.fromFrame('bar_base.png');
  this.base.position.x = -50;
  this.base.position.y = -8;
  this.view.addChild(this.base);

  this.bar = PIXI.Sprite.fromFrame('bar_filling.png');
  this.bar.position.x = -49;
  this.bar.position.y = -7;
  this.view.addChild(this.bar);

  this.cover = PIXI.Sprite.fromFrame('bar_cover.png');
  this.cover.position.x = -50;
  this.cover.position.y = -8;
  this.view.addChild(this.cover);

  this.bar.scale.x = 0;

}

Bar.prototype.update = function(){

  if(this.bar.scale.x < 1){
    this.bar.scale.x += 0.005;
  } else {
    this.bar.scale.x = 1;
  }
}



module.exports = Bar;
