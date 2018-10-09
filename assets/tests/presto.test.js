'use strict'

// import $ from '../node_modules/cash-dom/dist/cash.esm.js'

var assert = chai.assert;

function setRoot(what) {
  return document.querySelector('#root').innerHTML = what;
}

describe('PrestoLib', () => {

  afterEach(function () {
    setRoot('');
  });

  ////////////////
  // PRESTO
  ////////////////
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
        presto.onEvent(function (event) {
          fired = event.type;
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
        presto.onEvent(function (event) {
          fired = event.type;
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
        presto.onEvent(function (event) {
          fired = event.type;
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
  });


  ////////////////
  // COMPONENT
  ////////////////
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
    });
  });
});

