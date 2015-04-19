var PIXI = require('pixi.js');
var Game = require('./game/Game');

var Layout = function() {
  this.screenSize = {w:0, h:0};
  this.worldSize = {w:0, h:0};
}

var App = function() {

  PIXI.scaleModes.DEFAULT = PIXI.scaleModes.NEAREST;

  var layout = new Layout();
  layout.screenSize.w = 700;
  layout.screenSize.h = 400;
  layout.worldSize.w = 700;
  layout.worldSize.h = 400;
  this.layout = layout;

  var requestAnimationFrame = window.requestAnimationFrame;
  var stage = new PIXI.Stage();
  var renderer = PIXI.autoDetectRenderer(layout.screenSize.w, layout.screenSize.h);
  var container = new PIXI.DisplayObjectContainer();
  var game = null;
  var assetLoader = null;
  var scale = 1;


  function init() {

    document.body.appendChild(renderer.view);
    stage.addChild(container);

    container.scale.x = scale;
    container.scale.y = scale;
    renderer.scaledWidth = renderer.width/ scale;
    renderer.scaledHeight = renderer.height/ scale;

    setInterval(update, 1000/60);
    update();
    render();
    load();
  }

  function load() {
    assetLoader = new PIXI.AssetLoader(['data/textures.json']);
    assetLoader.onComplete = start;
    assetLoader.load();
  }

  function start() {
    console.log('start');
    game = new Game(renderer.scaledWidth);
    game.view.position.x = renderer.scaledWidth/2;
    game.view.position.y = renderer.scaledHeight/2;
    container.addChild(game.view);
  }

  function update() {
    if(game) game.update();
  }

  function render() {
      renderer.render(stage);
      requestAnimationFrame(render);
  }

  init();
};

module.exports = App;
