var PIXI = require('pixi.js');
var Config = require('../Config');

var Projectile = function(type) {
  this.view = new PIXI.DisplayObjectContainer();
  this.image = PIXI.Sprite.fromFrame('cupcake.png');
  this.image.anchor.x = 0.5;
  this.image.anchor.y = 0.5;
  this.type = '';
  this.frames = [];
  this.speed = 0;

  this.view.addChild(this.image);

  var i = Config.recipes.length;
  while (i--) {
    var frameId = Config.recipes[i] + '.png';
    var frame = PIXI.Texture.fromFrame(frameId);
    this.frames[i] = frame;
  }

  this.setType(type);
}

Projectile.prototype.setType = function(value) {
  this.type = value;
  var index = Config.recipes.indexOf(value);
  this.image.setTexture(this.frames[index]);
}

Projectile.prototype.update = function() {
  this.view.position.x += this.speed;
}

Projectile.prototype.dispose = function() {

}

module.exports = Projectile;
