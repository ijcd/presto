import { Component } from "../js/presto"
import { TestHelpers } from "./test_helpers"
import $ from 'cash-dom';

describe('Component', () => {

  beforeEach(function () {
    TestHelpers.resetDocument();
  });

  describe('scan', () => {
    it('returns a Map', () => {
      var ps = Component.scan();

      expect(ps).toBeInstanceOf(Map);
      expect(ps.size).toBe(0);
    });

    it('finds a component', () => {
      TestHelpers.setRoot(`
        <div class="presto-component-instance" id="iA">
          <div class="presto-component" id="cA">
            Counter is: 1
          </div>
        </div>        
      `)
      var ps = Component.scan();

      expect(ps.size).toBe(1);
      expect(Array.from(ps.keys())).toStrictEqual(['cA']);
      expect(ps.get('cA').has('iA')).toBe(true);
    });

    it('finds several components', () => {
      TestHelpers.setRoot(`
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
      var ps = Component.scan();

      expect(ps.size).toBe(3);
      expect(Array.from(ps.keys())).toStrictEqual(['cA', 'cB', 'cC']);

      expect(ps.get('cA').has('iA')).toBe(true);
      expect(ps.get('cB').has('iB')).toBe(true);
      expect(ps.get('cC').has('iC')).toBe(true);
    });

    it('finds two component instances for the same component-id', () => {
      TestHelpers.setRoot(`
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
      var ps = Component.scan();

      expect(ps.size).toBe(2);
      expect(Array.from(ps.keys())).toStrictEqual(['cA', 'cC']);

      expect(ps.get('cA').has('iA')).toBe(true);
      expect(ps.get('cA').has('iB')).toBe(true);
      expect(ps.get('cC').has('iC')).toBe(true);
    });
  });

  describe('update', () => {
    it('updates a component', () => {
      TestHelpers.setRoot(`
        <div class="presto-component-instance" id="iA">
          <div class="presto-component" id="cA">
            Counter is: 1
          </div>
        </div>        
      `)

      Component.update('cA', `
        <div class="presto-component" id="cA">
          Counter is: 2
        </div>
      `)

      expect($('div.presto-component-instance#iA .presto-component#cA').text().trim()).toEqual('Counter is: 2');
    });

    it('only updates component with matching component-id', () => {
      TestHelpers.setRoot(`
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

      Component.update('cA', `
        <div class="presto-component" id="cA">
          Counter is: 2
        </div>
      `)

      expect($('div.presto-component-instance#iA .presto-component#cA').text().trim()).toStrictEqual('Counter is: 2');
      expect($('div.presto-component-instance#iB .presto-component#cB').text().trim()).toStrictEqual('Counter is: 1');
    });

    it('updates all components with same component-id', () => {
      TestHelpers.setRoot(`
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

      Component.update('cA', `
        <div class="presto-component" id="cA">
          Counter is: 2
        </div>
      `)

      expect($('div.presto-component-instance#iA .presto-component#cA').text().trim()).toStrictEqual('Counter is: 2');
      expect($('div.presto-component-instance#iB .presto-component#cA').text().trim()).toStrictEqual('Counter is: 2');
    });


    it('preserves focus', () => {
      TestHelpers.setRoot(`
        <div class="presto-component-instance" id="iA">
          <div class="presto-component" id="cA">
            Counter is: 1
          </div>
        </div>        
      `)

      $('#cA')[0].focus()
      var startingActive = document.activeElement;

      Component.update('cA', `
        <div class="presto-component" id="cA">
          Counter is: 2
        </div>
      `)

      expect($('div.presto-component-instance#iA .presto-component#cA').text().trim()).toStrictEqual('Counter is: 2');
      expect(document.activeElement).toEqual(startingActive);
    });

    it('warns about update for missing component-id', () => {
      TestHelpers.setRoot(`
        <div class="presto-component-instance" id="iA">
          <div class="presto-component" id="cA">
            Counter is: 1
          </div>
        </div>        
      `);

      var warnings = TestHelpers.collectWarnings(() => {
        Component.update('doesNotExist', `
          <div class="presto-component" id="cA">
            Counter is: 2
          </div>
        `);
      });

      expect(warnings).toStrictEqual(["[Presto] Ignoring request to update unknown componentId: doesNotExist"]);
    });
  });
});
