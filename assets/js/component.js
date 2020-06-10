import morphdom from "morphdom"
import $ from 'cash-dom';

export class Component {

  /**
   * returns a map, indexing .presto.component-instance elements
   * by their corresponding .presto-component#id (component-id)
   */
  static scan() {
    var m = new Map();

    // find all component instances in the page
    var elements = document.querySelectorAll('.presto-component-instance');
    Array.prototype.forEach.call(elements, function (pci, i) {
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

  // TODO: what is the instanceID stuff all about again? I don't recall...
  // I think maybe it was something to do with the way up.extract could only update children of the root node?
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
          var targetNode = $(`div.presto-component-instance#${instanceId}`)[0];
          morphdom(targetNode, decorated);
        }
    }
  }
}