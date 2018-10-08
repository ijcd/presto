'use strict'

var assert = chai.assert;

function setRoot(what) {
  return document.querySelector('#root').innerHTML = what;
}

describe('Presto', () => {

  afterEach(function () {
    setRoot('');
  });

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

        var instanceA = document.querySelector('.presto-component-instance#iA');
        assert(ps.get('cA').has(instanceA))        
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

        var instanceA = document.querySelector('.presto-component-instance#iA');
        var instanceB = document.querySelector('.presto-component-instance#iB');
        var instanceC = document.querySelector('.presto-component-instance#iC');
        assert(ps.get('cA').has(instanceA))
        assert(ps.get('cB').has(instanceB))
        assert(ps.get('cC').has(instanceC))
      });
    });
  });
});
