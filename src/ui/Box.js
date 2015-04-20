var PIXI = require('pixi.js');

var Box = function() {
  this.view = new PIXI.DisplayObjectContainer();

  // this.base = PIXI.Sprite.fromFrame('box_base.png');
  // this.base.anchor.x = 0.5;
  // this.base.anchor.y = 0.5;
  // this.view.addChild(this.base);

  this.container = new PIXI.DisplayObjectContainer();
  this.view.addChild(this.container);

  this.cover = PIXI.Sprite.fromFrame('box_cover.png');
  this.cover.anchor.x = 0.5;
  this.cover.anchor.y = 0.5;
  this.view.addChild(this.cover);
  this.cover.alpha = 0.1;

  this.content = null;
}

Box.prototype.setContent = function(content) {
  if (this.content) this.container.removeChild(this.content);
  this.content = content;
  if (this.content) this.container.addChild(this.content);
}

Box.prototype.dispose = function() {
  this.setContent(null);
  if (this.view.parent) this.view.parent.removeChild(this);
  this.view = null;
}

module.exports = Box;
