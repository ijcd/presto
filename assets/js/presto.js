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
*     let presto = new Presto(channel, unpoly);
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
      $("body").on(eventName, ".presto-" + eventName, function(event) {
        var $elem = $(this);
        $elem = $(event.target);
        self.push(eventName, $elem);
      });
    });

    this.channel.on("presto", payload => {
      var {name: name} = payload;

      switch (name) {
        case "update_component": {

          self.runPreUpdateHooks(payload);

          var {component_id: component_id, content: content} = payload;
          var focused = document.activeElement;
          self.unpoly.extract("#" + component_id, content);
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

  push(eventName, $elem) {
    this.channel.push("presto", {
      element: $elem.prop('tagName'),
      event: eventName,
      attrs: $elem.attr(),
      id: $elem.prop('id')
    });
  }
}

export {Presto};
