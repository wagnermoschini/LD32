var PIXI = require('pixi.js');
var Config = require('./Config');
var Spinner = require('./ui/Spinner');
var Intro = require('./ui/Intro');
var Over = require('./ui/Over');
var Game = require('./game/Game');

var App = function() {

  PIXI.scaleModes.DEFAULT = PIXI.scaleModes.NEAREST;

  var requestAnimationFrame = window.requestAnimationFrame;
  var stage = new PIXI.Stage();
  var renderer = PIXI.autoDetectRenderer(Config.layout.screenSize.w, Config.layout.screenSize.h);
  var container = new PIXI.DisplayObjectContainer();
  var intro = null;
  var over = null;
  var game = null;
  var assetLoader = null;
  var spinner = new Spinner();

  function init() {

    document.body.appendChild(renderer.view);
    stage.addChild(container);

    renderer.scaledWidth = renderer.width/Config.layout.scale;
    renderer.scaledHeight = renderer.height/Config.layout.scale;

    container.scale.x = Config.layout.scale;
    container.scale.y = Config.layout.scale;
    container.position.x = renderer.width/2;
    container.position.y = renderer.height/2;

    container.addChild(spinner.view);
    spinner.show();

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
    container.removeChild(spinner);
    spinner = null;

    openIntro();
    // initGame();
  }

  function openIntro() {
    destroyGame();
    if (!intro) intro = new Intro();
    container.addChild(intro.view);
    intro.show();
    intro.btnPlay.onPress = function() {
      intro.hide();
      initGame();
    };
  }

  function openGameOver(){
    destroyGame();
    console.log('oi');
    if (!over) over = new Over();
    over.show();
    over.btnPlay.onPress = function() {
      over.hide();
      initGame();
    };
  }

  function initGame() {
    if (game) return;
    game = new Game(renderer.scaledWidth);
    container.addChild(game.view);
  }

  function destroyGame() {
    if (!game) return;
    container.removeChild(game.view);
    game = null;
  }

  function update() {
    if (spinner) spinner.update();
    if (intro) intro.update();
    if(game){
      game.update();
      if(game.onGameOver){
        openIntro();
      }
    }
  }

  function render() {
      renderer.render(stage);
      requestAnimationFrame(render);
  }

  init();
};

module.exports = App;
