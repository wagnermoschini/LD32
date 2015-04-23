var PIXI = require('pixi.js');
var Movie = require('../utils/Movie');

var Grandma = function() {
	this.view = new PIXI.DisplayObjectContainer();

	this.movie = new Movie();
	this.movie.view.position.x = -16;
	this.movie.view.position.y = -16;
	this.view.addChild(this.movie.view);

	this.movie.addScene('grandma_idle', 0.2, Movie.LOOP);
	this.movie.addScene('grandma_charging', 0.2, Movie.LOOP);
	this.movie.addScene('grandma_shoot', 0.1, Movie.ONCE, 'grandma_idle');
	this.movie.addScene('grandma_dead', 0.1, Movie.LOOP);
	this.movie.addScene('grandma_ghost', 0.1, Movie.LOOP);
	this.movie.play('grandma_idle');
	this.dead = false;
}

Grandma.prototype.update = function(direction, charging, shoot){
	if (this.dead) {
		this.view.position.y -= 1;
	}


	if (!this.dead) {
		if(direction === 'left'){
			this.view.scale.x = -1;
		} else {
			this.view.scale.x = 1;
		}

		if (charging) {
			this.movie.play('grandma_charging');
		}

		if (!charging && this.movie.currentSceneId == 'grandma_charging') {
			if (shoot) {
				this.movie.play('grandma_shoot');
			} else {
				this.movie.play('grandma_idle');
			}

		}
	}

	this.movie.update();
}

Grandma.prototype.beEaten = function() {
	this.movie.play('grandma_ghost');
	this.die();
}

Grandma.prototype.die = function() {
	this.dead = true;
}

module.exports = Grandma;
