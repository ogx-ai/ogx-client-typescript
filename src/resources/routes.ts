// Copyright (c) The OGX Contributors.
// All rights reserved.
//
// This source code is licensed under the terms described in the LICENSE file in
// the root directory of this source tree.
//
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as Core from '../core';
import * as Shared from './shared';

/**
 * APIs for inspecting the OGX service, including health status, available API routes with methods and implementing providers.
 */
export class Routes extends APIResource {
  /**
   * List all available API routes with their methods and implementing providers.
   */
  list(query?: RouteListParams, options?: Core.RequestOptions): Core.APIPromise<RouteListResponse>;
  list(options?: Core.RequestOptions): Core.APIPromise<RouteListResponse>;
  list(
    query: RouteListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<RouteListResponse> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return (
      this._client.get('/v1/inspect/routes', { query, ...options }) as Core.APIPromise<{
        data: RouteListResponse;
      }>
    )._thenUnwrap((obj) => obj.data);
  }
}

/**
 * List of available API routes
 */
export type RouteListResponse = Array<Shared.RouteInfo>;

export interface RouteListParams {
  /**
   * Optional filter to control which routes are returned. Can be an API level ('v1',
   * 'v1alpha', 'v1beta') to show non-deprecated routes at that level, or
   * 'deprecated' to show deprecated routes across all levels. If not specified,
   * returns all non-deprecated routes.
   */
  api_filter?: 'v1' | 'v1alpha' | 'v1beta' | 'deprecated' | null;
}

export declare namespace Routes {
  export { type RouteListResponse as RouteListResponse, type RouteListParams as RouteListParams };
}
