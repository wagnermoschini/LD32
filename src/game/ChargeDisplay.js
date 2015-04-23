var PIXI = require('pixi.js');
var Config = require('../Config');
var Icon = require('./Icon');

var ChargeDisplay = function() {
  this.view = new PIXI.DisplayObjectContainer();
  this.icon = new Icon();
  this.view.addChild(this.icon.view);
  this.icon.view.scale.x = 4;
  this.icon.view.scale.y = 4;
  this.currentRecipe = null;
}

ChargeDisplay.prototype.update = function(power) {
  var recipe = Config.getRecipeByPower(power);
  this.icon.setType(recipe ? recipe.id : '');

  var range = 20;
  var ease = 0.05;
  if (this.currentRecipe != recipe) {
    this.icon.view.position.y = range;
    this.icon.view.alpha = 0.2;
  } else {
    var mov = (this.icon.view.position.y)*ease;
    if (mov > 0.4) mov = 0.4;
    this.icon.view.position.y -= mov;
    this.icon.view.alpha -= (this.icon.view.alpha - 0.7)*ease;
  }

  this.currentRecipe = recipe;

  // if (!recipe) return;
  // var index = Config.recipes.indexOf(recipe);
  // var nextRecipe = Config.recipes[index + 1];
  // var powerRatio = recipe.powerRatio;
  // var nextPowerRatio = nextRecipe ? nextRecipe.powerRatio : 1;
  // var powerLength = nextPowerRatio - powerRatio;
  // var rate = (power - powerRatio)/powerLength;
  // var movRange = 10;
  // this.view.position.y = movRange/2 - movRange*rate;
}

module.exports = ChargeDisplay;
