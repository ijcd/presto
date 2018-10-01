(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Presto"] = factory();
	else
		root["Presto"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/presto.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/presto.js":
/*!**********************!*\
  !*** ./js/presto.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n/**\n* Presto JavaScript client\n*\n* ## Setup\n*\n* Presto needs a Phoenix channel to communiacate on. It also needs a\n* reference to an Unpoly object for DOM manipulation.\n*\n* ```javascript\n*     import \"presto\"\n*     import unpoly from \"unpoly/dist/unpoly.js\"\n*\n*     let presto = new Presto(channel, up);\n* ```\n*\n* @module presto\n*/\n\n// TODO: remove need to extend jQuery\n// TODO: write some javascript tests\n\n// Extend jQuery with attr()\n(function (old) {\n  $.fn.attr = function () {\n    if (arguments.length === 0) {\n      if (this.length === 0) {\n        return null;\n      }\n\n      var obj = {};\n      $.each(this[0].attributes, function () {\n        if (this.specified) {\n          obj[this.name] = this.value;\n        }\n      });\n      return obj;\n    }\n\n    return old.apply(this, arguments);\n  };\n})($.fn.attr);\n\nvar Presto = function () {\n  function Presto(channel, unpoly) {\n    _classCallCheck(this, Presto);\n\n    var self = this;\n\n    this.channel = channel;\n    this.unpoly = unpoly;\n    this.stateChangeCallbacks = { preUpdate: [], postUpdate: [] };\n\n    // pull event names out of the DOM\n    this.allEventNames = Object.getOwnPropertyNames(document).concat(Object.getOwnPropertyNames(Object.getPrototypeOf(Object.getPrototypeOf(document)))).concat(Object.getOwnPropertyNames(Object.getPrototypeOf(window))).filter(function (i) {\n      return !i.indexOf(\"on\") && (document[i] == null || typeof document[i] == \"function\");\n    }).filter(function (elem, pos, self) {\n      return self.indexOf(elem) == pos;\n    });\n\n    // Attach a delegated event handler\n    this.allEventNames.forEach(function (eventName) {\n      var eventName = eventName.replace(/^on/, \"\");\n      var prestoClass = \".presto-\" + eventName;\n\n      // events attached to internal elements\n      $(\"body\").on(eventName, prestoClass, function (event) {\n        self.pushEvent(eventName, event);\n      });\n\n      // events attached to the body\n      $(\"body\" + prestoClass).on(eventName, function (event) {\n        self.pushEvent(eventName, event);\n      });\n    });\n\n    this.channel.on(\"presto\", function (payload) {\n      var name = payload.name;\n\n\n      switch (name) {\n        case \"update_component\":\n          {\n\n            self.runPreUpdateHooks(payload);\n\n            var component_selector = payload.component_selector,\n                content = payload.content;\n\n            var focused = document.activeElement;\n            self.unpoly.extract(component_selector, content);\n            $(focused).focus();\n\n            self.runPostUpdateHooks(payload);\n\n            break;\n          }\n      }\n    });\n  }\n\n  _createClass(Presto, [{\n    key: \"onPreUpdate\",\n    value: function onPreUpdate(callback) {\n      this.stateChangeCallbacks.preUpdate.push(callback);\n    }\n  }, {\n    key: \"onPostUpdate\",\n    value: function onPostUpdate(callback) {\n      this.stateChangeCallbacks.postUpdate.push(callback);\n    }\n  }, {\n    key: \"runPreUpdateHooks\",\n    value: function runPreUpdateHooks(payload) {\n      this.stateChangeCallbacks.preUpdate.forEach(function (callback) {\n        return callback(payload);\n      });\n    }\n  }, {\n    key: \"runPostUpdateHooks\",\n    value: function runPostUpdateHooks(payload) {\n      this.stateChangeCallbacks.postUpdate.forEach(function (callback) {\n        return callback(payload);\n      });\n    }\n  }, {\n    key: \"pushEvent\",\n    value: function pushEvent(eventName, event) {\n      var $elem = $(event.target);\n      this.channel.push(\"presto\", {\n        element: $elem.prop('tagName'),\n        event: eventName,\n        key_code: event.keyCode,\n        attrs: $elem.attr(),\n        id: $elem.prop('id'),\n        component_id: $elem.parents(\".presto-component\").map(function (i, e) {\n          return e.id;\n        }).toArray().reverse()[0]\n      });\n    }\n  }]);\n\n  return Presto;\n}();\n\nexports.Presto = Presto;\n\n//# sourceURL=webpack://Presto/./js/presto.js?");

/***/ })

/******/ });
});