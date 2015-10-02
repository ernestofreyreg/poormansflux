/**
 *  Copyright (c) 2014-2015, Ernesto Freyre G.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree.
 */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD
    define([], factory);
  } else if (typeof exports === 'object') {
    // Node, CommonJS-like
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    root.poorMansFluxMixin = factory();
  }
}(this, function () {
  return function(store, actions) {
    return {
      getInitialState: function() {
        return store;
      },

      childContextTypes: {
        flux: function() { return true; }
      },

      getChildContext: function() {
        var
          flux;

        flux = { store: this.state };
        flux.actions = actions(this.dispatch, flux);

        return {
          flux: flux
        };
      },

      dispatch: function(data, callback) {
        this.setState(data, callback);
      }
    };
  };
}));








