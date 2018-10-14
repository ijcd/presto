'use strict'

/**
* Presto JavaScript client
*
* ## Setup
*
* Presto needs a Phoenix channel to communiacate on. It also needs a
* reference to an Unpoly object for DOM manipulation.
*
* ```javascript
*     import "presto"
*     import unpoly from "unpoly/dist/unpoly.js"
*
*     let presto = new Presto(channel, up);
* ```
*
* @module presto
*/

// import $ from 'cash-dom'
import unpoly from 'unpoly'
// up.log.enable();

export class Component {

  /**
   * returns a map, indexing .presto.component-instance elements
   * by their corresponding .presto-component#id (component-id)
   */
  static scan() {
    var m = new Map();

    // find all component instances in the page
    var elements = document.querySelectorAll('.presto-component-instance');
    Array.prototype.forEach.call(elements, function(pci, i){
          // find the component for this instance (should only be one)
      var pcc = pci.querySelector('.presto-component')

      // get the current instance set, initializing if not yet found
      var instances = m.get(pcc.id);
      if (!instances) {
        instances = new Set();
      } 

      // add instance to instances set, 
      instances.add(pci.id);
      m.set(pcc.id, instances);
    });

    return m;
  }

  static update(componentId, content) {
    var focused = document.activeElement;
    try {
      Component.doUpdate(componentId, content);
    } 
    finally {
      focused.focus();
    }
  }

  static doUpdate(componentId, content) {
    // TODO: implement this by listening for DOM mutation events instead (don't scan every time)
    var components = Component.scan();
    var instances = components.get(componentId)

    switch (instances) {
      case undefined:
        console.warn("[Presto] Ignoring request to update unknown componentId: " + componentId);
        break;
      default:
        for (var instanceId of components.get(componentId)) {
          var decorated = `<div class="presto-component-instance" id="${instanceId}">` + content + '</div>'
          up.extract(`div.presto-component-instance#${instanceId}`, decorated);
        }  
    }
  }
}

// https://stackoverflow.com/questions/9368538/getting-an-array-of-all-dom-events-possible
function allEventNames() {
  return Object.getOwnPropertyNames(document).concat(Object.getOwnPropertyNames(Object.getPrototypeOf(Object.getPrototypeOf(document)))).concat(Object.getOwnPropertyNames(Object.getPrototypeOf(window))).filter(function(i){return !i.indexOf("on")&&(document[i]==null||typeof document[i]=="function");}).filter(function(elem, pos, self){return self.indexOf(elem) == pos;});
}


export class Presto { 
  constructor() {
    this.callbacks = {
      onEvent: [],
      preUpdate: [],
      postUpdate: []
    };
    this.eventNamespace = '.presto'

    this.allEventNames = allEventNames().map((name) => {
      return name.replace(/^on/, '');
    });
  }

  bindEvents() {
    var self = this;

    // Attach a delegated event handler
    this.allEventNames.forEach((eventName) => {
      var prestoClass = '.presto-' + eventName;
      var namespacedName = eventName + this.eventNamespace;

      // events attached to internal elements
      $('body').on(namespacedName, prestoClass, (event) => {
        self.runEventHooks(event);
      });

      // events attached to the body
      $('body' + prestoClass).on(namespacedName, (event) => {
        self.runEventHooks(event);
      });
    });
  }

  unbindEvents() {
    $('body').off(self.eventNamespace);
  }

  onEvent      (callback){ this.callbacks.onEvent.push(callback) }
  onPreUpdate  (callback){ this.callbacks.preUpdate.push(callback) }
  onPostUpdate (callback){ this.callbacks.postUpdate.push(callback) }

  runEventHooks(payload){
    this.callbacks.onEvent.forEach( callback => callback(payload) )
  }

  runPreUpdateHooks(payload){
    this.callbacks.preUpdate.forEach( callback => callback(payload) )
  }

  runPostUpdateHooks(payload){
    this.callbacks.postUpdate.forEach( callback => callback(payload) )
  }

// this.channel.on("presto", payload => {
//   console.log("RECEIVED", payload)
//   self.handleCommand(payload)
// }

  handleCommand(payload) {
    var {name: name} = payload;
    switch (name) {
      case "update_component": {
        this.runPreUpdateHooks(payload);
        this.handleCommandUpdateComponent(payload);
        this.runPostUpdateHooks(payload);
        break;
      }
      default:
        this.handleCommandUnknown(payload);
    }
  }

  handleCommandUpdateComponent(payload) {
    var {componentId: componentId, content: content} = payload;
    Component.update(componentId, content);
  }

  handleCommandUnknown(payload) {
    console.warn("[Presto] Unable to handle payload: ", payload);
  }

//   pushEvent(eventName, event) {
//     var $elem = $(event.target);
//     var $component = $elem.parents(".presto-component").toArray().reverse()[0];
//     var $instance = $elem.parents(".presto-component-instance").toArray().reverse()[0];

//     var fullEvent = eventName;
//     if (event.keyCode) {
//       fullEvent = [eventName, event.keyCode]
//     }

//     var prestoEvent = {
//       element: $elem.prop('tagName'),
//       event: fullEvent,
//       attrs: $elem.attr(),
//       id: $elem.prop('id'),
//       component_id: $component.id,
//       instance_id: $instance.id,
//     }

//     console.log("SENDING", prestoEvent)

//     this.channel.push("presto", prestoEvent);
//   }
// }

// class Presto {
//   constructor(channel, unpoly){
//     var self = this;

//     this.channel              = channel;
//     this.unpoly               = unpoly;
//     this.callbacks = {preUpdate: [], postUpdate: []};

// // TODO: remove need to extend jQuery
// // TODO: write some javascript tests

// // Extend jQuery with attr()
// (function(old) {
//   $.fn.attr = function() {
//     if(arguments.length === 0) {
//       if(this.length === 0) {
//         return null;
//       }

//       var obj = {};
//       $.each(this[0].attributes, function() {
//         if(this.specified) {
//           obj[this.name] = this.value;
//         }
//       });
//       return obj;
//     }

//     return old.apply(this, arguments);
//   };
// })($.fn.attr);


// console.log(event);
// // self.pushEvent(eventName, event);



//     this.channel              = channel;
//     this.unpoly               = unpoly;
}
