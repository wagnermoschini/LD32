var PIXI = require('pixi.js');
var Config = require('../Config');
var Button = require('./Button');

var Intro = function() {
  this.view = new PIXI.DisplayObjectContainer();

  var size = Config.layout.worldSize;

  this.bg = new PIXI.Graphics();
  this.bg.beginFill(0xFFcc00);
  this.bg.drawRect(-size.w/2, -size.h/2, size.w, size.h);
  this.bg.endFill();
  this.view.addChild(this.bg);

  this.btnPlay = new Button('play');
  this.view.addChild(this.btnPlay.view);
  this.view.visible = false;
}

Intro.prototype.show = function() {
  this.view.visible = true;
}

Intro.prototype.hide = function() {
  this.view.visible = false;
}

module.exports = Intro;
