var PIXI = require('pixi.js');
var Config = require('../Config');
var Icon = require('./Icon');
var Box = require('../ui/Box');
var Math2 = require('../utils/Math2');

var Bar = function() {
  this.view = new PIXI.DisplayObjectContainer();
  this.view.position.y = -Config.layout.screenSize.h/Config.layout.scale/2 + 44;

  this.base = PIXI.Sprite.fromFrame('bar_base.png');
  this.base.position.x = -40;
  this.base.position.y = -7;
  this.view.addChild(this.base);

  this.bar = PIXI.Sprite.fromFrame('bar_filling.png');
  this.bar.position.x = -37;
  this.bar.position.y = -4;
  this.view.addChild(this.bar);

  this.cover = PIXI.Sprite.fromFrame('bar_cover.png');
  this.cover.position.x = -40;
  this.cover.position.y = -7;
  this.view.addChild(this.cover);

  this.icon = new Icon();
  this.icon.setType('');
  this.icon.view.scale.x = 2;
  this.icon.view.scale.y = 2;
  this.view.addChild(this.icon.view);

  this.bar.scale.x = 0;
}

Bar.prototype.update = function(val){
  var ratio = Math2.clamp(val, 0, 1);
  var recipe = Config.getRecipeByPower(ratio);

  this.bar.scale.x = ratio;
  this.icon.setType(recipe ? recipe.id : '');

  this.icon.view.position.x = this.bar.position.x + 74*ratio;
  this.icon.view.position.y = -1;
}

Bar.prototype.getState = function(ratio){

  if(ratio >= .8){
    return 2;
  }
  if(ratio >= .4){
    return 1;
  }
  if(ratio >= .1){
    return 0;
  }
  return -1;

}

module.exports = Bar;
