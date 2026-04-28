// Copyright (c) The OGX Contributors.
// All rights reserved.
//
// This source code is licensed under the terms described in the LICENSE file in
// the root directory of this source tree.
//
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';
import * as ModelsAPI from './models';

export class OpenAI extends APIResource {
  /**
   * List models using the OpenAI API.
   */
  list(options?: Core.RequestOptions): Core.APIPromise<ModelsAPI.ListModelsResponse> {
    return this._client.get('/v1/models', options);
  }
}
