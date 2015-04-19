var Timer = function(time) {
	this.timer = time;
  console.log(time);
}

Timer.prototype.update = function(){
  this.timer += 1;
}

Timer.prototype.get = function(){
  return this.timer;
}

module.exports = Timer;
