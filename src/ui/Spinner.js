var PIXI = require('pixi.js');

var Spinner = function() {
  this.view = PIXI.Sprite.fromImage('data/spinner.png');
  this.view.anchor.x = 0.5;
  this.view.anchor.y = 0.5;
  this.view.visible = false;
}

Spinner.prototype.update = function() {
  if (!this.view.visible) return;
  this.view.rotation += 0.1;
}

Spinner.prototype.show = function() {
  this.view.visible = true;
}

Spinner.prototype.hide = function() {
  this.view.visible = false;
}

module.exports = Spinner;
