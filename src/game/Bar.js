var PIXI = require('pixi.js');

var Bar = function() {
	// this.view = PIXI.Sprite.fromFrame('grandma.png');
	// this.view.anchor.x = 0.5;
	// this.view.anchor.y = 0.5;

  this.view = new PIXI.DisplayObjectContainer();
  this.view.position.x = -53;
  this.view.position.y = -(LAYOUT.screenSize.h/LAYOUT.scale/2) + 20;

  this.base = new PIXI.Graphics();
  this.base.beginFill(0x000000);
  this.base.drawRect(0,0,106,16);
  this.base.endFill();
  this.view.addChild(this.base);

  this.bar = new PIXI.Graphics();
  this.bar.beginFill(0xffff00);
  this.bar.drawRect(0,0,100,10);
  this.bar.endFill();
  this.bar.position.x = 3;
  this.bar.position.y = 3;
  this.view.addChild(this.bar);

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
