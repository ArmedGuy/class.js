var overload = require('fnoverload');
(function() {
	"use strict";
	var defaults = {
		restrictPrivate: false
	};
	
	var createClass = overload(
	
		overload.f(Object, function(obj) {
			return createClass(Object, obj, {});
		}),
		
		overload.f(Function, Object, function(baseClass, obj) {
			return createClass(baseClass, obj, {});
		}),
		
		overload.f(Object, Object, function(obj, settings) {
			return createClass(Object, obj, settings);
		}),
		
		overload.f(Function, Object, Object, function(baseClass, obj, settings) {
			if((baseClass._classProperties && 'sealed' in baseClass._classProperties) || Object.isSealed(baseClass))
				throw new Error("Cannot extend sealed class");
			
			var proto = Object.create(baseClass.prototype);
			if("constructor" in obj) {
				Object.defineProperty(proto, "constructor", Object.getOwnPropertyDescriptor(obj, "constructor"));
			} else {
				Object.defineProperty(proto, "constructor", function() { });
			}
			if('public' in obj) {
				Object.getOwnPropertyNames(obj.public).forEach(function(propName) {
					Object.defineProperty(proto, propName, Object.getOwnPropertyDescriptor(obj.public, propName));
				});
			}
			if('private' in obj) { // todo, HIDE!
				Object.getOwnPropertyNames(obj.private).forEach(function(propName) {
					Object.defineProperty(proto, propName, Object.getOwnPropertyDescriptor(obj.private, propName));
				});
			}
			var c = proto.constructor || function() { };
			
			// static variables
			Object.getOwnPropertyNames(obj).forEach(function(propName) {
				if(propName !== "constructor" && propName !== "public" && propName !== "private") {
					Object.defineProperty(c, propName, Object.getOwnPropertyDescriptor(obj, propName));
				}
			});
			
			if(baseClass._extendedByClass) {
				c._extendedByClass = baseClass._extendedByClass;
			} else {
				c._extendedByClass = [];
			}
			c._extendedByClass.push(baseClass);
			
			c._classProperties = settings;
			
			c.prototype = proto;
			c.prototype.base = baseClass.prototype;
			c.inherits = function(iC) { return inheritClass(c, iC); }
			
			return c;
		})
	);
	exports = module.exports = createClass;
	
	
	exports.sealed = overload(
		overload.f(Object, function(obj) {
			return createClass(Object, obj, { sealed: true });
		}),
		overload.f(Object, Object, function(obj, settings) {
			settings.sealed = true;
			return createClass(Object, obj, settings);
		}),
		overload.f(Function, Object, function(baseClass, obj) {
			return createClass(baseClass, obj, { sealed: true });
		}),
		overload.f(Function, Object, Object, function(baseClass, obj, settings) {
			settings.sealed = true;
			return createClass(baseClass, obj, settings);
		})
	);
	exports.extends = exports.extend = overload(
		function(baseClass, obj) {
			return createClass(baseClass, obj, {});
		},
		function(baseClass, obj, settings) {
			settings.sealed = true;
			return createClass(baseClass, obj, settings);
		}
	);
	exports.instanceof = function(baseClass, compareWith) {
		if(baseClass instanceof compareWith) {
			return true;
		}
		for(var c in compareWith._extendedByClass) {
			if(baseClass instanceof compareWith._extendedByClass) {
				return true;
			}
		}
		return false;
	}
	function inheritClass(baseClass, inheritedClass) {
		Object.getOwnPropertyNames(inheritedClass.prototype).forEach(function(propName) {
			if(!(propName in baseClass.prototype)) {
				Object.defineProperty(baseClass.prototype, propName, Object.getOwnPropertyDescriptor(inheritedClass.prototype, propName));
			}
		});
		return baseClass;
	}
})();