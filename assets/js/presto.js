'use strict'

/* global document */

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
*
*     let presto = new Presto(channel, up);
* ```
*
* @module presto
*/

import { Browser } from './browser';
export { Browser };

import { DOM } from './dom';
export { DOM };

import { Component } from './component';
export { Component };

import $ from 'cash-dom';

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
        var prestoEvent = self.prepareEvent(namespacedName, event);
        self.runEventHooks(prestoEvent);
      });

      // events attached to the body
      $('body' + prestoClass).on(namespacedName, (event) => {
        var prestoEvent = self.prepareEvent(namespacedName, event);
        self.runEventHooks(prestoEvent);
      });
    });
  }

  bindChannel(channel) {
    var self = this;

    self.onEvent(function (prestoEvent) {
      console.debug("[Presto] sending event", prestoEvent);
      channel.push("presto", prestoEvent);
    });

    channel.on("presto", payload => {
      console.debug("[Presto] got event", payload);
      self.handleCommand(payload);
    });
  }

  unbindEvents() {
    $('body').off(self.eventNamespace);
  }

  onEvent(callback) { this.callbacks.onEvent.push(callback) }
  onPreUpdate(callback) { this.callbacks.preUpdate.push(callback) }
  onPostUpdate(callback) { this.callbacks.postUpdate.push(callback) }

  runEventHooks(payload) {
    this.callbacks.onEvent.forEach(callback => callback(payload))
  }

  runPreUpdateHooks(payload) {
    this.callbacks.preUpdate.forEach(callback => callback(payload))
  }

  runPostUpdateHooks(payload) {
    this.callbacks.postUpdate.forEach(callback => callback(payload))
  }

  handleCommand(payload) {
    var { name: name } = payload;
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
    var { component_id: componentId, content: content } = payload;
    Component.update(componentId, content);
  }

  handleCommandUnknown(payload) {
    console.warn("[Presto] Unable to handle payload: ", payload);
  }

  prepareEvent(name, event) {
    var $elem = $(event.target);

    // var $instance = $elem.parents(".presto-component-instance").toArray()[0];
    // var $component = $elem.parents(".presto-component").toArray()[0];
    var $instance = $elem.parents(".presto-component-instance");
    var $component = $elem.parents(".presto-component");

    var meta = name;
    if (event.keyCode) {
      meta = [name, event.keyCode]
    }

    var prestoEvent = {
      element: $elem.prop('tagName'),
      type: event.type,
      meta: meta,
      attrs: $elem.attr(),
      id: $elem.prop('id'),
      instance_id: $instance && $instance.attr('id'),
      component_id: $component && $component.attr('id')
    }

    return prestoEvent;
  }
}

// https://stackoverflow.com/questions/9368538/getting-an-array-of-all-dom-events-possible
function allEventNames() {
  if (typeof jest !== 'undefined') {
    return ["onreadystatechange", "onpointerlockchange", "onpointerlockerror", "onbeforecopy", "onbeforecut", "onbeforepaste", "onfreeze", "onresume", "onsearch", "onsecuritypolicyviolation", "onvisibilitychange", "oncopy", "oncut", "onpaste", "onabort", "onblur", "oncancel", "oncanplay", "oncanplaythrough", "onchange", "onclick", "onclose", "oncontextmenu", "oncuechange", "ondblclick", "ondrag", "ondragend", "ondragenter", "ondragleave", "ondragover", "ondragstart", "ondrop", "ondurationchange", "onemptied", "onended", "onerror", "onfocus", "onformdata", "oninput", "oninvalid", "onkeydown", "onkeypress", "onkeyup", "onload", "onloadeddata", "onloadedmetadata", "onloadstart", "onmousedown", "onmouseenter", "onmouseleave", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "onmousewheel", "onpause", "onplay", "onplaying", "onprogress", "onratechange", "onreset", "onresize", "onscroll", "onseeked", "onseeking", "onselect", "onstalled", "onsubmit", "onsuspend", "ontimeupdate", "ontoggle", "onvolumechange", "onwaiting", "onwebkitanimationend", "onwebkitanimationiteration", "onwebkitanimationstart", "onwebkittransitionend", "onwheel", "onauxclick", "ongotpointercapture", "onlostpointercapture", "onpointerdown", "onpointermove", "onpointerup", "onpointercancel", "onpointerover", "onpointerout", "onpointerenter", "onpointerleave", "onselectstart", "onselectionchange", "onanimationend", "onanimationiteration", "onanimationstart", "ontransitionend", "onfullscreenchange", "onfullscreenerror", "onwebkitfullscreenchange", "onwebkitfullscreenerror", "onpointerrawupdate"]
  } else {
    return Object.getOwnPropertyNames(document).concat(Object.getOwnPropertyNames(Object.getPrototypeOf(Object.getPrototypeOf(document)))).concat(Object.getOwnPropertyNames(Object.getPrototypeOf(window))).filter(function (i) { return !i.indexOf("on") && (document[i] == null || typeof document[i] == "function"); }).filter(function (elem, pos, self) { return self.indexOf(elem) == pos; });
  }
}

// Extend jQuery with attr()
(function (old) {
  $.fn.attr = function () {
    if (arguments.length === 0) {
      if (this.length === 0) {
        return null;
      }

      var obj = {};
      $.each(this[0].attributes, function () {
        if (this.specified) {
          obj[this.name] = this.value;
        }
      });
      return obj;
    }

    return old.apply(this, arguments);
  };
})($.fn.attr);