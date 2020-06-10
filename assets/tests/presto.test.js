'use strict'

import $ from "cash-dom";
import { Presto } from '../js/presto';
import { TestHelpers } from './test_helpers'

describe('PrestoLib', () => {

  beforeEach(function () {
    TestHelpers.resetDocument();
  });

  ////////////
  // PRESTO //
  ////////////

  describe('Presto', () => {

    describe('constructor', () => {
      it('constructs', () => {
        var presto = new Presto();
        expect(presto).toBeTruthy();
      });
    });

    describe('bindEvents', () => {
      it('binds events at the component level', () => {
        TestHelpers.setRoot(`
          <div class="presto-component-instance" id="iA">
            <div class="presto-component" id="cA">
              Counter is: 1
              <button id="theButton" class="presto-click presto-mouseenter presto-mousedown">Click Me</button>
            </div>
          </div>        
        `)
        var presto = new Presto()

        var fired = false;
        presto.bindEvents()
        presto.onEvent(function (prestoEvent) {
          // fired = prestoEvent.type; // cash-dom is having issues, using meta instead
          fired = prestoEvent.meta;
        })

        $('button#theButton').trigger('click')
        expect(fired).toBe('click.presto');
        fired = false;

        $('button#theButton').trigger('mouseenter')
        expect(fired).toBe('mouseenter.presto');
        fired = false;

        $('button#theButton').trigger('mousedown')
        expect(fired).toBe('mousedown.presto');
        fired = false;
      });

      it('binds events at the body level', () => {
        $('body').addClass('presto-click')
        $('body').addClass('presto-mouseenter')
        $('body').addClass('presto-mousedown')
        var presto = new Presto()

        var fired = false;
        presto.bindEvents()
        presto.onEvent(function (prestoEvent) {
          // fired = prestoEvent.type; // cash-dom is having issues, using meta instead
          fired = prestoEvent.meta;
        })

        $('#root').trigger('click')
        expect(fired).toBe('click.presto');
        fired = false;

        $('#root').trigger('mouseenter')
        expect(fired).toBe('mouseenter.presto');
        fired = false;

        $('#root').trigger('mousedown')
        expect(fired).toBe('mousedown.presto');
        fired = false;
      });
    });

    describe('unbindEvents', () => {
      it('unbinds all events in namespace', () => {
        TestHelpers.setRoot(`
          <div class="presto-component-instance" id="iA">
            <div class="presto-component" id="cA">
              Counter is: 1
              <button id="theButton" class="presto-click presto-mouseenter presto-mousedown">Click Me</button>
            </div>
          </div>        
        `)
        var presto = new Presto()

        var fired = false;
        presto.bindEvents();
        presto.onEvent(function (prestoEvent) {
          // fired = prestoEvent.type; // cash-dom is having issues, using meta instead
          fired = prestoEvent.meta;
        })

        // verify working
        $('button#theButton').trigger('click')
        expect(fired).toBe('click.presto');
        fired = false;

        $('#root').trigger('click')
        expect(fired).toBe('click.presto');
        fired = false;

        // unbind
        presto.unbindEvents();

        // verify unbound
        $('button#theButton').trigger('click')
        expect(fired).toBe(false);

        $('button#theButton').trigger('mouseenter')
        expect(fired).toBe(false);

        $('button#theButton').trigger('mousedown')
        expect(fired).toBe(false);

        $('#root').trigger('click')
        expect(fired).toBe(false);

        $('#root').trigger('mouseenter')
        expect(fired).toBe(false);

        $('#root').trigger('mousedown')
        expect(fired).toBe(false);
      });
    });

    describe('handleCommand', () => {
      describe('unknown command', () => {

        it('warns by default', () => {
          var presto = new Presto()
          var fooload = { name: "foo" };

          var warnings = TestHelpers.collectWarnings(() => {
            presto.handleCommand(fooload);
          });

          expect(warnings).toStrictEqual(["[Presto] Unable to handle payload: ", fooload]);
        });

        it('calls a custom function', () => {
          var presto = new Presto()
          var fooload = { name: "foo" };

          var called = false;
          var calledWith = null;
          presto.handleCommandUnknown = (payload) => {
            called = true;
            calledWith = payload;
          };

          presto.handleCommand(fooload);

          expect(called).toBe(true);
          expect(calledWith).toBe(fooload);
        });
      });

      describe('update_component', () => {
        it('updates a component', () => {
          TestHelpers.setRoot(`
          <div class="presto-component-instance" id="iA">
            <div class="presto-component" id="cA">
              Counter is: 1
            </div>
          </div>        
        `)
          var presto = new Presto();

          presto.handleCommand({
            name: "update_component",
            component_id: "cA",
            content: `<div class="presto-component" id="cA">Counter is: 2</div>`
          });

          expect(
            $('div.presto-component-instance#iA .presto-component#cA').text().trim()
          ).toEqual('Counter is: 2');
        });

        it('calls pre/post update hooks', () => {
          TestHelpers.setRoot(`
          <div class="presto-component-instance" id="iA">
            <div class="presto-component" id="cA">
              Counter is: 1
            </div>
          </div>        
        `)
          var calls = [];
          var presto = new Presto();

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
            component_id: "cA",
            content: `<div class="presto-component" id="cA">Counter is: 2</div>`
          });

          expect(calls).toStrictEqual(["pre 1", "pre 2", "post 1", "post 2"]);
        });
      });
    });

    describe('onEvent', () => {
      it('runs callback with annotated DOM event', () => {
        TestHelpers.setRoot(`
            <div class="presto-component-instance" id="iA">
              <div class="presto-component" id="cA">
                Counter is: 1
                <button id="theButton" class="presto-click presto-mouseenter presto-mousedown">Click Me</button>
              </div>
            </div>        
          `)
        var presto = new Presto()

        var theEvent = null;
        debugger;
        presto.bindEvents()
        presto.onEvent(function (prestoEvent) {
          theEvent = prestoEvent;
        })

        $('button#theButton').trigger('click')
        expect(theEvent.element).toEqual("BUTTON");
        expect(theEvent.type).toEqual("click");
        expect(theEvent.attrs).toStrictEqual({ id: "theButton", class: "presto-click presto-mouseenter presto-mousedown" });
        expect(theEvent.id).toEqual("theButton");
        expect(theEvent.instance_id).toEqual("iA");
        expect(theEvent.component_id).toEqual("cA");
      });

      it('handles nested components properly', () => {
        TestHelpers.setRoot(`
          <div class="presto-component-instance" id="ilA">
            <div class="presto-component" id="clA">
              <div class="presto-component-instance" id="iA">
                <div class="presto-component" id="cA">
                  Counter is: 1
                  <button id="theButton" class="presto-click presto-mouseenter presto-mousedown">Click Me</button>
                </div>
              </div>        
            </div>
          </div>        
        `)
        var presto = new Presto()

        var theEvent = null;
        presto.bindEvents()
        presto.onEvent(function (prestoEvent) {
          theEvent = prestoEvent;
        })

        $('button#theButton').trigger('click')
        expect(theEvent.element).toEqual("BUTTON");
        expect(theEvent.type).toEqual("click");
        expect(theEvent.attrs).toStrictEqual({ id: "theButton", class: "presto-click presto-mouseenter presto-mousedown" });
        expect(theEvent.id).toEqual("theButton");
        expect(theEvent.instance_id).toEqual("iA");
        expect(theEvent.component_id).toEqual("cA");
      });
    });
  });
});
