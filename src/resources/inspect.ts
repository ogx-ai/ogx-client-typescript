// Copyright (c) The OGX Contributors.
// All rights reserved.
//
// This source code is licensed under the terms described in the LICENSE file in
// the root directory of this source tree.
//
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';
import * as Shared from './shared';

/**
 * APIs for inspecting the OGX service, including health status, available API routes with methods and implementing providers.
 */
export class Inspect extends APIResource {
  /**
   * Get the current health status of the service.
   */
  health(options?: Core.RequestOptions): Core.APIPromise<Shared.HealthInfo> {
    return this._client.get('/v1/health', options);
  }

  /**
   * Get the version of the service.
   */
  version(options?: Core.RequestOptions): Core.APIPromise<Shared.VersionInfo> {
    return this._client.get('/v1/version', options);
  }
}
