// Copyright (c) The OGX Contributors.
// All rights reserved.
//
// This source code is licensed under the terms described in the LICENSE file in
// the root directory of this source tree.

//
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { OgxClient } from './index';

export abstract class APIResource {
  protected _client: OgxClient;

  constructor(client: OgxClient) {
    this._client = client;
  }
}
