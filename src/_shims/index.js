// Copyright (c) Meta Platforms, Inc. and affiliates.
// All rights reserved.
//
// This source code is licensed under the terms described in the LICENSE file in
// the root directory of this source tree.

/**
 * Disclaimer: modules in _shims aren't intended to be imported by SDK users.
 */
const shims = require('./registry');
const auto = require('ogx-client/_shims/auto/runtime');
exports.init = () => {
  if (!shims.kind) shims.setShims(auto.getRuntime(), { auto: true });
};
for (const property of Object.keys(shims)) {
  Object.defineProperty(exports, property, {
    get() {
      return shims[property];
    },
  });
}

exports.init();
