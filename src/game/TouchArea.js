var PIXI = require('pixi.js');
var Config = require('../Config');

var TouchArea = function() {

  this.down = false;
  this.up = false;

  this.view = new PIXI.DisplayObjectContainer();
  this.view.width = (Config.layout.screenSize.h/Config.layout.scale);
  this.view.height = (Config.layout.screenSize.w/Config.layout.scale);

  this.eventArea = new PIXI.Graphics();
  this.eventArea.beginFill(0xFF0000);
  this.eventArea.alpha = 0;
  this.eventArea.drawRect(0,0, (Config.layout.screenSize.w/Config.layout.scale),(Config.layout.screenSize.h/Config.layout.scale));
  this.eventArea.endFill();


  this.view.hitArea = this.eventArea;

  this.view.addChild(this.eventArea);
  this.view.position.y = -(Config.layout.screenSize.h/Config.layout.scale/2);
  this.view.position.x = -(Config.layout.screenSize.w/Config.layout.scale/2);

  this.view.interactive = true;

  // Private Methods
  this.view.mousedown = function(event){
    this.down = true;
    this.up = false;
  }.bind(this);

  this.view.mouseup = function(event){
    this.down = false;
    this.up = true;
  }.bind(this);

  this.view.touchstart = function(event){
    this.down = true;
    this.up = false;
  }.bind(this);

  this.view.touchend = function(event){
    this.down = false;
    this.up = true;
  }.bind(this);

}

TouchArea.prototype.setUp = function(bool){
  this.up = bool;
}
module.exports = TouchArea;
