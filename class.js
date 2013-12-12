(function() {
	"use strict";
	exports = module.exports = createClass;
	var defaults = {
		restrictPrivate: false
	};
	
	function createClass(obj) {
		var proto = Object.create(null);
		if("constructor" in obj) {
			Object.defineProperty(proto, "constructor", Object.getOwnPropertyDescriptor(obj, "constructor"));
		} else {
			Object.defineProperty(proto, "constructor", function() { });
		}
		if('public' in obj) {
			Object.getOwnPropertyNames(obj.public).forEach(function(propName) {
				Object.defineProperty(proto, propName,
					Object.getOwnPropertyDescriptor(obj.public, propName));
			});
		}
		if('private' in obj) { // todo, HIDE!
			Object.getOwnPropertyNames(obj.private).forEach(function(propName) {
				Object.defineProperty(proto, propName,
					Object.getOwnPropertyDescriptor(obj.private, propName));
			});
		}
		var c = proto.constructor || function() { };
		
		// static variables
		Object.getOwnPropertyNames(obj).forEach(function(propName) {
			if(propName !== "constructor" && propName !== "public" && propName !== "private") {
				Object.defineProperty(c, propName, Object.getOwnPropertyDescriptor(obj, propName));
			}
		});
		
		c.prototype = proto;
		c.prototype.base = null;
		c.inherits = function(iC) { return inheritClass(c, iC); }
		return c;
	}
	function inheritClass(baseClass, inheritedClass) {
		Object.getOwnPropertyNames(inheritedClass.prototype).forEach(function(propName) {
			if(!(propName in baseClass.prototype)) {
				Object.defineProperty(baseClass.prototype, propName, Object.getOwnPropertyDescriptor(inheritedClass.prototype, propName));
			}
		});
		return baseClass;
	}
	exports.extends = function(baseClass, obj) {
		var proto = Object.create(baseClass.prototype);
		if("constructor" in obj) {
			Object.defineProperty(proto, "constructor", Object.getOwnPropertyDescriptor(obj, "constructor"));
		} else {
			Object.defineProperty(proto, "constructor", function() { });
		}
		if('public' in obj) {
			Object.getOwnPropertyNames(obj.public).forEach(function(propName) {
				Object.defineProperty(proto, propName,
					Object.getOwnPropertyDescriptor(obj.public, propName));
			});
		}
		if('private' in obj) { // todo, HIDE!
			Object.getOwnPropertyNames(obj.private).forEach(function(propName) {
				Object.defineProperty(proto, propName,
					Object.getOwnPropertyDescriptor(obj.private, propName));
			});
		}
		var c = proto.constructor || function() { };
		
		// static variables
		Object.getOwnPropertyNames(obj).forEach(function(propName) {
			if(propName !== "constructor" && propName !== "public" && propName !== "private") {
				Object.defineProperty(c, propName, Object.getOwnPropertyDescriptor(obj, propName));
			}
		});
		
		c.prototype = proto;
		c.prototype.base = baseClass.prototype;
		c.inherits = function(iC) { return inheritClass(c, iC); }
		return c;
	};
})();