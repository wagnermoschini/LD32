var PIXI = require('pixi.js');
var Grandma = require('./Grandma');
var Alien = require('./Alien');
var Time = require('./Time');
var Bar = require('./Bar');

var Game = function(w) {
  this.view = new PIXI.DisplayObjectContainer();

  //range defines the aliens summon origin
  this.range = w/2;

  this.scenario = PIXI.Sprite.fromFrame('scenario.png');
  // this.alien =  new Alien('left',this.range);
  this.aliens = [];
  this.grandma = new Grandma();
  this.time = new Time();
  this.bar = new Bar();

  this.view.addChild(this.scenario);
  this.view.addChild(this.grandma.view);
  this.view.addChild(this.bar.view);

  this.scenario.anchor.x = 0.5;
  this.scenario.anchor.y = 0.5;

  this.summonTime = 240;
  this.frame = 0;
};

Game.prototype.summonAlien = function(){
  var direction = ( Math.round( Math.random() ) ) ? "left":"right";

  this.aliens.push(new Alien(direction,this.range));
  this.view.addChild( this.aliens[this.aliens.length - 1].view );
}

Game.prototype.update = function() {
  this.time.update();
  this.frame += 1;

  if(this.frame % this.summonTime === 0){
    this.summonAlien();
  }

  if(this.aliens.length > 0){
    for(var i = 0, len = this.aliens.length; i < len; i++){
      this.aliens[i].update();
    }
  }
}


module.exports = Game;
