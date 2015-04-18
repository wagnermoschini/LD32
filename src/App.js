var PIXI = require('pixi.js');
var Game = require('./game/Game');

var App = function() {
  var requestAnimationFrame = window.requestAnimationFrame;
  var stage = new PIXI.Stage();
  var renderer = PIXI.autoDetectRenderer(1000, 600);
  var container = new PIXI.DisplayObjectContainer();
  var game = new Game();

  function init() {
    document.body.appendChild(renderer.view);
    stage.addChild(container);
    container.addChild(game.view);

    setInterval(update, 1000/60);
    update();
    render();
  }

  function update() {
    if (game) game.update();
  }

  function render() {
      renderer.render(stage);
      requestAnimationFrame(render);
  }

  init();
};

module.exports = App;
