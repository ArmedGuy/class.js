var Class = require('./class')
, events = require('events');
var Derp = Class({
	constructor: function() {
		console.log("hi");
		Derp.count++;
	},
	count: 0,
	public: {
		test: function(derp) {
			console.log("lol: " + derp);
		}
	},
	private: {
	}
});
var Herp = Class.extends(Derp, {
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
		}
	}
});
Derp.inherits(events.EventEmitter);
var b = new Herp();
b.on("lol", function() {
	console.log("Making sure it works!");
});
b.test("lel");