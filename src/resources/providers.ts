// Copyright (c) Meta Platforms, Inc. and affiliates.
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
 * Providers API for inspecting, listing, and modifying providers and their configurations.
 */
export class Providers extends APIResource {
  /**
   * Get detailed information about a specific provider.
   */
  retrieve(providerId: string, options?: Core.RequestOptions): Core.APIPromise<Shared.ProviderInfo> {
    return this._client.get(`/v1/providers/${providerId}`, options);
  }

  /**
   * List all available providers.
   */
  list(options?: Core.RequestOptions): Core.APIPromise<ProviderListResponse> {
    return (
      this._client.get('/v1/providers', options) as Core.APIPromise<{ data: ProviderListResponse }>
    )._thenUnwrap((obj) => obj.data);
  }
}

/**
 * List of provider information objects
 */
export type ProviderListResponse = Array<Shared.ProviderInfo>;

export declare namespace Providers {
  export { type ProviderListResponse as ProviderListResponse };
}
