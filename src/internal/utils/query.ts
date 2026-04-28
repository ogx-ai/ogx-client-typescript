// Copyright (c) The OGX Contributors.
// All rights reserved.
//
// This source code is licensed under the terms described in the LICENSE file in
// the root directory of this source tree.
//
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import * as qs from '../qs/stringify';

export function stringifyQuery(query: object | Record<string, unknown>) {
  return qs.stringify(query, { arrayFormat: 'comma' });
}
