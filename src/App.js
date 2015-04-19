var PIXI = require('pixi.js');
var Config = require('./Config');
var Intro = require('./ui/Intro');
var Game = require('./game/Game');

var App = function() {

  PIXI.scaleModes.DEFAULT = PIXI.scaleModes.NEAREST;

  var requestAnimationFrame = window.requestAnimationFrame;
  var stage = new PIXI.Stage();
  var renderer = PIXI.autoDetectRenderer(Config.layout.screenSize.w, Config.layout.screenSize.h);
  var container = new PIXI.DisplayObjectContainer();
  var intro = null;
  var game = null;
  var assetLoader = null;

  function init() {

    document.body.appendChild(renderer.view);
    stage.addChild(container);

    container.scale.x = Config.layout.scale;
    container.scale.y = Config.layout.scale;
    renderer.scaledWidth = renderer.width/Config.layout.scale;
    renderer.scaledHeight = renderer.height/Config.layout.scale;

    setInterval(update, 1000/60);
    update();
    render();
    load();
  }

  function load() {
    assetLoader = new PIXI.AssetLoader(['data/textures.json']);
    assetLoader.onComplete = onLoadComplete;
    assetLoader.load();
  }

  function onLoadComplete() {
    // openIntro();
    initGame();
  }

  function openIntro() {
    destroyGame();
    if (!intro) intro = new Intro();
    intro.view.position.x = renderer.scaledWidth/2;
    intro.view.position.y = renderer.scaledHeight/2;
    container.addChild(intro.view);
    intro.show();
    intro.btnPlay.onPress = function() {
      intro.hide();
      initGame();
    };
  }

  function initGame() {
    if (game) return;
    game = new Game(renderer.scaledWidth);
    game.view.position.x = renderer.scaledWidth/2;
    game.view.position.y = renderer.scaledHeight/2;
    container.addChild(game.view);
  }

  function destroyGame() {
    if (!game) return;
    container.removeChild(game.view);
    game.dispose();
    game = null;
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
