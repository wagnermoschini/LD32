var PIXI = require('pixi.js');

var Button = function(type, onPress) {
  this.view = new PIXI.DisplayObjectContainer();

  this.base = PIXI.Sprite.fromFrame('button_base.png');
  this.base.anchor.x = 0.5;
  this.base.anchor.y = 0.5;
  this.view.addChild(this.base);

  this.icon = PIXI.Sprite.fromFrame('button_icon_play.png');
  this.icon.anchor.x = 0.5;
  this.icon.anchor.y = 0.5;
  this.view.addChild(this.icon);

  this.cover = PIXI.Sprite.fromFrame('button_cover.png');
  this.cover.anchor.x = 0.5;
  this.cover.anchor.y = 0.5;
  this.cover.interactive = true;
  this.view.addChild(this.cover);

  this.setType(type);
  this.onPress = onPress;

  var self = this;
  this.cover.click = this.cover.tap = function() {
    if (self.onPress) self.onPress(this);
  }
}

Button.prototype.setType = function(value) {
  this.type = value;
  var texture = PIXI.Texture.fromFrame('button_icon_' + value + '.png');
  this.icon.setTexture(texture);
}

Button.prototype.show = function() {

}

Button.prototype.hide = function() {

}

module.exports = Button;
