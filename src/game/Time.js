var Timer = function(time) {
	this.timer = time;
}

Timer.prototype.update = function(){
  this.timer += 1;
}

Timer.prototype.get = function(){
  return this.time;
}

module.exports = Timer;
