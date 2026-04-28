/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Disclaimer: modules in _shims aren't intended to be imported by SDK users.
 */
import * as shims from './registry.mjs';
import * as auto from 'ogx-client/_shims/auto/runtime';
export const init = () => {
  if (!shims.kind) shims.setShims(auto.getRuntime(), { auto: true });
};
export * from './registry.mjs';

init();
