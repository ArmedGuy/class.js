var Class = require('./class')
, events = require('events');
var Derp = Class.sealed({
	constructor: function() {
		console.log("hi");
		Derp.count++;
	},
	public: {
		test: function(derp) {
			console.log("lol: " + derp);
		}
	},
	private: {
	}
});
var Herp = Class.extend(Derp, {
	constructor: function() {
		console.log("ho");
		Derp.count++;
		this.base.constructor.call(this);
	},
	public: {
		test: function(derp) {
			this.emit("lol");
			console.log("hehe: " + derp);
			this.base.test.call(this, derp);
		},
		toString: function() {
			return "feggit";
		}
	}
});


/*
Herp.inherits(events.EventEmitter);
var b = new Herp();
b.on("lol", function() {
	console.log("Making sure it works!");
});c
console.log(Class.instanceof(b, Derp) + ": " + b);
*/