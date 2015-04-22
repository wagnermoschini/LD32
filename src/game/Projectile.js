var PIXI = require('pixi.js');
var Config = require('../Config');

var Projectile = function() {
  this.view = new PIXI.DisplayObjectContainer();
  this.image = PIXI.Sprite.fromFrame('cupcake.png');
  this.image.anchor.x = 0.5;
  this.image.anchor.y = 0.5;
  this.frames = [];
  this.velocity = 0;
  this.eaten = false;
  this.recipe = null;

  this.view.addChild(this.image);

  var i = Config.recipes.length;
  while (i--) {
    var frameId = Config.recipes[i].id + '.png';
    var frame = PIXI.Texture.fromFrame(frameId);
    this.frames[i] = frame;
  }
}

Projectile.prototype.spawn = function(recipe, position, velocity) {
  var index = Config.recipes.indexOf(recipe);
  this.recipe = recipe;
  this.image.setTexture(this.frames[index]);
  this.view.position.x = position.x;
  this.view.position.y = position.y;
  this.velocity = velocity;
}

Projectile.prototype.update = function() {
  this.view.position.x += this.velocity;
}

Projectile.prototype.dispose = function() {
  if (this.view.parent) this.view.parent.removeChild(this.view);
  this.recipe = null;
  this.view = null;
}

module.exports = Projectile;
