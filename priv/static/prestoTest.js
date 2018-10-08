!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.Presto=t():e.Presto=t()}(window,function(){return function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:o})},n.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=40)}([function(e,t){
/*!
 * Chai - flag utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
e.exports=function(e,t,n){var o=e.__flags||(e.__flags=Object.create(null));if(3!==arguments.length)return o[t];o[t]=n}},function(e,t){
/*!
 * Chai - transferFlags utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
e.exports=function(e,t,n){var o=e.__flags||(e.__flags=Object.create(null));for(var r in t.__flags||(t.__flags=Object.create(null)),n=3!==arguments.length||n,o)(n||"object"!==r&&"ssfi"!==r&&"lockSsfi"!==r&&"message"!=r)&&(t.__flags[r]=o[r])}},function(e,t,n){
/*!
 * chai
 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
var o=[];
/*!
 * Chai version
 */t.version="4.2.0",
/*!
 * Assertion Error
 */
t.AssertionError=n(14);
/*!
 * Utils for plugins (not exported)
 */
var r=n(38);t.use=function(e){return~o.indexOf(e)||(e(t,r),o.push(e)),t},
/*!
 * Utility Functions
 */
t.util=r;
/*!
 * Configuration
 */
var i=n(3);t.config=i;
/*!
 * Primary `Assertion` prototype
 */
var s=n(20);t.use(s);
/*!
 * Core Assertions
 */
var a=n(19);t.use(a);
/*!
 * Expect interface
 */
var c=n(18);t.use(c);
/*!
 * Should interface
 */
var u=n(17);t.use(u);
/*!
 * Assert interface
 */
var f=n(16);t.use(f)},function(e,t){e.exports={includeStack:!1,showDiff:!0,truncateThreshold:40,useProxy:!0,proxyExcludedKeys:["then","catch","inspect","toJSON"]}},function(e,t,n){var o=n(3),r=n(0),i=n(10),s=n(6),a=["__flags","__methods","_obj","assert"];e.exports=function(e,t){return s()?new Proxy(e,{get:function e(n,s){if("string"==typeof s&&-1===o.proxyExcludedKeys.indexOf(s)&&!Reflect.has(n,s)){if(t)throw Error("Invalid Chai property: "+t+"."+s+'. See docs for proper usage of "'+t+'".');var c=null,u=4;throw i(n).forEach(function(e){if(!Object.prototype.hasOwnProperty(e)&&-1===a.indexOf(e)){var t=function(e,t,n){if(Math.abs(e.length-t.length)>=n)return n;for(var o=[],r=0;r<=e.length;r++)o[r]=Array(t.length+1).fill(0),o[r][0]=r;for(var i=0;i<t.length;i++)o[0][i]=i;for(var r=1;r<=e.length;r++)for(var s=e.charCodeAt(r-1),i=1;i<=t.length;i++)Math.abs(r-i)>=n?o[r][i]=n:o[r][i]=Math.min(o[r-1][i]+1,o[r][i-1]+1,o[r-1][i-1]+(s===t.charCodeAt(i-1)?0:1));return o[e.length][t.length]}(s,e,u);t<u&&(c=e,u=t)}}),null!==c?Error("Invalid Chai property: "+s+'. Did you mean "'+c+'"?'):Error("Invalid Chai property: "+s)}return-1!==a.indexOf(s)||r(n,"lockSsfi")||r(n,"ssfi",e),Reflect.get(n,s)}}):e}},function(e,t){var n=Object.getOwnPropertyDescriptor(function(){},"length");
/*!
 * Chai - addLengthGuard utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */e.exports=function(e,t,o){return n.configurable?(Object.defineProperty(e,"length",{get:function(){if(o)throw Error("Invalid Chai property: "+t+'.length. Due to a compatibility issue, "length" cannot directly follow "'+t+'". Use "'+t+'.lengthOf" instead.');throw Error("Invalid Chai property: "+t+'.length. See docs for proper usage of "'+t+'".')}}),e):e}},function(e,t,n){var o=n(3);
/*!
 * Chai - isProxyEnabled helper
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */e.exports=function(){return o.useProxy&&"undefined"!=typeof Proxy&&"undefined"!=typeof Reflect}},function(e,t,n){var o=n(11),r=n(10),i=n(32),s=n(3);e.exports=function(e,t,n,o){return c({showHidden:t,seen:[],stylize:function(e){return e}},e,void 0===n?2:n)};var a=function(e){return"object"==typeof HTMLElement?e instanceof HTMLElement:e&&"object"==typeof e&&"nodeType"in e&&1===e.nodeType&&"string"==typeof e.nodeName};function c(e,n,y){if(n&&"function"==typeof n.inspect&&n.inspect!==t.inspect&&(!n.constructor||n.constructor.prototype!==n)){var b=n.inspect(y,e);return"string"!=typeof b&&(b=c(e,b,y)),b}var m=function(e,t){switch(typeof t){case"undefined":return e.stylize("undefined","undefined");case"string":var n="'"+JSON.stringify(t).replace(/^"|"$/g,"").replace(/'/g,"\\'").replace(/\\"/g,'"')+"'";return e.stylize(n,"string");case"number":return 0===t&&1/t==-1/0?e.stylize("-0","number"):e.stylize(""+t,"number");case"boolean":return e.stylize(""+t,"boolean");case"symbol":return e.stylize(t.toString(),"symbol")}if(null===t)return e.stylize("null","null")}(e,n);if(m)return m;if(a(n)){if("outerHTML"in n)return n.outerHTML;try{if(document.xmlVersion)return(new XMLSerializer).serializeToString(n);var w=document.createElementNS("http://www.w3.org/1999/xhtml","_");w.appendChild(n.cloneNode(!1));var g=w.innerHTML.replace("><",">"+n.innerHTML+"<");return w.innerHTML="",g}catch(e){}}var v,x,O=i(n),j=e.showHidden?r(n):O;if(0===j.length||l(n)&&(1===j.length&&"stack"===j[0]||2===j.length&&"description"===j[0]&&"stack"===j[1])){if("function"==typeof n)return x=(v=o(n))?": "+v:"",e.stylize("[Function"+x+"]","special");if(p(n))return e.stylize(RegExp.prototype.toString.call(n),"regexp");if(d(n))return e.stylize(Date.prototype.toUTCString.call(n),"date");if(l(n))return u(n)}var M,S,N="",P=!1,k=!1,E=["{","}"];if("object"==typeof(M=n)&&/\w+Array]$/.test(h(M))&&(k=!0,E=["[","]"]),function(e){return Array.isArray(e)||"object"==typeof e&&"[object Array]"===h(e)}(n)&&(P=!0,E=["[","]"]),"function"==typeof n&&(N=" [Function"+(x=(v=o(n))?": "+v:"")+"]"),p(n)&&(N=" "+RegExp.prototype.toString.call(n)),d(n)&&(N=" "+Date.prototype.toUTCString.call(n)),l(n))return u(n);if(0===j.length&&(!P||0==n.length))return E[0]+N+E[1];if(y<0)return p(n)?e.stylize(RegExp.prototype.toString.call(n),"regexp"):e.stylize("[Object]","special");if(e.seen.push(n),P)S=function(e,t,n,o,r){for(var i=[],s=0,a=t.length;s<a;++s)Object.prototype.hasOwnProperty.call(t,String(s))?i.push(f(e,t,n,o,String(s),!0)):i.push("");return r.forEach(function(r){r.match(/^\d+$/)||i.push(f(e,t,n,o,r,!0))}),i}(e,n,y,O,j);else{if(k)return function(e){for(var t="[ ",n=0;n<e.length;++n){if(t.length>=s.truncateThreshold-7){t+="...";break}t+=e[n]+", "}-1!==(t+=" ]").indexOf(",  ]")&&(t=t.replace(",  ]"," ]"));return t}(n);S=j.map(function(t){return f(e,n,y,O,t,P)})}return e.seen.pop(),function(e,t,n){if(e.reduce(function(e,t){return e+t.length+1},0)>60)return n[0]+(""===t?"":t+"\n ")+" "+e.join(",\n  ")+" "+n[1];return n[0]+t+" "+e.join(", ")+" "+n[1]}(S,N,E)}function u(e){return"["+Error.prototype.toString.call(e)+"]"}function f(e,t,n,o,r,i){var s,a,u=Object.getOwnPropertyDescriptor(t,r);if(u&&(u.get?a=u.set?e.stylize("[Getter/Setter]","special"):e.stylize("[Getter]","special"):u.set&&(a=e.stylize("[Setter]","special"))),o.indexOf(r)<0&&(s="["+r+"]"),a||(e.seen.indexOf(t[r])<0?(a=c(e,t[r],null===n?null:n-1)).indexOf("\n")>-1&&(a=i?a.split("\n").map(function(e){return"  "+e}).join("\n").substr(2):"\n"+a.split("\n").map(function(e){return"   "+e}).join("\n")):a=e.stylize("[Circular]","special")),void 0===s){if(i&&r.match(/^\d+$/))return a;(s=JSON.stringify(""+r)).match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)?(s=s.substr(1,s.length-2),s=e.stylize(s,"name")):(s=s.replace(/'/g,"\\'").replace(/\\"/g,'"').replace(/(^"|"$)/g,"'"),s=e.stylize(s,"string"))}return s+": "+a}function p(e){return"object"==typeof e&&"[object RegExp]"===h(e)}function d(e){return"object"==typeof e&&"[object Date]"===h(e)}function l(e){return"object"==typeof e&&"[object Error]"===h(e)}function h(e){return Object.prototype.toString.call(e)}},function(e,t,n){(function(t){var n;n=function(){"use strict";var e="function"==typeof Promise,n="object"==typeof self?self:t,o="undefined"!=typeof Symbol,r="undefined"!=typeof Map,i="undefined"!=typeof Set,s="undefined"!=typeof WeakMap,a="undefined"!=typeof WeakSet,c="undefined"!=typeof DataView,u=o&&void 0!==Symbol.iterator,f=o&&void 0!==Symbol.toStringTag,p=i&&"function"==typeof Set.prototype.entries,d=r&&"function"==typeof Map.prototype.entries,l=p&&Object.getPrototypeOf((new Set).entries()),h=d&&Object.getPrototypeOf((new Map).entries()),y=u&&"function"==typeof Array.prototype[Symbol.iterator],b=y&&Object.getPrototypeOf([][Symbol.iterator]()),m=u&&"function"==typeof String.prototype[Symbol.iterator],w=m&&Object.getPrototypeOf(""[Symbol.iterator]()),g=8,v=-1;return function(t){var o=typeof t;if("object"!==o)return o;if(null===t)return"null";if(t===n)return"global";if(Array.isArray(t)&&(!1===f||!(Symbol.toStringTag in t)))return"Array";if("object"==typeof window&&null!==window){if("object"==typeof window.location&&t===window.location)return"Location";if("object"==typeof window.document&&t===window.document)return"Document";if("object"==typeof window.navigator){if("object"==typeof window.navigator.mimeTypes&&t===window.navigator.mimeTypes)return"MimeTypeArray";if("object"==typeof window.navigator.plugins&&t===window.navigator.plugins)return"PluginArray"}if(("function"==typeof window.HTMLElement||"object"==typeof window.HTMLElement)&&t instanceof window.HTMLElement){if("BLOCKQUOTE"===t.tagName)return"HTMLQuoteElement";if("TD"===t.tagName)return"HTMLTableDataCellElement";if("TH"===t.tagName)return"HTMLTableHeaderCellElement"}}var u=f&&t[Symbol.toStringTag];if("string"==typeof u)return u;var p=Object.getPrototypeOf(t);return p===RegExp.prototype?"RegExp":p===Date.prototype?"Date":e&&p===Promise.prototype?"Promise":i&&p===Set.prototype?"Set":r&&p===Map.prototype?"Map":a&&p===WeakSet.prototype?"WeakSet":s&&p===WeakMap.prototype?"WeakMap":c&&p===DataView.prototype?"DataView":r&&p===h?"Map Iterator":i&&p===l?"Set Iterator":y&&p===b?"Array Iterator":m&&p===w?"String Iterator":null===p?"Object":Object.prototype.toString.call(t).slice(g,v)}},e.exports=n()}).call(this,n(35))},function(e,t){
/*!
 * Chai - getOwnEnumerablePropertySymbols utility
 * Copyright(c) 2011-2016 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
e.exports=function(e){return"function"!=typeof Object.getOwnPropertySymbols?[]:Object.getOwnPropertySymbols(e).filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})}},function(e,t){
/*!
 * Chai - getProperties utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
e.exports=function(e){var t=Object.getOwnPropertyNames(e);function n(e){-1===t.indexOf(e)&&t.push(e)}for(var o=Object.getPrototypeOf(e);null!==o;)Object.getOwnPropertyNames(o).forEach(n),o=Object.getPrototypeOf(o);return t}},function(e,t,n){"use strict";var o=Function.prototype.toString,r=/\s*function(?:\s|\s*\/\*[^(?:*\/)]+\*\/\s*)*([^\s\(\/]+)/;e.exports=function(e){if("function"!=typeof e)return null;var t="";if(void 0===Function.prototype.name&&void 0===e.name){var n=o.call(e).match(r);n&&(t=n[1])}else t=e.name;return t}},function(e,t,n){
/*!
 * Chai - flag utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
/*!
 * Module dependencies
 */
var o=n(7),r=n(3);e.exports=function(e){var t=o(e),n=Object.prototype.toString.call(e);if(r.truncateThreshold&&t.length>=r.truncateThreshold){if("[object Function]"===n)return e.name&&""!==e.name?"[Function: "+e.name+"]":"[Function]";if("[object Array]"===n)return"[ Array("+e.length+") ]";if("[object Object]"===n){var i=Object.keys(e);return"{ Object ("+(i.length>2?i.splice(0,2).join(", ")+", ...":i.join(", "))+") }"}return t}return t}},function(e,t){
/*!
 * Chai - getActual utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
e.exports=function(e,t){return t.length>4?t[4]:e._obj}},function(e,t){
/*!
 * assertion-error
 * Copyright(c) 2013 Jake Luer <jake@qualiancy.com>
 * MIT Licensed
 */
/*!
 * Return a function that will copy properties from
 * one object to another excluding any originally
 * listed. Returned function will create a new `{}`.
 *
 * @param {String} excluded properties ...
 * @return {Function}
 */
function n(){var e=[].slice.call(arguments);function t(t,n){Object.keys(n).forEach(function(o){~e.indexOf(o)||(t[o]=n[o])})}return function(){for(var e=[].slice.call(arguments),n=0,o={};n<e.length;n++)t(o,e[n]);return o}}function o(e,t,r){var i=n("name","message","stack","constructor","toJSON")(t||{});for(var s in this.message=e||"Unspecified AssertionError",this.showDiff=!1,i)this[s]=i[s];if(r=r||o,Error.captureStackTrace)Error.captureStackTrace(this,r);else try{throw new Error}catch(e){this.stack=e.stack}}
/*!
 * Inherit from Error.prototype
 */
/*!
 * Primary Exports
 */
e.exports=o,o.prototype=Object.create(Error.prototype),
/*!
 * Statically set name
 */
o.prototype.name="AssertionError",
/*!
 * Ensure correct constructor
 */
o.prototype.constructor=o,o.prototype.toJSON=function(e){var t=n("constructor","toJSON","stack")({name:this.name},this);return!1!==e&&this.stack&&(t.stack=this.stack),t}},,function(e,t){
/*!
 * chai
 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
e.exports=function(e,t){
/*!
   * Chai dependencies.
   */
var n=e.Assertion,o=t.flag,r=e.assert=function(t,o){new n(null,null,e.assert,!0).assert(t,o,"[ negation message unavailable ]")};
/*!
   * Module export.
   */r.fail=function(t,n,o,i){throw arguments.length<2&&(o=t,t=void 0),o=o||"assert.fail()",new e.AssertionError(o,{actual:t,expected:n,operator:i},r.fail)},r.isOk=function(e,t){new n(e,t,r.isOk,!0).is.ok},r.isNotOk=function(e,t){new n(e,t,r.isNotOk,!0).is.not.ok},r.equal=function(e,t,i){var s=new n(e,i,r.equal,!0);s.assert(t==o(s,"object"),"expected #{this} to equal #{exp}","expected #{this} to not equal #{act}",t,e,!0)},r.notEqual=function(e,t,i){var s=new n(e,i,r.notEqual,!0);s.assert(t!=o(s,"object"),"expected #{this} to not equal #{exp}","expected #{this} to equal #{act}",t,e,!0)},r.strictEqual=function(e,t,o){new n(e,o,r.strictEqual,!0).to.equal(t)},r.notStrictEqual=function(e,t,o){new n(e,o,r.notStrictEqual,!0).to.not.equal(t)},r.deepEqual=r.deepStrictEqual=function(e,t,o){new n(e,o,r.deepEqual,!0).to.eql(t)},r.notDeepEqual=function(e,t,o){new n(e,o,r.notDeepEqual,!0).to.not.eql(t)},r.isAbove=function(e,t,o){new n(e,o,r.isAbove,!0).to.be.above(t)},r.isAtLeast=function(e,t,o){new n(e,o,r.isAtLeast,!0).to.be.least(t)},r.isBelow=function(e,t,o){new n(e,o,r.isBelow,!0).to.be.below(t)},r.isAtMost=function(e,t,o){new n(e,o,r.isAtMost,!0).to.be.most(t)},r.isTrue=function(e,t){new n(e,t,r.isTrue,!0).is.true},r.isNotTrue=function(e,t){new n(e,t,r.isNotTrue,!0).to.not.equal(!0)},r.isFalse=function(e,t){new n(e,t,r.isFalse,!0).is.false},r.isNotFalse=function(e,t){new n(e,t,r.isNotFalse,!0).to.not.equal(!1)},r.isNull=function(e,t){new n(e,t,r.isNull,!0).to.equal(null)},r.isNotNull=function(e,t){new n(e,t,r.isNotNull,!0).to.not.equal(null)},r.isNaN=function(e,t){new n(e,t,r.isNaN,!0).to.be.NaN},r.isNotNaN=function(e,t){new n(e,t,r.isNotNaN,!0).not.to.be.NaN},r.exists=function(e,t){new n(e,t,r.exists,!0).to.exist},r.notExists=function(e,t){new n(e,t,r.notExists,!0).to.not.exist},r.isUndefined=function(e,t){new n(e,t,r.isUndefined,!0).to.equal(void 0)},r.isDefined=function(e,t){new n(e,t,r.isDefined,!0).to.not.equal(void 0)},r.isFunction=function(e,t){new n(e,t,r.isFunction,!0).to.be.a("function")},r.isNotFunction=function(e,t){new n(e,t,r.isNotFunction,!0).to.not.be.a("function")},r.isObject=function(e,t){new n(e,t,r.isObject,!0).to.be.a("object")},r.isNotObject=function(e,t){new n(e,t,r.isNotObject,!0).to.not.be.a("object")},r.isArray=function(e,t){new n(e,t,r.isArray,!0).to.be.an("array")},r.isNotArray=function(e,t){new n(e,t,r.isNotArray,!0).to.not.be.an("array")},r.isString=function(e,t){new n(e,t,r.isString,!0).to.be.a("string")},r.isNotString=function(e,t){new n(e,t,r.isNotString,!0).to.not.be.a("string")},r.isNumber=function(e,t){new n(e,t,r.isNumber,!0).to.be.a("number")},r.isNotNumber=function(e,t){new n(e,t,r.isNotNumber,!0).to.not.be.a("number")},r.isFinite=function(e,t){new n(e,t,r.isFinite,!0).to.be.finite},r.isBoolean=function(e,t){new n(e,t,r.isBoolean,!0).to.be.a("boolean")},r.isNotBoolean=function(e,t){new n(e,t,r.isNotBoolean,!0).to.not.be.a("boolean")},r.typeOf=function(e,t,o){new n(e,o,r.typeOf,!0).to.be.a(t)},r.notTypeOf=function(e,t,o){new n(e,o,r.notTypeOf,!0).to.not.be.a(t)},r.instanceOf=function(e,t,o){new n(e,o,r.instanceOf,!0).to.be.instanceOf(t)},r.notInstanceOf=function(e,t,o){new n(e,o,r.notInstanceOf,!0).to.not.be.instanceOf(t)},r.include=function(e,t,o){new n(e,o,r.include,!0).include(t)},r.notInclude=function(e,t,o){new n(e,o,r.notInclude,!0).not.include(t)},r.deepInclude=function(e,t,o){new n(e,o,r.deepInclude,!0).deep.include(t)},r.notDeepInclude=function(e,t,o){new n(e,o,r.notDeepInclude,!0).not.deep.include(t)},r.nestedInclude=function(e,t,o){new n(e,o,r.nestedInclude,!0).nested.include(t)},r.notNestedInclude=function(e,t,o){new n(e,o,r.notNestedInclude,!0).not.nested.include(t)},r.deepNestedInclude=function(e,t,o){new n(e,o,r.deepNestedInclude,!0).deep.nested.include(t)},r.notDeepNestedInclude=function(e,t,o){new n(e,o,r.notDeepNestedInclude,!0).not.deep.nested.include(t)},r.ownInclude=function(e,t,o){new n(e,o,r.ownInclude,!0).own.include(t)},r.notOwnInclude=function(e,t,o){new n(e,o,r.notOwnInclude,!0).not.own.include(t)},r.deepOwnInclude=function(e,t,o){new n(e,o,r.deepOwnInclude,!0).deep.own.include(t)},r.notDeepOwnInclude=function(e,t,o){new n(e,o,r.notDeepOwnInclude,!0).not.deep.own.include(t)},r.match=function(e,t,o){new n(e,o,r.match,!0).to.match(t)},r.notMatch=function(e,t,o){new n(e,o,r.notMatch,!0).to.not.match(t)},r.property=function(e,t,o){new n(e,o,r.property,!0).to.have.property(t)},r.notProperty=function(e,t,o){new n(e,o,r.notProperty,!0).to.not.have.property(t)},r.propertyVal=function(e,t,o,i){new n(e,i,r.propertyVal,!0).to.have.property(t,o)},r.notPropertyVal=function(e,t,o,i){new n(e,i,r.notPropertyVal,!0).to.not.have.property(t,o)},r.deepPropertyVal=function(e,t,o,i){new n(e,i,r.deepPropertyVal,!0).to.have.deep.property(t,o)},r.notDeepPropertyVal=function(e,t,o,i){new n(e,i,r.notDeepPropertyVal,!0).to.not.have.deep.property(t,o)},r.ownProperty=function(e,t,o){new n(e,o,r.ownProperty,!0).to.have.own.property(t)},r.notOwnProperty=function(e,t,o){new n(e,o,r.notOwnProperty,!0).to.not.have.own.property(t)},r.ownPropertyVal=function(e,t,o,i){new n(e,i,r.ownPropertyVal,!0).to.have.own.property(t,o)},r.notOwnPropertyVal=function(e,t,o,i){new n(e,i,r.notOwnPropertyVal,!0).to.not.have.own.property(t,o)},r.deepOwnPropertyVal=function(e,t,o,i){new n(e,i,r.deepOwnPropertyVal,!0).to.have.deep.own.property(t,o)},r.notDeepOwnPropertyVal=function(e,t,o,i){new n(e,i,r.notDeepOwnPropertyVal,!0).to.not.have.deep.own.property(t,o)},r.nestedProperty=function(e,t,o){new n(e,o,r.nestedProperty,!0).to.have.nested.property(t)},r.notNestedProperty=function(e,t,o){new n(e,o,r.notNestedProperty,!0).to.not.have.nested.property(t)},r.nestedPropertyVal=function(e,t,o,i){new n(e,i,r.nestedPropertyVal,!0).to.have.nested.property(t,o)},r.notNestedPropertyVal=function(e,t,o,i){new n(e,i,r.notNestedPropertyVal,!0).to.not.have.nested.property(t,o)},r.deepNestedPropertyVal=function(e,t,o,i){new n(e,i,r.deepNestedPropertyVal,!0).to.have.deep.nested.property(t,o)},r.notDeepNestedPropertyVal=function(e,t,o,i){new n(e,i,r.notDeepNestedPropertyVal,!0).to.not.have.deep.nested.property(t,o)},r.lengthOf=function(e,t,o){new n(e,o,r.lengthOf,!0).to.have.lengthOf(t)},r.hasAnyKeys=function(e,t,o){new n(e,o,r.hasAnyKeys,!0).to.have.any.keys(t)},r.hasAllKeys=function(e,t,o){new n(e,o,r.hasAllKeys,!0).to.have.all.keys(t)},r.containsAllKeys=function(e,t,o){new n(e,o,r.containsAllKeys,!0).to.contain.all.keys(t)},r.doesNotHaveAnyKeys=function(e,t,o){new n(e,o,r.doesNotHaveAnyKeys,!0).to.not.have.any.keys(t)},r.doesNotHaveAllKeys=function(e,t,o){new n(e,o,r.doesNotHaveAllKeys,!0).to.not.have.all.keys(t)},r.hasAnyDeepKeys=function(e,t,o){new n(e,o,r.hasAnyDeepKeys,!0).to.have.any.deep.keys(t)},r.hasAllDeepKeys=function(e,t,o){new n(e,o,r.hasAllDeepKeys,!0).to.have.all.deep.keys(t)},r.containsAllDeepKeys=function(e,t,o){new n(e,o,r.containsAllDeepKeys,!0).to.contain.all.deep.keys(t)},r.doesNotHaveAnyDeepKeys=function(e,t,o){new n(e,o,r.doesNotHaveAnyDeepKeys,!0).to.not.have.any.deep.keys(t)},r.doesNotHaveAllDeepKeys=function(e,t,o){new n(e,o,r.doesNotHaveAllDeepKeys,!0).to.not.have.all.deep.keys(t)},r.throws=function(e,t,i,s){("string"==typeof t||t instanceof RegExp)&&(i=t,t=null);var a=new n(e,s,r.throws,!0).to.throw(t,i);return o(a,"object")},r.doesNotThrow=function(e,t,o,i){("string"==typeof t||t instanceof RegExp)&&(o=t,t=null),new n(e,i,r.doesNotThrow,!0).to.not.throw(t,o)},r.operator=function(i,s,a,c){var u;switch(s){case"==":u=i==a;break;case"===":u=i===a;break;case">":u=i>a;break;case">=":u=i>=a;break;case"<":u=i<a;break;case"<=":u=i<=a;break;case"!=":u=i!=a;break;case"!==":u=i!==a;break;default:throw c=c?c+": ":c,new e.AssertionError(c+'Invalid operator "'+s+'"',void 0,r.operator)}var f=new n(u,c,r.operator,!0);f.assert(!0===o(f,"object"),"expected "+t.inspect(i)+" to be "+s+" "+t.inspect(a),"expected "+t.inspect(i)+" to not be "+s+" "+t.inspect(a))},r.closeTo=function(e,t,o,i){new n(e,i,r.closeTo,!0).to.be.closeTo(t,o)},r.approximately=function(e,t,o,i){new n(e,i,r.approximately,!0).to.be.approximately(t,o)},r.sameMembers=function(e,t,o){new n(e,o,r.sameMembers,!0).to.have.same.members(t)},r.notSameMembers=function(e,t,o){new n(e,o,r.notSameMembers,!0).to.not.have.same.members(t)},r.sameDeepMembers=function(e,t,o){new n(e,o,r.sameDeepMembers,!0).to.have.same.deep.members(t)},r.notSameDeepMembers=function(e,t,o){new n(e,o,r.notSameDeepMembers,!0).to.not.have.same.deep.members(t)},r.sameOrderedMembers=function(e,t,o){new n(e,o,r.sameOrderedMembers,!0).to.have.same.ordered.members(t)},r.notSameOrderedMembers=function(e,t,o){new n(e,o,r.notSameOrderedMembers,!0).to.not.have.same.ordered.members(t)},r.sameDeepOrderedMembers=function(e,t,o){new n(e,o,r.sameDeepOrderedMembers,!0).to.have.same.deep.ordered.members(t)},r.notSameDeepOrderedMembers=function(e,t,o){new n(e,o,r.notSameDeepOrderedMembers,!0).to.not.have.same.deep.ordered.members(t)},r.includeMembers=function(e,t,o){new n(e,o,r.includeMembers,!0).to.include.members(t)},r.notIncludeMembers=function(e,t,o){new n(e,o,r.notIncludeMembers,!0).to.not.include.members(t)},r.includeDeepMembers=function(e,t,o){new n(e,o,r.includeDeepMembers,!0).to.include.deep.members(t)},r.notIncludeDeepMembers=function(e,t,o){new n(e,o,r.notIncludeDeepMembers,!0).to.not.include.deep.members(t)},r.includeOrderedMembers=function(e,t,o){new n(e,o,r.includeOrderedMembers,!0).to.include.ordered.members(t)},r.notIncludeOrderedMembers=function(e,t,o){new n(e,o,r.notIncludeOrderedMembers,!0).to.not.include.ordered.members(t)},r.includeDeepOrderedMembers=function(e,t,o){new n(e,o,r.includeDeepOrderedMembers,!0).to.include.deep.ordered.members(t)},r.notIncludeDeepOrderedMembers=function(e,t,o){new n(e,o,r.notIncludeDeepOrderedMembers,!0).to.not.include.deep.ordered.members(t)},r.oneOf=function(e,t,o){new n(e,o,r.oneOf,!0).to.be.oneOf(t)},r.changes=function(e,t,o,i){3===arguments.length&&"function"==typeof t&&(i=o,o=null),new n(e,i,r.changes,!0).to.change(t,o)},r.changesBy=function(e,t,o,i,s){if(4===arguments.length&&"function"==typeof t){var a=i;i=o,s=a}else 3===arguments.length&&(i=o,o=null);new n(e,s,r.changesBy,!0).to.change(t,o).by(i)},r.doesNotChange=function(e,t,o,i){return 3===arguments.length&&"function"==typeof t&&(i=o,o=null),new n(e,i,r.doesNotChange,!0).to.not.change(t,o)},r.changesButNotBy=function(e,t,o,i,s){if(4===arguments.length&&"function"==typeof t){var a=i;i=o,s=a}else 3===arguments.length&&(i=o,o=null);new n(e,s,r.changesButNotBy,!0).to.change(t,o).but.not.by(i)},r.increases=function(e,t,o,i){return 3===arguments.length&&"function"==typeof t&&(i=o,o=null),new n(e,i,r.increases,!0).to.increase(t,o)},r.increasesBy=function(e,t,o,i,s){if(4===arguments.length&&"function"==typeof t){var a=i;i=o,s=a}else 3===arguments.length&&(i=o,o=null);new n(e,s,r.increasesBy,!0).to.increase(t,o).by(i)},r.doesNotIncrease=function(e,t,o,i){return 3===arguments.length&&"function"==typeof t&&(i=o,o=null),new n(e,i,r.doesNotIncrease,!0).to.not.increase(t,o)},r.increasesButNotBy=function(e,t,o,i,s){if(4===arguments.length&&"function"==typeof t){var a=i;i=o,s=a}else 3===arguments.length&&(i=o,o=null);new n(e,s,r.increasesButNotBy,!0).to.increase(t,o).but.not.by(i)},r.decreases=function(e,t,o,i){return 3===arguments.length&&"function"==typeof t&&(i=o,o=null),new n(e,i,r.decreases,!0).to.decrease(t,o)},r.decreasesBy=function(e,t,o,i,s){if(4===arguments.length&&"function"==typeof t){var a=i;i=o,s=a}else 3===arguments.length&&(i=o,o=null);new n(e,s,r.decreasesBy,!0).to.decrease(t,o).by(i)},r.doesNotDecrease=function(e,t,o,i){return 3===arguments.length&&"function"==typeof t&&(i=o,o=null),new n(e,i,r.doesNotDecrease,!0).to.not.decrease(t,o)},r.doesNotDecreaseBy=function(e,t,o,i,s){if(4===arguments.length&&"function"==typeof t){var a=i;i=o,s=a}else 3===arguments.length&&(i=o,o=null);return new n(e,s,r.doesNotDecreaseBy,!0).to.not.decrease(t,o).by(i)},r.decreasesButNotBy=function(e,t,o,i,s){if(4===arguments.length&&"function"==typeof t){var a=i;i=o,s=a}else 3===arguments.length&&(i=o,o=null);new n(e,s,r.decreasesButNotBy,!0).to.decrease(t,o).but.not.by(i)}
/*!
   * ### .ifError(object)
   *
   * Asserts if value is not a false value, and throws if it is a true value.
   * This is added to allow for chai to be a drop-in replacement for Node's
   * assert class.
   *
   *     var err = new Error('I am a custom error');
   *     assert.ifError(err); // Rethrows err!
   *
   * @name ifError
   * @param {Object} object
   * @namespace Assert
   * @api public
   */,r.ifError=function(e){if(e)throw e},r.isExtensible=function(e,t){new n(e,t,r.isExtensible,!0).to.be.extensible},r.isNotExtensible=function(e,t){new n(e,t,r.isNotExtensible,!0).to.not.be.extensible},r.isSealed=function(e,t){new n(e,t,r.isSealed,!0).to.be.sealed},r.isNotSealed=function(e,t){new n(e,t,r.isNotSealed,!0).to.not.be.sealed},r.isFrozen=function(e,t){new n(e,t,r.isFrozen,!0).to.be.frozen},r.isNotFrozen=function(e,t){new n(e,t,r.isNotFrozen,!0).to.not.be.frozen},r.isEmpty=function(e,t){new n(e,t,r.isEmpty,!0).to.be.empty},r.isNotEmpty=function(e,t){new n(e,t,r.isNotEmpty,!0).to.not.be.empty},
/*!
   * Aliases.
   */
function e(t,n){return r[n]=r[t],e}("isOk","ok")("isNotOk","notOk")("throws","throw")("throws","Throw")("isExtensible","extensible")("isNotExtensible","notExtensible")("isSealed","sealed")("isNotSealed","notSealed")("isFrozen","frozen")("isNotFrozen","notFrozen")("isEmpty","empty")("isNotEmpty","notEmpty")}},function(e,t){
/*!
 * chai
 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
e.exports=function(e,t){var n=e.Assertion;function o(){Object.defineProperty(Object.prototype,"should",{set:function(e){Object.defineProperty(this,"should",{value:e,enumerable:!0,configurable:!0,writable:!0})},get:function e(){return this instanceof String||this instanceof Number||this instanceof Boolean||"function"==typeof Symbol&&this instanceof Symbol?new n(this.valueOf(),null,e):new n(this,null,e)},configurable:!0});var t={fail:function(n,o,r,i){throw arguments.length<2&&(r=n,n=void 0),r=r||"should.fail()",new e.AssertionError(r,{actual:n,expected:o,operator:i},t.fail)},equal:function(e,t,o){new n(e,o).to.equal(t)},Throw:function(e,t,o,r){new n(e,r).to.Throw(t,o)},exist:function(e,t){new n(e,t).to.exist},not:{}};return t.not.equal=function(e,t,o){new n(e,o).to.not.equal(t)},t.not.Throw=function(e,t,o,r){new n(e,r).to.not.Throw(t,o)},t.not.exist=function(e,t){new n(e,t).to.not.exist},t.throw=t.Throw,t.not.throw=t.not.Throw,t}e.should=o,e.Should=o}},function(e,t){
/*!
 * chai
 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
e.exports=function(e,t){e.expect=function(t,n){return new e.Assertion(t,n)},e.expect.fail=function(t,n,o,r){throw arguments.length<2&&(o=t,t=void 0),o=o||"expect.fail()",new e.AssertionError(o,{actual:t,expected:n,operator:r},e.expect.fail)}}},function(e,t){
/*!
 * chai
 * http://chaijs.com
 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
e.exports=function(e,t){var n=e.Assertion,o=e.AssertionError,r=t.flag;function i(e,n){n&&r(this,"message",n),e=e.toLowerCase();var o=r(this,"object"),i=~["a","e","i","o","u"].indexOf(e.charAt(0))?"an ":"a ";this.assert(e===t.type(o).toLowerCase(),"expected #{this} to be "+i+e,"expected #{this} not to be "+i+e)}function s(e,n){return t.isNaN(e)&&t.isNaN(n)||e===n}function a(){r(this,"contains",!0)}function c(e,i){i&&r(this,"message",i);var a=r(this,"object"),c=t.type(a).toLowerCase(),u=r(this,"message"),f=r(this,"negate"),p=r(this,"ssfi"),d=r(this,"deep"),l=d?"deep ":"";u=u?u+": ":"";var h=!1;switch(c){case"string":h=-1!==a.indexOf(e);break;case"weakset":if(d)throw new o(u+"unable to use .deep.include with WeakSet",void 0,p);h=a.has(e);break;case"map":var y=d?t.eql:s;a.forEach(function(t){h=h||y(t,e)});break;case"set":d?a.forEach(function(n){h=h||t.eql(n,e)}):h=a.has(e);break;case"array":h=d?a.some(function(n){return t.eql(n,e)}):-1!==a.indexOf(e);break;default:if(e!==Object(e))throw new o(u+"object tested must be an array, a map, an object, a set, a string, or a weakset, but "+c+" given",void 0,p);var b=Object.keys(e),m=null,w=0;if(b.forEach(function(i){var s=new n(a);if(t.transferFlags(this,s,!0),r(s,"lockSsfi",!0),f&&1!==b.length)try{s.property(i,e[i])}catch(e){if(!t.checkError.compatibleConstructor(e,o))throw e;null===m&&(m=e),w++}else s.property(i,e[i])},this),f&&b.length>1&&w===b.length)throw m;return}this.assert(h,"expected #{this} to "+l+"include "+t.inspect(e),"expected #{this} to not "+l+"include "+t.inspect(e))}function u(){var e=r(this,"object"),n=t.type(e);this.assert("Arguments"===n,"expected #{this} to be arguments but got "+n,"expected #{this} to not be arguments")}function f(e,t){t&&r(this,"message",t);var n=r(this,"object");if(r(this,"deep")){var o=r(this,"lockSsfi");r(this,"lockSsfi",!0),this.eql(e),r(this,"lockSsfi",o)}else this.assert(e===n,"expected #{this} to equal #{exp}","expected #{this} to not equal #{exp}",e,this._obj,!0)}function p(e,n){n&&r(this,"message",n),this.assert(t.eql(e,r(this,"object")),"expected #{this} to deeply equal #{exp}","expected #{this} to not deeply equal #{exp}",e,this._obj,!0)}function d(e,i){i&&r(this,"message",i);var s,a=r(this,"object"),c=r(this,"doLength"),u=r(this,"message"),f=u?u+": ":"",p=r(this,"ssfi"),d=t.type(a).toLowerCase(),l=t.type(e).toLowerCase(),h=!0;if(c&&"map"!==d&&"set"!==d&&new n(a,u,p,!0).to.have.property("length"),c||"date"!==d||"date"===l)if("number"===l||!c&&"number"!==d)if(c||"date"===d||"number"===d)h=!1;else{s=f+"expected "+("string"===d?"'"+a+"'":a)+" to be a number or a date"}else s=f+"the argument to above must be a number";else s=f+"the argument to above must be a date";if(h)throw new o(s,void 0,p);if(c){var y,b="length";"map"===d||"set"===d?(b="size",y=a.size):y=a.length,this.assert(y>e,"expected #{this} to have a "+b+" above #{exp} but got #{act}","expected #{this} to not have a "+b+" above #{exp}",e,y)}else this.assert(a>e,"expected #{this} to be above #{exp}","expected #{this} to be at most #{exp}",e)}function l(e,i){i&&r(this,"message",i);var s,a=r(this,"object"),c=r(this,"doLength"),u=r(this,"message"),f=u?u+": ":"",p=r(this,"ssfi"),d=t.type(a).toLowerCase(),l=t.type(e).toLowerCase(),h=!0;if(c&&"map"!==d&&"set"!==d&&new n(a,u,p,!0).to.have.property("length"),c||"date"!==d||"date"===l)if("number"===l||!c&&"number"!==d)if(c||"date"===d||"number"===d)h=!1;else{s=f+"expected "+("string"===d?"'"+a+"'":a)+" to be a number or a date"}else s=f+"the argument to least must be a number";else s=f+"the argument to least must be a date";if(h)throw new o(s,void 0,p);if(c){var y,b="length";"map"===d||"set"===d?(b="size",y=a.size):y=a.length,this.assert(y>=e,"expected #{this} to have a "+b+" at least #{exp} but got #{act}","expected #{this} to have a "+b+" below #{exp}",e,y)}else this.assert(a>=e,"expected #{this} to be at least #{exp}","expected #{this} to be below #{exp}",e)}function h(e,i){i&&r(this,"message",i);var s,a=r(this,"object"),c=r(this,"doLength"),u=r(this,"message"),f=u?u+": ":"",p=r(this,"ssfi"),d=t.type(a).toLowerCase(),l=t.type(e).toLowerCase(),h=!0;if(c&&"map"!==d&&"set"!==d&&new n(a,u,p,!0).to.have.property("length"),c||"date"!==d||"date"===l)if("number"===l||!c&&"number"!==d)if(c||"date"===d||"number"===d)h=!1;else{s=f+"expected "+("string"===d?"'"+a+"'":a)+" to be a number or a date"}else s=f+"the argument to below must be a number";else s=f+"the argument to below must be a date";if(h)throw new o(s,void 0,p);if(c){var y,b="length";"map"===d||"set"===d?(b="size",y=a.size):y=a.length,this.assert(y<e,"expected #{this} to have a "+b+" below #{exp} but got #{act}","expected #{this} to not have a "+b+" below #{exp}",e,y)}else this.assert(a<e,"expected #{this} to be below #{exp}","expected #{this} to be at least #{exp}",e)}function y(e,i){i&&r(this,"message",i);var s,a=r(this,"object"),c=r(this,"doLength"),u=r(this,"message"),f=u?u+": ":"",p=r(this,"ssfi"),d=t.type(a).toLowerCase(),l=t.type(e).toLowerCase(),h=!0;if(c&&"map"!==d&&"set"!==d&&new n(a,u,p,!0).to.have.property("length"),c||"date"!==d||"date"===l)if("number"===l||!c&&"number"!==d)if(c||"date"===d||"number"===d)h=!1;else{s=f+"expected "+("string"===d?"'"+a+"'":a)+" to be a number or a date"}else s=f+"the argument to most must be a number";else s=f+"the argument to most must be a date";if(h)throw new o(s,void 0,p);if(c){var y,b="length";"map"===d||"set"===d?(b="size",y=a.size):y=a.length,this.assert(y<=e,"expected #{this} to have a "+b+" at most #{exp} but got #{act}","expected #{this} to have a "+b+" above #{exp}",e,y)}else this.assert(a<=e,"expected #{this} to be at most #{exp}","expected #{this} to be above #{exp}",e)}function b(e,n){n&&r(this,"message",n);var i=r(this,"object"),s=r(this,"ssfi"),a=r(this,"message");try{var c=i instanceof e}catch(n){if(n instanceof TypeError)throw new o((a=a?a+": ":"")+"The instanceof assertion needs a constructor but "+t.type(e)+" was given.",void 0,s);throw n}var u=t.getName(e);null===u&&(u="an unnamed constructor"),this.assert(c,"expected #{this} to be an instance of "+u,"expected #{this} to not be an instance of "+u)}function m(e,n,i){i&&r(this,"message",i);var s=r(this,"nested"),a=r(this,"own"),c=r(this,"message"),u=r(this,"object"),f=r(this,"ssfi"),p=typeof e;if(c=c?c+": ":"",s){if("string"!==p)throw new o(c+"the argument to property must be a string when using nested syntax",void 0,f)}else if("string"!==p&&"number"!==p&&"symbol"!==p)throw new o(c+"the argument to property must be a string, number, or symbol",void 0,f);if(s&&a)throw new o(c+'The "nested" and "own" flags cannot be combined.',void 0,f);if(null===u||void 0===u)throw new o(c+"Target cannot be null or undefined.",void 0,f);var d,l=r(this,"deep"),h=r(this,"negate"),y=s?t.getPathInfo(u,e):null,b=s?y.value:u[e],m="";l&&(m+="deep "),a&&(m+="own "),s&&(m+="nested "),m+="property ",d=a?Object.prototype.hasOwnProperty.call(u,e):s?y.exists:t.hasProperty(u,e),h&&1!==arguments.length||this.assert(d,"expected #{this} to have "+m+t.inspect(e),"expected #{this} to not have "+m+t.inspect(e)),arguments.length>1&&this.assert(d&&(l?t.eql(n,b):n===b),"expected #{this} to have "+m+t.inspect(e)+" of #{exp}, but got #{act}","expected #{this} to not have "+m+t.inspect(e)+" of #{act}",n,b),r(this,"object",b)}function w(e,t,n){r(this,"own",!0),m.apply(this,arguments)}function g(e,n,o){"string"==typeof n&&(o=n,n=null),o&&r(this,"message",o);var i=r(this,"object"),s=Object.getOwnPropertyDescriptor(Object(i),e);s&&n?this.assert(t.eql(n,s),"expected the own property descriptor for "+t.inspect(e)+" on #{this} to match "+t.inspect(n)+", got "+t.inspect(s),"expected the own property descriptor for "+t.inspect(e)+" on #{this} to not match "+t.inspect(n),n,s,!0):this.assert(s,"expected #{this} to have an own property descriptor for "+t.inspect(e),"expected #{this} to not have an own property descriptor for "+t.inspect(e)),r(this,"object",s)}function v(){r(this,"doLength",!0)}function x(e,o){o&&r(this,"message",o);var i,s=r(this,"object"),a=t.type(s).toLowerCase(),c=r(this,"message"),u=r(this,"ssfi"),f="length";switch(a){case"map":case"set":f="size",i=s.size;break;default:new n(s,c,u,!0).to.have.property("length"),i=s.length}this.assert(i==e,"expected #{this} to have a "+f+" of #{exp} but got #{act}","expected #{this} to not have a "+f+" of #{act}",e,i)}function O(e,t){t&&r(this,"message",t);var n=r(this,"object");this.assert(e.exec(n),"expected #{this} to match "+e,"expected #{this} not to match "+e)}function j(e){var n,i,s=r(this,"object"),a=t.type(s),c=t.type(e),u=r(this,"ssfi"),f=r(this,"deep"),p="",d=!0,l=r(this,"message"),h=(l=l?l+": ":"")+"when testing keys against an object or an array you must give a single Array|Object|String argument or multiple String arguments";if("Map"===a||"Set"===a)p=f?"deeply ":"",i=[],s.forEach(function(e,t){i.push(t)}),"Array"!==c&&(e=Array.prototype.slice.call(arguments));else{switch(i=t.getOwnEnumerableProperties(s),c){case"Array":if(arguments.length>1)throw new o(h,void 0,u);break;case"Object":if(arguments.length>1)throw new o(h,void 0,u);e=Object.keys(e);break;default:e=Array.prototype.slice.call(arguments)}e=e.map(function(e){return"symbol"==typeof e?e:String(e)})}if(!e.length)throw new o(l+"keys required",void 0,u);var y=e.length,b=r(this,"any"),m=r(this,"all"),w=e;if(b||m||(m=!0),b&&(d=w.some(function(e){return i.some(function(n){return f?t.eql(e,n):e===n})})),m&&(d=w.every(function(e){return i.some(function(n){return f?t.eql(e,n):e===n})}),r(this,"contains")||(d=d&&e.length==i.length)),y>1){var g=(e=e.map(function(e){return t.inspect(e)})).pop();m&&(n=e.join(", ")+", and "+g),b&&(n=e.join(", ")+", or "+g)}else n=t.inspect(e[0]);n=(y>1?"keys ":"key ")+n,n=(r(this,"contains")?"contain ":"have ")+n,this.assert(d,"expected #{this} to "+p+n,"expected #{this} to not "+p+n,w.slice(0).sort(t.compareByInspect),i.sort(t.compareByInspect),!0)}function M(e,o,i){i&&r(this,"message",i);var s,a=r(this,"object"),c=r(this,"ssfi"),u=r(this,"message"),f=r(this,"negate")||!1;new n(a,u,c,!0).is.a("function"),(e instanceof RegExp||"string"==typeof e)&&(o=e,e=null);try{a()}catch(e){s=e}var p=void 0===e&&void 0===o,d=Boolean(e&&o),l=!1,h=!1;if(p||!p&&!f){var y="an error";e instanceof Error?y="#{exp}":e&&(y=t.checkError.getConstructorName(e)),this.assert(s,"expected #{this} to throw "+y,"expected #{this} to not throw an error but #{act} was thrown",e&&e.toString(),s instanceof Error?s.toString():"string"==typeof s?s:s&&t.checkError.getConstructorName(s))}if(e&&s){if(e instanceof Error)t.checkError.compatibleInstance(s,e)===f&&(d&&f?l=!0:this.assert(f,"expected #{this} to throw #{exp} but #{act} was thrown","expected #{this} to not throw #{exp}"+(s&&!f?" but #{act} was thrown":""),e.toString(),s.toString()));t.checkError.compatibleConstructor(s,e)===f&&(d&&f?l=!0:this.assert(f,"expected #{this} to throw #{exp} but #{act} was thrown","expected #{this} to not throw #{exp}"+(s?" but #{act} was thrown":""),e instanceof Error?e.toString():e&&t.checkError.getConstructorName(e),s instanceof Error?s.toString():s&&t.checkError.getConstructorName(s)))}if(s&&void 0!==o&&null!==o){var b="including";o instanceof RegExp&&(b="matching"),t.checkError.compatibleMessage(s,o)===f&&(d&&f?h=!0:this.assert(f,"expected #{this} to throw error "+b+" #{exp} but got #{act}","expected #{this} to throw error not "+b+" #{exp}",o,t.checkError.getMessage(s)))}l&&h&&this.assert(f,"expected #{this} to throw #{exp} but #{act} was thrown","expected #{this} to not throw #{exp}"+(s?" but #{act} was thrown":""),e instanceof Error?e.toString():e&&t.checkError.getConstructorName(e),s instanceof Error?s.toString():s&&t.checkError.getConstructorName(s)),r(this,"object",s)}function S(e,n){n&&r(this,"message",n);var o=r(this,"object"),i=r(this,"itself"),s="function"!=typeof o||i?o[e]:o.prototype[e];this.assert("function"==typeof s,"expected #{this} to respond to "+t.inspect(e),"expected #{this} to not respond to "+t.inspect(e))}function N(e,n){n&&r(this,"message",n);var o=e(r(this,"object"));this.assert(o,"expected #{this} to satisfy "+t.objDisplay(e),"expected #{this} to not satisfy"+t.objDisplay(e),!r(this,"negate"),o)}function P(e,t,i){i&&r(this,"message",i);var s=r(this,"object"),a=r(this,"message"),c=r(this,"ssfi");if(new n(s,a,c,!0).is.a("number"),"number"!=typeof e||"number"!=typeof t)throw new o((a=a?a+": ":"")+"the arguments to closeTo or approximately must be numbers",void 0,c);this.assert(Math.abs(s-e)<=t,"expected #{this} to be close to "+e+" +/- "+t,"expected #{this} not to be close to "+e+" +/- "+t)}function k(e,t,o){o&&r(this,"message",o);var i,s=r(this,"object"),a=r(this,"message"),c=r(this,"ssfi");new n(s,a,c,!0).is.a("function"),t?(new n(e,a,c,!0).to.have.property(t),i=e[t]):(new n(e,a,c,!0).is.a("function"),i=e()),s();var u=void 0===t||null===t?e():e[t],f=void 0===t||null===t?i:"."+t;r(this,"deltaMsgObj",f),r(this,"initialDeltaValue",i),r(this,"finalDeltaValue",u),r(this,"deltaBehavior","change"),r(this,"realDelta",u!==i),this.assert(i!==u,"expected "+f+" to change","expected "+f+" to not change")}function E(e,t,o){o&&r(this,"message",o);var i,s=r(this,"object"),a=r(this,"message"),c=r(this,"ssfi");new n(s,a,c,!0).is.a("function"),t?(new n(e,a,c,!0).to.have.property(t),i=e[t]):(new n(e,a,c,!0).is.a("function"),i=e()),new n(i,a,c,!0).is.a("number"),s();var u=void 0===t||null===t?e():e[t],f=void 0===t||null===t?i:"."+t;r(this,"deltaMsgObj",f),r(this,"initialDeltaValue",i),r(this,"finalDeltaValue",u),r(this,"deltaBehavior","increase"),r(this,"realDelta",u-i),this.assert(u-i>0,"expected "+f+" to increase","expected "+f+" to not increase")}function A(e,t,o){o&&r(this,"message",o);var i,s=r(this,"object"),a=r(this,"message"),c=r(this,"ssfi");new n(s,a,c,!0).is.a("function"),t?(new n(e,a,c,!0).to.have.property(t),i=e[t]):(new n(e,a,c,!0).is.a("function"),i=e()),new n(i,a,c,!0).is.a("number"),s();var u=void 0===t||null===t?e():e[t],f=void 0===t||null===t?i:"."+t;r(this,"deltaMsgObj",f),r(this,"initialDeltaValue",i),r(this,"finalDeltaValue",u),r(this,"deltaBehavior","decrease"),r(this,"realDelta",i-u),this.assert(u-i<0,"expected "+f+" to decrease","expected "+f+" to not decrease")}["to","be","been","is","and","has","have","with","that","which","at","of","same","but","does","still"].forEach(function(e){n.addProperty(e)}),n.addProperty("not",function(){r(this,"negate",!0)}),n.addProperty("deep",function(){r(this,"deep",!0)}),n.addProperty("nested",function(){r(this,"nested",!0)}),n.addProperty("own",function(){r(this,"own",!0)}),n.addProperty("ordered",function(){r(this,"ordered",!0)}),n.addProperty("any",function(){r(this,"any",!0),r(this,"all",!1)}),n.addProperty("all",function(){r(this,"all",!0),r(this,"any",!1)}),n.addChainableMethod("an",i),n.addChainableMethod("a",i),n.addChainableMethod("include",c,a),n.addChainableMethod("contain",c,a),n.addChainableMethod("contains",c,a),n.addChainableMethod("includes",c,a),n.addProperty("ok",function(){this.assert(r(this,"object"),"expected #{this} to be truthy","expected #{this} to be falsy")}),n.addProperty("true",function(){this.assert(!0===r(this,"object"),"expected #{this} to be true","expected #{this} to be false",!r(this,"negate"))}),n.addProperty("false",function(){this.assert(!1===r(this,"object"),"expected #{this} to be false","expected #{this} to be true",!!r(this,"negate"))}),n.addProperty("null",function(){this.assert(null===r(this,"object"),"expected #{this} to be null","expected #{this} not to be null")}),n.addProperty("undefined",function(){this.assert(void 0===r(this,"object"),"expected #{this} to be undefined","expected #{this} not to be undefined")}),n.addProperty("NaN",function(){this.assert(t.isNaN(r(this,"object")),"expected #{this} to be NaN","expected #{this} not to be NaN")}),n.addProperty("exist",function(){var e=r(this,"object");this.assert(null!==e&&void 0!==e,"expected #{this} to exist","expected #{this} to not exist")}),n.addProperty("empty",function(){var e,n=r(this,"object"),i=r(this,"ssfi"),s=r(this,"message");switch(s=s?s+": ":"",t.type(n).toLowerCase()){case"array":case"string":e=n.length;break;case"map":case"set":e=n.size;break;case"weakmap":case"weakset":throw new o(s+".empty was passed a weak collection",void 0,i);case"function":var a=s+".empty was passed a function "+t.getName(n);throw new o(a.trim(),void 0,i);default:if(n!==Object(n))throw new o(s+".empty was passed non-string primitive "+t.inspect(n),void 0,i);e=Object.keys(n).length}this.assert(0===e,"expected #{this} to be empty","expected #{this} not to be empty")}),n.addProperty("arguments",u),n.addProperty("Arguments",u),n.addMethod("equal",f),n.addMethod("equals",f),n.addMethod("eq",f),n.addMethod("eql",p),n.addMethod("eqls",p),n.addMethod("above",d),n.addMethod("gt",d),n.addMethod("greaterThan",d),n.addMethod("least",l),n.addMethod("gte",l),n.addMethod("below",h),n.addMethod("lt",h),n.addMethod("lessThan",h),n.addMethod("most",y),n.addMethod("lte",y),n.addMethod("within",function(e,i,s){s&&r(this,"message",s);var a,c=r(this,"object"),u=r(this,"doLength"),f=r(this,"message"),p=f?f+": ":"",d=r(this,"ssfi"),l=t.type(c).toLowerCase(),h=t.type(e).toLowerCase(),y=t.type(i).toLowerCase(),b=!0,m="date"===h&&"date"===y?e.toUTCString()+".."+i.toUTCString():e+".."+i;if(u&&"map"!==l&&"set"!==l&&new n(c,f,d,!0).to.have.property("length"),u||"date"!==l||"date"===h&&"date"===y)if("number"===h&&"number"===y||!u&&"number"!==l)if(u||"date"===l||"number"===l)b=!1;else{a=p+"expected "+("string"===l?"'"+c+"'":c)+" to be a number or a date"}else a=p+"the arguments to within must be numbers";else a=p+"the arguments to within must be dates";if(b)throw new o(a,void 0,d);if(u){var w,g="length";"map"===l||"set"===l?(g="size",w=c.size):w=c.length,this.assert(w>=e&&w<=i,"expected #{this} to have a "+g+" within "+m,"expected #{this} to not have a "+g+" within "+m)}else this.assert(c>=e&&c<=i,"expected #{this} to be within "+m,"expected #{this} to not be within "+m)}),n.addMethod("instanceof",b),n.addMethod("instanceOf",b),n.addMethod("property",m),n.addMethod("ownProperty",w),n.addMethod("haveOwnProperty",w),n.addMethod("ownPropertyDescriptor",g),n.addMethod("haveOwnPropertyDescriptor",g),n.addChainableMethod("length",x,v),n.addChainableMethod("lengthOf",x,v),n.addMethod("match",O),n.addMethod("matches",O),n.addMethod("string",function(e,o){o&&r(this,"message",o);var i=r(this,"object"),s=r(this,"message"),a=r(this,"ssfi");new n(i,s,a,!0).is.a("string"),this.assert(~i.indexOf(e),"expected #{this} to contain "+t.inspect(e),"expected #{this} to not contain "+t.inspect(e))}),n.addMethod("keys",j),n.addMethod("key",j),n.addMethod("throw",M),n.addMethod("throws",M),n.addMethod("Throw",M),n.addMethod("respondTo",S),n.addMethod("respondsTo",S),n.addProperty("itself",function(){r(this,"itself",!0)}),n.addMethod("satisfy",N),n.addMethod("satisfies",N),n.addMethod("closeTo",P),n.addMethod("approximately",P),n.addMethod("members",function(e,o){o&&r(this,"message",o);var i=r(this,"object"),s=r(this,"message"),a=r(this,"ssfi");new n(i,s,a,!0).to.be.an("array"),new n(e,s,a,!0).to.be.an("array");var c,u,f,p=r(this,"contains"),d=r(this,"ordered");p?(u="expected #{this} to be "+(c=d?"an ordered superset":"a superset")+" of #{exp}",f="expected #{this} to not be "+c+" of #{exp}"):(u="expected #{this} to have the same "+(c=d?"ordered members":"members")+" as #{exp}",f="expected #{this} to not have the same "+c+" as #{exp}");var l=r(this,"deep")?t.eql:void 0;this.assert(function(e,t,n,o,r){if(!o){if(e.length!==t.length)return!1;t=t.slice()}return e.every(function(e,i){if(r)return n?n(e,t[i]):e===t[i];if(!n){var s=t.indexOf(e);return-1!==s&&(o||t.splice(s,1),!0)}return t.some(function(r,i){return!!n(e,r)&&(o||t.splice(i,1),!0)})})}(e,i,l,p,d),u,f,e,i,!0)}),n.addMethod("oneOf",function(e,t){t&&r(this,"message",t);var o=r(this,"object"),i=r(this,"message"),s=r(this,"ssfi");new n(e,i,s,!0).to.be.an("array"),this.assert(e.indexOf(o)>-1,"expected #{this} to be one of #{exp}","expected #{this} to not be one of #{exp}",e,o)}),n.addMethod("change",k),n.addMethod("changes",k),n.addMethod("increase",E),n.addMethod("increases",E),n.addMethod("decrease",A),n.addMethod("decreases",A),n.addMethod("by",function(e,t){t&&r(this,"message",t);var n,o=r(this,"deltaMsgObj"),i=r(this,"initialDeltaValue"),s=r(this,"finalDeltaValue"),a=r(this,"deltaBehavior"),c=r(this,"realDelta");n="change"===a?Math.abs(s-i)===Math.abs(e):c===Math.abs(e),this.assert(n,"expected "+o+" to "+a+" by "+e,"expected "+o+" to not "+a+" by "+e)}),n.addProperty("extensible",function(){var e=r(this,"object"),t=e===Object(e)&&Object.isExtensible(e);this.assert(t,"expected #{this} to be extensible","expected #{this} to not be extensible")}),n.addProperty("sealed",function(){var e=r(this,"object"),t=e!==Object(e)||Object.isSealed(e);this.assert(t,"expected #{this} to be sealed","expected #{this} to not be sealed")}),n.addProperty("frozen",function(){var e=r(this,"object"),t=e!==Object(e)||Object.isFrozen(e);this.assert(t,"expected #{this} to be frozen","expected #{this} to not be frozen")}),n.addProperty("finite",function(e){var t=r(this,"object");this.assert("number"==typeof t&&isFinite(t),"expected #{this} to be a finite number","expected #{this} to not be a finite number")})}},function(e,t,n){
/*!
 * chai
 * http://chaijs.com
 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
var o=n(3);e.exports=function(e,t){
/*!
   * Module dependencies.
   */
var n=e.AssertionError,r=t.flag;
/*!
   * Module export.
   */
/*!
   * Assertion Constructor
   *
   * Creates object for chaining.
   *
   * `Assertion` objects contain metadata in the form of flags. Three flags can
   * be assigned during instantiation by passing arguments to this constructor:
   *
   * - `object`: This flag contains the target of the assertion. For example, in
   *   the assertion `expect(numKittens).to.equal(7);`, the `object` flag will
   *   contain `numKittens` so that the `equal` assertion can reference it when
   *   needed.
   *
   * - `message`: This flag contains an optional custom error message to be
   *   prepended to the error message that's generated by the assertion when it
   *   fails.
   *
   * - `ssfi`: This flag stands for "start stack function indicator". It
   *   contains a function reference that serves as the starting point for
   *   removing frames from the stack trace of the error that's created by the
   *   assertion when it fails. The goal is to provide a cleaner stack trace to
   *   end users by removing Chai's internal functions. Note that it only works
   *   in environments that support `Error.captureStackTrace`, and only when
   *   `Chai.config.includeStack` hasn't been set to `false`.
   *
   * - `lockSsfi`: This flag controls whether or not the given `ssfi` flag
   *   should retain its current value, even as assertions are chained off of
   *   this object. This is usually set to `true` when creating a new assertion
   *   from within another assertion. It's also temporarily set to `true` before
   *   an overwritten assertion gets called by the overwriting assertion.
   *
   * @param {Mixed} obj target of the assertion
   * @param {String} msg (optional) custom error message
   * @param {Function} ssfi (optional) starting point for removing stack frames
   * @param {Boolean} lockSsfi (optional) whether or not the ssfi flag is locked
   * @api private
   */
function i(e,n,o,s){return r(this,"ssfi",o||i),r(this,"lockSsfi",s),r(this,"object",e),r(this,"message",n),t.proxify(this)}e.Assertion=i,Object.defineProperty(i,"includeStack",{get:function(){return console.warn("Assertion.includeStack is deprecated, use chai.config.includeStack instead."),o.includeStack},set:function(e){console.warn("Assertion.includeStack is deprecated, use chai.config.includeStack instead."),o.includeStack=e}}),Object.defineProperty(i,"showDiff",{get:function(){return console.warn("Assertion.showDiff is deprecated, use chai.config.showDiff instead."),o.showDiff},set:function(e){console.warn("Assertion.showDiff is deprecated, use chai.config.showDiff instead."),o.showDiff=e}}),i.addProperty=function(e,n){t.addProperty(this.prototype,e,n)},i.addMethod=function(e,n){t.addMethod(this.prototype,e,n)},i.addChainableMethod=function(e,n,o){t.addChainableMethod(this.prototype,e,n,o)},i.overwriteProperty=function(e,n){t.overwriteProperty(this.prototype,e,n)},i.overwriteMethod=function(e,n){t.overwriteMethod(this.prototype,e,n)},i.overwriteChainableMethod=function(e,n,o){t.overwriteChainableMethod(this.prototype,e,n,o)},i.prototype.assert=function(e,i,s,a,c,u){var f=t.test(this,arguments);if(!1!==u&&(u=!0),void 0===a&&void 0===c&&(u=!1),!0!==o.showDiff&&(u=!1),!f){i=t.getMessage(this,arguments);var p=t.getActual(this,arguments);throw new n(i,{actual:p,expected:a,showDiff:u},o.includeStack?this.assert:r(this,"ssfi"))}},
/*!
   * ### ._obj
   *
   * Quick reference to stored `actual` value for plugin developers.
   *
   * @api private
   */
Object.defineProperty(i.prototype,"_obj",{get:function(){return r(this,"object")},set:function(e){r(this,"object",e)}})}},function(e,t){e.exports=Number.isNaN||
/*!
 * Chai - isNaN utility
 * Copyright(c) 2012-2015 Sakthipriyan Vairamani <thechargingvolcano@gmail.com>
 * MIT Licensed
 */
function(e){return e!=e}},function(e,t,n){"use strict";var o=/\s*function(?:\s|\s*\/\*[^(?:*\/)]+\*\/\s*)*([^\(\/]+)/;function r(e){var t="";if(void 0===e.name){var n=String(e).match(o);n&&(t=n[1])}else t=e.name;return t}e.exports={compatibleInstance:function(e,t){return t instanceof Error&&e===t},compatibleConstructor:function(e,t){return t instanceof Error?e.constructor===t.constructor||e instanceof t.constructor:(t.prototype instanceof Error||t===Error)&&(e.constructor===t||e instanceof t)},compatibleMessage:function(e,t){var n="string"==typeof e?e:e.message;return t instanceof RegExp?t.test(n):"string"==typeof t&&-1!==n.indexOf(t)},getMessage:function(e){var t="";return e&&e.message?t=e.message:"string"==typeof e&&(t=e),t},getConstructorName:function(e){var t=e;return e instanceof Error?t=r(e.constructor):"function"==typeof e&&(t=r(e).trim()||r(new e)),t}}},function(e,t,n){
/*!
 * Chai - getOwnEnumerableProperties utility
 * Copyright(c) 2011-2016 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
/*!
 * Module dependencies
 */
var o=n(9);e.exports=function(e){return Object.keys(e).concat(o(e))}},function(e,t,n){
/*!
 * Chai - compareByInspect utility
 * Copyright(c) 2011-2016 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
/*!
 * Module dependencies
 */
var o=n(7);e.exports=function(e,t){return o(e)<o(t)?-1:1}},function(e,t,n){
/*!
 * Chai - overwriteChainableMethod utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
var o=n(2),r=n(1);e.exports=function(e,t,n,i){var s=e.__methods[t],a=s.chainingBehavior;s.chainingBehavior=function(){var e=i(a).call(this);if(void 0!==e)return e;var t=new o.Assertion;return r(this,t),t};var c=s.method;s.method=function(){var e=n(c).apply(this,arguments);if(void 0!==e)return e;var t=new o.Assertion;return r(this,t),t}}},function(e,t,n){
/*!
 * Chai - addChainingMethod utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
/*!
 * Module dependencies
 */
var o=n(5),r=n(2),i=n(0),s=n(4),a=n(1),c="function"==typeof Object.setPrototypeOf,u=function(){},f=Object.getOwnPropertyNames(u).filter(function(e){var t=Object.getOwnPropertyDescriptor(u,e);return"object"!=typeof t||!t.configurable}),p=Function.prototype.call,d=Function.prototype.apply;e.exports=function(e,t,n,u){"function"!=typeof u&&(u=function(){});var l={method:n,chainingBehavior:u};e.__methods||(e.__methods={}),e.__methods[t]=l,Object.defineProperty(e,t,{get:function(){l.chainingBehavior.call(this);var n=function(){i(this,"lockSsfi")||i(this,"ssfi",n);var e=l.method.apply(this,arguments);if(void 0!==e)return e;var t=new r.Assertion;return a(this,t),t};if(o(n,t,!0),c){var u=Object.create(this);u.call=p,u.apply=d,Object.setPrototypeOf(n,u)}else{Object.getOwnPropertyNames(e).forEach(function(t){if(-1===f.indexOf(t)){var o=Object.getOwnPropertyDescriptor(e,t);Object.defineProperty(n,t,o)}})}return a(this,n),s(n)},configurable:!0})}},function(e,t,n){
/*!
 * Chai - overwriteMethod utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
var o=n(5),r=n(2),i=n(0),s=n(4),a=n(1);e.exports=function(e,t,n){var c=e[t],u=function(){throw new Error(t+" is not a function")};c&&"function"==typeof c&&(u=c);var f=function(){i(this,"lockSsfi")||i(this,"ssfi",f);var e=i(this,"lockSsfi");i(this,"lockSsfi",!0);var t=n(u).apply(this,arguments);if(i(this,"lockSsfi",e),void 0!==t)return t;var o=new r.Assertion;return a(this,o),o};o(f,t,!1),e[t]=s(f,t)}},function(e,t,n){
/*!
 * Chai - overwriteProperty utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
var o=n(2),r=n(0),i=n(6),s=n(1);e.exports=function(e,t,n){var a=Object.getOwnPropertyDescriptor(e,t),c=function(){};a&&"function"==typeof a.get&&(c=a.get),Object.defineProperty(e,t,{get:function e(){i()||r(this,"lockSsfi")||r(this,"ssfi",e);var t=r(this,"lockSsfi");r(this,"lockSsfi",!0);var a=n(c).call(this);if(r(this,"lockSsfi",t),void 0!==a)return a;var u=new o.Assertion;return s(this,u),u},configurable:!0})}},function(e,t,n){
/*!
 * Chai - addMethod utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
var o=n(5),r=n(2),i=n(0),s=n(4),a=n(1);e.exports=function(e,t,n){var c=function(){i(this,"lockSsfi")||i(this,"ssfi",c);var e=n.apply(this,arguments);if(void 0!==e)return e;var t=new r.Assertion;return a(this,t),t};o(c,t,!1),e[t]=s(c,t)}},function(e,t,n){
/*!
 * Chai - addProperty utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
var o=n(2),r=n(0),i=n(6),s=n(1);e.exports=function(e,t,n){n=void 0===n?function(){}:n,Object.defineProperty(e,t,{get:function e(){i()||r(this,"lockSsfi")||r(this,"ssfi",e);var t=n.call(this);if(void 0!==t)return t;var a=new o.Assertion;return s(this,a),a},configurable:!0})}},function(e,t,n){"use strict";
/*!
 * deep-eql
 * Copyright(c) 2013 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */var o=n(8);function r(){this._key="chai/deep-eql__"+Math.random()+Date.now()}r.prototype={get:function(e){return e[this._key]},set:function(e,t){Object.isExtensible(e)&&Object.defineProperty(e,this._key,{value:t,configurable:!0})}};var i="function"==typeof WeakMap?WeakMap:r;
/*!
 * Check to see if the MemoizeMap has recorded a result of the two operands
 *
 * @param {Mixed} leftHandOperand
 * @param {Mixed} rightHandOperand
 * @param {MemoizeMap} memoizeMap
 * @returns {Boolean|null} result
*/function s(e,t,n){if(!n||b(e)||b(t))return null;var o=n.get(e);if(o){var r=o.get(t);if("boolean"==typeof r)return r}return null}
/*!
 * Set the result of the equality into the MemoizeMap
 *
 * @param {Mixed} leftHandOperand
 * @param {Mixed} rightHandOperand
 * @param {MemoizeMap} memoizeMap
 * @param {Boolean} result
*/function a(e,t,n,o){if(n&&!b(e)&&!b(t)){var r=n.get(e);r?r.set(t,o):((r=new i).set(t,o),n.set(e,r))}}
/*!
 * Primary Export
 */function c(e,t,n){if(n&&n.comparator)return f(e,t,n);var o=u(e,t);return null!==o?o:f(e,t,n)}function u(e,t){return e===t?0!==e||1/e==1/t:e!=e&&t!=t||!b(e)&&!b(t)&&null}
/*!
 * The main logic of the `deepEqual` function.
 *
 * @param {Mixed} leftHandOperand
 * @param {Mixed} rightHandOperand
 * @param {Object} [options] (optional) Additional options
 * @param {Array} [options.comparator] (optional) Override default algorithm, determining custom equality.
 * @param {Array} [options.memoize] (optional) Provide a custom memoization object which will cache the results of
    complex objects for a speed boost. By passing `false` you can disable memoization, but this will cause circular
    references to blow the stack.
 * @return {Boolean} equal match
*/function f(e,t,n){(n=n||{}).memoize=!1!==n.memoize&&(n.memoize||new i);var r=n&&n.comparator,f=s(e,t,n.memoize);if(null!==f)return f;var b=s(t,e,n.memoize);if(null!==b)return b;if(r){var m=r(e,t);if(!1===m||!0===m)return a(e,t,n.memoize,m),m;var w=u(e,t);if(null!==w)return w}var g=o(e);if(g!==o(t))return a(e,t,n.memoize,!1),!1;a(e,t,n.memoize,!0);var v=function(e,t,n,o){switch(n){case"String":case"Number":case"Boolean":case"Date":return c(e.valueOf(),t.valueOf());case"Promise":case"Symbol":case"function":case"WeakMap":case"WeakSet":case"Error":return e===t;case"Arguments":case"Int8Array":case"Uint8Array":case"Uint8ClampedArray":case"Int16Array":case"Uint16Array":case"Int32Array":case"Uint32Array":case"Float32Array":case"Float64Array":case"Array":return d(e,t,o);case"RegExp":
/*!
 * Compare two Regular Expressions for equality.
 *
 * @param {RegExp} leftHandOperand
 * @param {RegExp} rightHandOperand
 * @return {Boolean} result
 */
return function(e,t){return e.toString()===t.toString()}
/*!
 * Compare two Sets/Maps for equality. Faster than other equality functions.
 *
 * @param {Set} leftHandOperand
 * @param {Set} rightHandOperand
 * @param {Object} [options] (Optional)
 * @return {Boolean} result
 */(e,t);case"Generator":
/*!
 * Simple equality for generator objects such as those returned by generator functions.
 *
 * @param {Iterable} leftHandOperand
 * @param {Iterable} rightHandOperand
 * @param {Object} [options] (Optional)
 * @return {Boolean} result
 */
return function(e,t,n){return d(h(e),h(t),n)}
/*!
 * Determine if the given object has an @@iterator function.
 *
 * @param {Object} target
 * @return {Boolean} `true` if the object has an @@iterator function.
 */(e,t,o);case"DataView":return d(new Uint8Array(e.buffer),new Uint8Array(t.buffer),o);case"ArrayBuffer":return d(new Uint8Array(e),new Uint8Array(t),o);case"Set":case"Map":return p(e,t,o);default:
/*!
 * Recursively check the equality of two Objects. Once basic sameness has been established it will defer to `deepEqual`
 * for each enumerable key in the object.
 *
 * @param {Mixed} leftHandOperand
 * @param {Mixed} rightHandOperand
 * @param {Object} [options] (Optional)
 * @return {Boolean} result
 */
return function(e,t,n){var o=y(e),r=y(t);if(o.length&&o.length===r.length)return o.sort(),r.sort(),!1!==d(o,r)&&
/*!
 * Determines if two objects have matching values, given a set of keys. Defers to deepEqual for the equality check of
 * each key. If any value of the given key is not equal, the function will return false (early).
 *
 * @param {Mixed} leftHandOperand
 * @param {Mixed} rightHandOperand
 * @param {Array} keys An array of keys to compare the values of leftHandOperand and rightHandOperand against
 * @param {Object} [options] (Optional)
 * @return {Boolean} result
 */
function(e,t,n,o){var r=n.length;if(0===r)return!0;for(var i=0;i<r;i+=1)if(!1===c(e[n[i]],t[n[i]],o))return!1;return!0}(e,t,o,n);var i=l(e),s=l(t);if(i.length&&i.length===s.length)return i.sort(),s.sort(),d(i,s,n);if(0===o.length&&0===i.length&&0===r.length&&0===s.length)return!0;return!1}
/*!
 * Returns true if the argument is a primitive.
 *
 * This intentionally returns true for all objects that can be compared by reference,
 * including functions and symbols.
 *
 * @param {Mixed} value
 * @return {Boolean} result
 */(e,t,o)}}(e,t,g,n);return a(e,t,n.memoize,v),v}function p(e,t,n){if(e.size!==t.size)return!1;if(0===e.size)return!0;var o=[],r=[];return e.forEach(function(e,t){o.push([e,t])}),t.forEach(function(e,t){r.push([e,t])}),d(o.sort(),r.sort(),n)}
/*!
 * Simple equality for flat iterable objects such as Arrays, TypedArrays or Node.js buffers.
 *
 * @param {Iterable} leftHandOperand
 * @param {Iterable} rightHandOperand
 * @param {Object} [options] (Optional)
 * @return {Boolean} result
 */function d(e,t,n){var o=e.length;if(o!==t.length)return!1;if(0===o)return!0;for(var r=-1;++r<o;)if(!1===c(e[r],t[r],n))return!1;return!0}
/*!
 * Gets all iterator entries from the given Object. If the Object has no @@iterator function, returns an empty array.
 * This will consume the iterator - which could have side effects depending on the @@iterator implementation.
 *
 * @param {Object} target
 * @returns {Array} an array of entries from the @@iterator function
 */
function l(e){if(function(e){return"undefined"!=typeof Symbol&&"object"==typeof e&&void 0!==Symbol.iterator&&"function"==typeof e[Symbol.iterator]}(e))try{return h(e[Symbol.iterator]())}catch(e){return[]}return[]}
/*!
 * Gets all entries from a Generator. This will consume the generator - which could have side effects.
 *
 * @param {Generator} target
 * @returns {Array} an array of entries from the Generator.
 */function h(e){for(var t=e.next(),n=[t.value];!1===t.done;)t=e.next(),n.push(t.value);return n}
/*!
 * Gets all own and inherited enumerable keys from a target.
 *
 * @param {Object} target
 * @returns {Array} an array of own and inherited enumerable keys from the target.
 */function y(e){var t=[];for(var n in e)t.push(n);return t}function b(e){return null===e||"object"!=typeof e}e.exports=c,e.exports.MemoizeMap=i},function(e,t){
/*!
 * Chai - getEnumerableProperties utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
e.exports=function(e){var t=[];for(var n in e)t.push(n);return t}},function(e,t,n){
/*!
 * Chai - message composition utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
/*!
 * Module dependencies
 */
var o=n(0),r=n(13),i=n(12);e.exports=function(e,t){var n=o(e,"negate"),s=o(e,"object"),a=t[3],c=r(e,t),u=n?t[2]:t[1],f=o(e,"message");return"function"==typeof u&&(u=u()),u=(u=u||"").replace(/#\{this\}/g,function(){return i(s)}).replace(/#\{act\}/g,function(){return i(c)}).replace(/#\{exp\}/g,function(){return i(a)}),f?f+": "+u:u}},function(e,t,n){
/*!
 * Chai - expectTypes utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
var o=n(14),r=n(0),i=n(8);e.exports=function(e,t){var n=r(e,"message"),s=r(e,"ssfi");n=n?n+": ":"",e=r(e,"object"),(t=t.map(function(e){return e.toLowerCase()})).sort();var a=t.map(function(e,n){var o=~["a","e","i","o","u"].indexOf(e.charAt(0))?"an":"a";return(t.length>1&&n===t.length-1?"or ":"")+o+" "+e}).join(", "),c=i(e).toLowerCase();if(!t.some(function(e){return c===e}))throw new o(n+"object tested must be "+a+", but "+c+" given",void 0,s)}},function(e,t){var n;n=function(){return this}();try{n=n||Function("return this")()||(0,eval)("this")}catch(e){"object"==typeof window&&(n=window)}e.exports=n},function(e,t,n){
/*!
 * Chai - test utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
/*!
 * Module dependencies
 */
var o=n(0);e.exports=function(e,t){var n=o(e,"negate"),r=t[0];return n?!r:r}},function(e,t,n){"use strict";function o(e,t){return void 0!==e&&null!==e&&t in Object(e)}function r(e){return e.replace(/([^\\])\[/g,"$1.[").match(/(\\\.|[^.]+?)+/g).map(function(e){var t=/^\[(\d+)\]$/.exec(e);return t?{i:parseFloat(t[1])}:{p:e.replace(/\\([.\[\]])/g,"$1")}})}function i(e,t,n){var o=e,r=null;n=void 0===n?t.length:n;for(var i=0;i<n;i++){var s=t[i];o&&(o=void 0===s.p?o[s.i]:o[s.p],i===n-1&&(r=o))}return r}function s(e,t){var n=r(t),s=n[n.length-1],a={parent:n.length>1?i(e,n,n.length-1):e,name:s.p||s.i,value:i(e,n)};return a.exists=o(a.parent,a.name),a}e.exports={hasProperty:o,getPathInfo:s,getPathValue:function(e,t){return s(e,t).value},setPathValue:function(e,t,n){return function(e,t,n){for(var o=e,r=n.length,i=null,s=0;s<r;s++){var a=null,c=null;if(i=n[s],s===r-1)o[a=void 0===i.p?i.i:i.p]=t;else if(void 0!==i.p&&o[i.p])o=o[i.p];else if(void 0!==i.i&&o[i.i])o=o[i.i];else{var u=n[s+1];a=void 0===i.p?i.i:i.p,c=void 0===u.p?[]:{},o[a]=c,o=o[a]}}}(e,n,r(t)),e}}},function(e,t,n){
/*!
 * chai
 * Copyright(c) 2011 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
/*!
 * Dependencies that are used for multiple exports are required here only once
 */
var o=n(37);
/*!
 * test utility
 */t.test=n(36),
/*!
 * type utility
 */
t.type=n(8),
/*!
 * expectTypes utility
 */
t.expectTypes=n(34),
/*!
 * message utility
 */
t.getMessage=n(33),
/*!
 * actual utility
 */
t.getActual=n(13),
/*!
 * Inspect util
 */
t.inspect=n(7),
/*!
 * Object Display util
 */
t.objDisplay=n(12),
/*!
 * Flag utility
 */
t.flag=n(0),
/*!
 * Flag transferring utility
 */
t.transferFlags=n(1),
/*!
 * Deep equal utility
 */
t.eql=n(31),
/*!
 * Deep path info
 */
t.getPathInfo=o.getPathInfo,
/*!
 * Check if a property exists
 */
t.hasProperty=o.hasProperty,
/*!
 * Function name
 */
t.getName=n(11),
/*!
 * add Property
 */
t.addProperty=n(30),
/*!
 * add Method
 */
t.addMethod=n(29),
/*!
 * overwrite Property
 */
t.overwriteProperty=n(28),
/*!
 * overwrite Method
 */
t.overwriteMethod=n(27),
/*!
 * Add a chainable method
 */
t.addChainableMethod=n(26),
/*!
 * Overwrite chainable method
 */
t.overwriteChainableMethod=n(25),
/*!
 * Compare by inspect method
 */
t.compareByInspect=n(24),
/*!
 * Get own enumerable property symbols method
 */
t.getOwnEnumerablePropertySymbols=n(9),
/*!
 * Get own enumerable properties method
 */
t.getOwnEnumerableProperties=n(23),
/*!
 * Checks error against a given set of criteria
 */
t.checkError=n(22),
/*!
 * Proxify util
 */
t.proxify=n(4),
/*!
 * addLengthGuard util
 */
t.addLengthGuard=n(5),
/*!
 * isProxyEnabled helper
 */
t.isProxyEnabled=n(6),
/*!
 * isNaN method
 */
t.isNaN=n(21)},function(e,t,n){e.exports=n(2)},function(e,t,n){"use strict";var o=n(39);function r(e){return document.querySelector("#root").innerHTML=e}describe("Presto",function(){afterEach(function(){r("")}),describe("Component",function(){describe("scan",function(){it("returns a Map",function(){var e=Presto.Component.scan();o.assert.typeOf(e,"Map"),o.assert.equal(e.size,0)}),it("finds a component",function(){r('\n          <div class="presto-component-instance" id="iA">\n            <div class="presto-component" id="cA">\n              Counter is: 1\n            </div>\n          </div>        \n        ');var e=Presto.Component.scan();o.assert.equal(e.size,1),o.assert.deepEqual(Array.from(e.keys()),["cA"]);var t=document.querySelector(".presto-component-instance#iA");(0,o.assert)(e.get("cA").has(t))}),it("finds several components",function(){r('\n          <div class="presto-component-instance" id="iA">\n            <div class="presto-component" id="cA">\n              Counter is: 1\n            </div>\n          </div>        \n          <div class="presto-component-instance" id="iB">\n            <div class="presto-component" id="cB">\n              Counter is: 1\n            </div>\n          </div>        \n          <div class="presto-component-instance" id="iC">\n            <div class="presto-component" id="cC">\n              Counter is: 1\n            </div>\n          </div>        \n        ');var e=Presto.Component.scan();o.assert.equal(e.size,3),o.assert.deepEqual(Array.from(e.keys()),["cA","cB","cC"]);var t=document.querySelector(".presto-component-instance#iA"),n=document.querySelector(".presto-component-instance#iB"),i=document.querySelector(".presto-component-instance#iC");(0,o.assert)(e.get("cA").has(t)),(0,o.assert)(e.get("cB").has(n)),(0,o.assert)(e.get("cC").has(i))})})})})}])});