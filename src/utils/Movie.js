var PIXI = require('pixi.js');

var Movie = function() {
  this.view = new PIXI.DisplayObjectContainer();
  this.image = new PIXI.Sprite();
  this.scenes = {};
  this.currentScene = null;
  this.currentTexture = null;
  this.currentSceneId = '';
  this.view.addChild(this.image);
}

Movie.prototype.addScene = function(id, speed, mode, to, actions) {
  var scene = {};
  scene.id = id;
  scene.speed = speed;
  scene.mode = mode;
  scene.to = to;
  this.scenes[id] = scene;

  var frames = [];

  for (var f in PIXI.TextureCache) {
    if (f.match(id)) {
      var frame = PIXI.TextureCache[f];
      frame.name = f;
      frames.push(frame);
    }
  }

  frames.sort(function (a,b) {
    return a.name.localeCompare(b.name);
  });

  scene.frames = frames;
  scene.position = 0;
  scene.totalFrames = scene.frames.length;
  scene.actions = actions;
}

Movie.prototype.play = function (id) {
  if (this.currentSceneId == id) return;
  this.currentSceneId = id;
  var scene = this.scenes[id];
  scene.position = 0;
  this.currentScene = scene;
}

Movie.prototype.update = function() {
  if (!this.currentScene) return;
  var scene = this.currentScene;
  var index = Math.floor(scene.position);
  var texture = scene.frames[index];

  if (this.currentTexture != texture) {
    if (scene.actions) this.checkActions(scene, index);
    this.image.setTexture(texture);
  }

  scene.position += scene.speed;
  if (scene.position >= scene.totalFrames) {
    if (scene.mode == Movie.LOOP) {
      scene.position = 0;
    } else {
      scene.position = scene.totalFrames - 1;
      if (scene.to) this.play(scene.to);
    }
  }
}

Movie.prototype.checkActions = function(scene, index) {
  if (!scene.actions) return;
  var i = scene.actions.length;
  while (i--) {
    var a = scene.actions[i];
    if (a.frame == index) {
      a.action();
    }
  }
}

Movie.ONCE = 0;
Movie.LOOP = 1;

module.exports = Movie;
