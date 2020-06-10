export let TestHelpers = {

  resetDocument() {
    return document.body.innerHTML = `<div id="root"></div>`;
  },

  setRoot(what) {
    return document.querySelector('#root').innerHTML = what;
  },

  collectWarnings(f) {
    var oldWarn = console.warn;
    var warnings = [];

    try {
      console.warn = (...s) => {
        warnings.push(...s);
        // oldWarn(...s)
      };
      f();
    } finally {
      console.warn = oldWarn;
    }

    return warnings;
  }
}