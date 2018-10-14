'use strict'

// import $ from '../node_modules/cash-dom/dist/cash.esm.js'

var assert = chai.assert;

describe('PrestoLib', () => {

  afterEach(function () {
    setRoot('');
  });

  ////////////
  // PRESTO //
  ////////////
  
  describe('Presto', () => {

    describe('constructor', () => {
      it('constructs', () => {
        var presto = new Presto.Presto()
        assert(presto);
      });
    });

    describe('bindEvents', () => {
      it('binds events at the component level', () => {
        setRoot(`
          <div class="presto-component-instance" id="iA">
            <div class="presto-component" id="cA">
              Counter is: 1
              <button id="theButton" class="presto-click presto-mouseenter presto-mousedown">Click Me</button>
            </div>
          </div>        
        `)
        var presto = new Presto.Presto()

        var fired = false;
        presto.bindEvents()
        presto.onEvent(function (prestoEvent) {
          fired = prestoEvent.type;
        })

        $('button#theButton').trigger('click')
        assert.equal(fired, 'click');
        fired = false;

        $('button#theButton').trigger('mouseenter')
        assert.equal(fired, 'mouseenter');
        fired = false;

        $('button#theButton').trigger('mousedown')
        assert.equal(fired, 'mousedown');
        fired = false;
      });

      it('binds events at the body level', () => {
        $('body').addClass('presto-click')
        $('body').addClass('presto-mouseenter')
        $('body').addClass('presto-mousedown')
        var presto = new Presto.Presto()

        var fired = false;
        presto.bindEvents()
        presto.onEvent(function (prestoEvent) {
          fired = prestoEvent.type;
        })

        $('#root').trigger('click')
        assert.equal(fired, 'click');
        fired = false;

        $('#root').trigger('mouseenter')
        assert.equal(fired, 'mouseenter');
        fired = false;

        $('#root').trigger('mousedown')
        assert.equal(fired, 'mousedown');
        fired = false;
      });
    });

    describe('unbindEvents', () => {
      it('unbinds all events in namespace', () => {
        setRoot(`
          <div class="presto-component-instance" id="iA">
            <div class="presto-component" id="cA">
              Counter is: 1
              <button id="theButton" class="presto-click presto-mouseenter presto-mousedown">Click Me</button>
            </div>
          </div>        
        `)
        var presto = new Presto.Presto()

        var fired = false;
        presto.bindEvents();
        presto.onEvent(function (prestoEvent) {
          fired = prestoEvent.type;
        })

        // verify working
        $('button#theButton').trigger('click')
        assert.equal(fired, 'click');
        fired = false;

        $('#root').trigger('click')
        assert.equal(fired, 'click');
        fired = false;

        // unbind
        presto.unbindEvents();

        // verify unbound
        $('button#theButton').trigger('click')
        assert.equal(fired, false);

        $('button#theButton').trigger('mouseenter')
        assert.equal(fired, false);

        $('button#theButton').trigger('mousedown')
        assert.equal(fired, false);

        $('#root').trigger('click')
        assert.equal(fired, false);

        $('#root').trigger('mouseenter')
        assert.equal(fired, false);

        $('#root').trigger('mousedown')
        assert.equal(fired, false);
      });
    });

    describe('handleCommand', () => {
      describe('unknown command', () => {

        it('warns by default', () => {
          var presto = new Presto.Presto()
          var fooload = {name: "foo"};

          var warnings = collectWarnings(() => {
            presto.handleCommand(fooload);
          });

          
          assert.deepEqual(warnings, ["[Presto] Unable to handle payload: ", fooload]);
        });

        it('calls a custom function', () => {          
          var presto = new Presto.Presto()          
          var fooload = {name: "foo"};

          var called = false;
          var calledWith = null;
          presto.handleCommandUnknown = (payload) => {
            called = true;
            calledWith = payload;
          };

          presto.handleCommand(fooload);

          assert.equal(called, true);
          assert.equal(calledWith, fooload);
        });


      });

      describe('update_component', () => {
        it('updates a component', () => {
          setRoot(`
            <div class="presto-component-instance" id="iA">
              <div class="presto-component" id="cA">
                Counter is: 1
              </div>
            </div>        
          `)
          var presto = new Presto.Presto();

          presto.handleCommand({
            name: "update_component",
            component_id: "cA",
            content: `<div class="presto-component" id="cA">Counter is: 2</div>`
          });
  
          assert.equal($('div.presto-component-instance#iA .presto-component#cA').text().trim(), 'Counter is: 2');
        });

        it('calls pre/post update hooks', () => {
          setRoot(`
            <div class="presto-component-instance" id="iA">
              <div class="presto-component" id="cA">
                Counter is: 1
              </div>
            </div>        
          `)          
          var calls = [];
          var presto = new Presto.Presto();

          presto.onPreUpdate(() => {
            calls.push("pre 1");
          });
          presto.onPreUpdate(() => {
            calls.push("pre 2");
          });
          presto.onPostUpdate(() => {
            calls.push("post 1");
          });
          presto.onPostUpdate(() => {
            calls.push("post 2");
          });

          presto.handleCommand({
            name: "update_component",
            componentId: "cA",
            content: `<div class="presto-component" id="cA">Counter is: 2</div>`
          });

          assert.deepEqual(calls, ["pre 1", "pre 2", "post 1", "post 2"]);
        });
      });
    });

    describe('onEvent', () => {
      it('runs callback with annotated DOM event', () => {
        setRoot(`
          <div class="presto-component-instance" id="iA">
            <div class="presto-component" id="cA">
              Counter is: 1
              <button id="theButton" class="presto-click presto-mouseenter presto-mousedown">Click Me</button>
            </div>
          </div>        
        `)
        var presto = new Presto.Presto()

        var theEvent = null;
        presto.bindEvents()
        presto.onEvent(function (prestoEvent) {
          theEvent = prestoEvent;
        })

        $('button#theButton').trigger('click')
        console.log("theEvent", theEvent);
        assert.equal(theEvent.element, "BUTTON");
        assert.equal(theEvent.type, "click");
        assert.deepEqual(theEvent.attrs, {id: "theButton", class: "presto-click presto-mouseenter presto-mousedown"});
        assert.equal(theEvent.id, "theButton");
        assert.equal(theEvent.instance_id, "iA");
        assert.equal(theEvent.component_id, "cA");

        // fired = false;

        // $('button#theButton').trigger('mouseenter')
        // assert.equal(fired, 'mouseenter');
        // fired = false;

        // $('button#theButton').trigger('mousedown')
        // assert.equal(fired, 'mousedown');
        // fired = false;
      });
    });
  });

  ///////////////
  // COMPONENT //
  ///////////////

  describe('Component', () => {

    describe('scan', () => {
      it('returns a Map', () => {
        var ps = Presto.Component.scan();

        assert.typeOf(ps, 'Map');
        assert.equal(ps.size, 0);
      });

      it('finds a component', () => {
        setRoot(`
          <div class="presto-component-instance" id="iA">
            <div class="presto-component" id="cA">
              Counter is: 1
            </div>
          </div>        
        `)
        var ps = Presto.Component.scan();

        assert.equal(ps.size, 1);
        assert.deepEqual(Array.from(ps.keys()), ['cA']);

        assert(ps.get('cA').has('iA'))
      });

      it('finds several components', () => {
        setRoot(`
          <div class="presto-component-instance" id="iA">
            <div class="presto-component" id="cA">
              Counter is: 1
            </div>
          </div>        
          <div class="presto-component-instance" id="iB">
            <div class="presto-component" id="cB">
              Counter is: 1
            </div>
          </div>        
          <div class="presto-component-instance" id="iC">
            <div class="presto-component" id="cC">
              Counter is: 1
            </div>
          </div>        
        `)
        var ps = Presto.Component.scan();

        assert.equal(ps.size, 3);
        assert.deepEqual(Array.from(ps.keys()), ['cA', 'cB', 'cC']);

        assert(ps.get('cA').has('iA'))
        assert(ps.get('cB').has('iB'))
        assert(ps.get('cC').has('iC'))
      });

      it('finds two component instances for the same component-id', () => {
        setRoot(`
          <div class="presto-component-instance" id="iA">
            <div class="presto-component" id="cA">
              Counter is: 1
            </div>
          </div>        
          <div class="presto-component-instance" id="iB">
            <div class="presto-component" id="cA">
              Counter is: 1
            </div>
          </div>        
          <div class="presto-component-instance" id="iC">
            <div class="presto-component" id="cC">
              Counter is: 1
            </div>
          </div>        
        `)
        var ps = Presto.Component.scan();

        assert.equal(ps.size, 2);
        assert.deepEqual(Array.from(ps.keys()), ['cA', 'cC']);

        assert(ps.get('cA').has('iA'))
        assert(ps.get('cA').has('iB'))
        assert(ps.get('cC').has('iC'))
      });
    });


    describe('update', () => {
      it('updates a component', () => {
        setRoot(`
          <div class="presto-component-instance" id="iA">
            <div class="presto-component" id="cA">
              Counter is: 1
            </div>
          </div>        
        `)

        Presto.Component.update('cA', `
          <div class="presto-component" id="cA">
            Counter is: 2
          </div>
        `)

        assert.equal($('div.presto-component-instance#iA .presto-component#cA').text().trim(), 'Counter is: 2');
      });

      it('only updates component with matching component-id', () => {
        setRoot(`
          <div class="presto-component-instance" id="iA">
            <div class="presto-component" id="cA">
              Counter is: 1
            </div>
          </div>        
          <div class="presto-component-instance" id="iB">
            <div class="presto-component" id="cB">
              Counter is: 1
            </div>
          </div>        
        `)

        Presto.Component.update('cA', `
          <div class="presto-component" id="cA">
            Counter is: 2
          </div>
        `)

        assert.equal($('div.presto-component-instance#iA .presto-component#cA').text().trim(), 'Counter is: 2');
        assert.equal($('div.presto-component-instance#iB .presto-component#cB').text().trim(), 'Counter is: 1');
      });

      it('updates all components with same component-id', () => {
        setRoot(`
          <div class="presto-component-instance" id="iA">
            <div class="presto-component" id="cA">
              Counter is: 1
            </div>
          </div>        
          <div class="presto-component-instance" id="iB">
            <div class="presto-component" id="cA">
              Counter is: 1
            </div>
          </div>        
        `)

        Presto.Component.update('cA', `
          <div class="presto-component" id="cA">
            Counter is: 2
          </div>
        `)

        assert.equal($('div.presto-component-instance#iA .presto-component#cA').text().trim(), 'Counter is: 2');
        assert.equal($('div.presto-component-instance#iB .presto-component#cA').text().trim(), 'Counter is: 2');
      });


      it('preserves focus', () => {
        setRoot(`
          <div class="presto-component-instance" id="iA">
            <div class="presto-component" id="cA">
              Counter is: 1
            </div>
          </div>        
        `)

        $('#cA').focus()
        var startingActive = document.activeElement;

        Presto.Component.update('cA', `
          <div class="presto-component" id="cA">
            Counter is: 2
          </div>
        `)

        assert.equal($('div.presto-component-instance#iA .presto-component#cA').text().trim(), 'Counter is: 2');
        assert.equal(document.activeElement, startingActive);
      });

      it('warns about update for missing component-id', () => {
        setRoot(`
          <div class="presto-component-instance" id="iA">
            <div class="presto-component" id="cA">
              Counter is: 1
            </div>
          </div>        
        `);
        
        var warnings = collectWarnings(() => {
          Presto.Component.update('doesNotExist', `
          <div class="presto-component" id="cA">
            Counter is: 2
          </div>
          `);
        });

        assert.deepEqual(warnings, ["[Presto] Ignoring request to update unknown componentId: doesNotExist"]);
      });
    });
  });
});


/////////////
// HELPERS //
/////////////

function setRoot(what) {
  return document.querySelector('#root').innerHTML = what;
}

function collectWarnings(f) {
  var oldWarn = console.warn;
  var warnings = [];

  try {
    console.warn = (...s) => {
      warnings.push(...s);
      oldWarn(...s)
    };
    f();
  } finally {
    console.warn = oldWarn;
  }

  return warnings;
}