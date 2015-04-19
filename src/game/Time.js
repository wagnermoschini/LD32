var Time = function() {
	this.start = getTime();
	this.current = 0;
	this.delta = 0;
	this.scale = 1.0;
	this.callbacks = [];
};

Time.prototype.update = function() {
	var t = getTime();
	var c = t - this.start;
	var d = c - this.current;
	var scaledDelta = d*this.scale;

	this.current = c;
	this.delta = scaledDelta;

	var i = this.callbacks.length;
	while (i--) {
		var cb = this.callbacks[i];
		if (this.current >= cb.time) {
			cb.method.apply(cb.ref);
			this.callbacks.splice(i, 1);
		}
	}	
};

Time.prototype.reset = function() {
	this.start = GetTime();
	this.current = 0;
	this.delta = 0;
	this.scale = 1.0;
	this.callbacks = [];
};

Time.prototype.addCallback = function(ref, method, delay) {
	var cb = {};
	cb.method = method;
	cb.time = this.current + delay; 
	cb.ref = ref;
	this.callbacks.push(cb);
};

Time.prototype.removeCallback = function(ref) {
	var i = this.callbacks.length;
	while (i--) {
		var cb = this.callbacks[i];
		if (cb.ref == ref) this.callbacks.splice(i, 1);
	}
};

var getTime = function() {
	return new Date().getTime()/1000;
};

Time.getTime = getTime;

module.exports = Time;