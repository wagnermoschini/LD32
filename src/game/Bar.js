var PIXI = require('pixi.js');

var Bar = function() {
	// this.view = PIXI.Sprite.fromFrame('grandma.png');
	// this.view.anchor.x = 0.5;
	// this.view.anchor.y = 0.5;

  this.view = new PIXI.DisplayObjectContainer();
  

  this.base = new PIXI.Graphics();
  this.base.beginFill(0xffffff);
  this.base.drawRect(0,0,100,10);
  this.base.endFill();
  this.view.addChild(this.base);

  this.bar = new PIXI.Graphics();
  this.bar.beginFill(0xFF0000);
  this.bar.drawRect(0,0,100,10);
  this.bar.endFill();
  this.view.addChild(this.bar);

  this.bar.scale.x = 0;
}

Bar.prototype.update = function(){
  if(this.view.bar.scale.x < 100){
    this.view.bar.scale.x += 1;
  }

}



module.exports = Bar;
