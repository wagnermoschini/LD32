var PIXI = require('pixi.js');
var Movie = require('../utils/Movie');

var Grandma = function() {
	this.view = new PIXI.DisplayObjectContainer();

	this.movie = new Movie();
	this.movie.view.position.x = -16;
	this.movie.view.position.y = -16;
	this.view.addChild(this.movie.view);

	this.movie.addScene('idle', 0.2, Movie.LOOP);
	this.movie.addScene('charging', 0.2, Movie.LOOP);
	this.movie.addScene('shoot', 0.1, Movie.ONCE, 'idle');
	this.movie.addScene('dead', 0.1, Movie.LOOP);
	this.movie.play('idle');
	this.dead = false;
}

Grandma.prototype.update = function(direction, charging, shoot){

	if (!this.dead) {
		if(direction === 'left'){
			this.view.scale.x = -1;
		} else {
			this.view.scale.x = 1;
		}

		if (charging) {
			this.movie.play('charging');
		}

		if (!charging && this.movie.currentSceneId == 'charging') {
			if (shoot) {
				this.movie.play('shoot');
			} else {
				this.movie.play('idle');
			}

		}
	}

	this.movie.update();
}

Grandma.prototype.die = function() {
	this.dead = true;
	this.movie.play('dead');
}

module.exports = Grandma;
