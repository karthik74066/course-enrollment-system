// src/setupTests.js
import '@testing-library/jest-dom';

/* matchMedia polyfill (keep whatever you already have) */
/* ... your existing matchMedia mock here ... */

/**
 * Robust mock for Ant Design's responsiveObserver.
 * Exports an ES module where `default` is callable and
 * also contains subscribe/unsubscribe and mapping metadata.
 */
try {
  jest.mock('antd/lib/_util/responsiveObserver', () => {
    // simple subscribe implementation that stores listeners per id
    let listeners = new Map();
    let idCounter = 1;

    const subscribe = (listener) => {
      const id = `rid_${idCounter++}`;
      listeners.set(id, listener);
      return id;
    };

    const unsubscribe = (id) => {
      listeners.delete(id);
    };

    // a callable default that returns an object similar to instance
    const defaultFn = function () {
      return {
        // instance-level subscribe/unsubscribe that delegate to module-level functions
        subscribe,
        unsubscribe,
        // responsiveArray/responsiveMap kept for compatibility
        responsiveArray: [],
        responsiveMap: {},
      };
    };

    // attach module-level helpers (some code reads these off the imported function)
    defaultFn.subscribe = subscribe;
    defaultFn.unsubscribe = unsubscribe;
    defaultFn.responsiveArray = [];
    defaultFn.responsiveMap = {};

    // expose a helper so tests can trigger listeners if needed
    defaultFn.__triggerAll = (payload) => {
      listeners.forEach((fn) => {
        try {
          fn(payload);
        } catch (e) {
          /* ignore */
        }
      });
    };

    // return as an ES module default export
    return { __esModule: true, default: defaultFn };
  });
} catch (e) {
  // jest.mock will throw outside Jest; ignore silently
}
