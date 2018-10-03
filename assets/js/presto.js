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

// TODO: remove need to extend jQuery
// TODO: write some javascript tests

// Extend jQuery with attr()
(function(old) {
  $.fn.attr = function() {
    if(arguments.length === 0) {
      if(this.length === 0) {
        return null;
      }

      var obj = {};
      $.each(this[0].attributes, function() {
        if(this.specified) {
          obj[this.name] = this.value;
        }
      });
      return obj;
    }

    return old.apply(this, arguments);
  };
})($.fn.attr);


class Presto {
  constructor(channel, unpoly){
    var self = this;

    this.channel              = channel;
    this.unpoly               = unpoly;
    this.stateChangeCallbacks = {preUpdate: [], postUpdate: []};

    // pull event names out of the DOM
    this.allEventNames = Object.getOwnPropertyNames(document).concat(Object.getOwnPropertyNames(Object.getPrototypeOf(Object.getPrototypeOf(document)))).concat(Object.getOwnPropertyNames(Object.getPrototypeOf(window))).filter(function(i){return !i.indexOf("on")&&(document[i]==null||typeof document[i]=="function");}).filter(function(elem, pos, self){return self.indexOf(elem) == pos;});

    // Attach a delegated event handler
    this.allEventNames.forEach(function(eventName) {
      var eventName = eventName.replace(/^on/, "");
      var prestoClass = ".presto-" + eventName;

      // events attached to internal elements
      $("body").on(eventName, prestoClass, function(event) {
        self.pushEvent(eventName, event);
      });

      // events attached to the body
      $("body" + prestoClass).on(eventName, function(event) {
        self.pushEvent(eventName, event);
      });
    });

    this.channel.on("presto", payload => {
      var {name: name} = payload;

      switch (name) {
        case "update_component": {

          self.runPreUpdateHooks(payload);

          var {component_selector: component_selector, content: content} = payload;
          var focused = document.activeElement;
          self.unpoly.extract(component_selector, content);
          $(focused).focus();

          self.runPostUpdateHooks(payload);

          break;
        }
      }
    });
  }

  onPreUpdate  (callback){ this.stateChangeCallbacks.preUpdate.push(callback) }
  onPostUpdate (callback){ this.stateChangeCallbacks.postUpdate.push(callback) }

  runPreUpdateHooks(payload){
    this.stateChangeCallbacks.preUpdate.forEach( callback => callback(payload) )
  }

  runPostUpdateHooks(payload){
    this.stateChangeCallbacks.postUpdate.forEach( callback => callback(payload) )
  }

  pushEvent(eventName, event) {
    var $elem = $(event.target);
    var $component = $elem.parents(".presto-component").toArray().reverse()[0];
    var $instance = $elem.parents(".presto-component-root").toArray().reverse()[0];

    this.channel.push("presto", {
      element: $elem.prop('tagName'),
      event: eventName,
      key_code: event.keyCode,
      attrs: $elem.attr(),
      id: $elem.prop('id'),
      component_id: $component.id,
      instance_id: $instance.id,
    });
  }
}

export {Presto};
