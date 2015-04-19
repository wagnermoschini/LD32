var PIXI = require('pixi.js');
var Game = require('./game/Game');

var App = function() {

  PIXI.scaleModes.DEFAULT = PIXI.scaleModes.NEAREST;

  var requestAnimationFrame = window.requestAnimationFrame;
  var stage = new PIXI.Stage();
  var renderer = PIXI.autoDetectRenderer(700, 400);
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
