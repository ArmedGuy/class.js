# Class.js - JavaScript classes, my way
Provides easy functionality for creating class-like prototypes in JavaScript.
Support
- Inheritance and extensions
- static, public and private functions & variables
- instanceof for classes that support Class extensions


Defining a class
```javascript
var Class = require('./class');
var Derp = Class({
	// The class constructor
	init: function() {
		console.log("hi");
	},
	
	// static variables and/or functions go here
	
	// public functions and variables
	public: {
		test: function(derp) {
			console.log("lol: " + derp);
		}
	},
	
	// private functions and variables, not properly implemented yet
	private: {
	}
});
```

Extending an existing class
```javascript
var Herp = Class.extend(Derp, {
	init: function() {
		console.log("hello");
		
		// call base constructor
		this.base.init.call(this);
	}
});
```
Instead of Class.extend you can also use Class.extends or just Class


Creating a sealed(non-extendable) class
```javascript
var Herp = Class.sealed({
	init: function() {
		console.log("yello");
	}
});
```