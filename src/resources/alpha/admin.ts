// Copyright (c) The OGX Contributors.
// All rights reserved.
//
// This source code is licensed under the terms described in the LICENSE file in
// the root directory of this source tree.
//
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import { isRequestOptions } from '../../core';
import * as Core from '../../core';
import * as ProvidersAPI from '../providers';
import * as RoutesAPI from '../routes';
import * as Shared from '../shared';

/**
 * Administrative APIs for inspecting providers, routes, health, and version.
 */
export class Admin extends APIResource {
  /**
   * Get the current health status of the service.
   */
  health(options?: Core.RequestOptions): Core.APIPromise<Shared.HealthInfo> {
    return this._client.get('/v1alpha/admin/health', options);
  }

  /**
   * Get detailed information about a specific provider.
   */
  inspectProvider(providerId: string, options?: Core.RequestOptions): Core.APIPromise<Shared.ProviderInfo> {
    return this._client.get(`/v1alpha/admin/providers/${providerId}`, options);
  }

  /**
   * List all available providers with their configuration and health status.
   */
  listProviders(options?: Core.RequestOptions): Core.APIPromise<ProvidersAPI.ProviderListResponse> {
    return (
      this._client.get('/v1alpha/admin/providers', options) as Core.APIPromise<{
        data: ProvidersAPI.ProviderListResponse;
      }>
    )._thenUnwrap((obj) => obj.data);
  }

  /**
   * List all available API routes with their methods and implementing providers.
   */
  listRoutes(
    query?: AdminListRoutesParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<RoutesAPI.RouteListResponse>;
  listRoutes(options?: Core.RequestOptions): Core.APIPromise<RoutesAPI.RouteListResponse>;
  listRoutes(
    query: AdminListRoutesParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<RoutesAPI.RouteListResponse> {
    if (isRequestOptions(query)) {
      return this.listRoutes({}, query);
    }
    return (
      this._client.get('/v1alpha/admin/inspect/routes', { query, ...options }) as Core.APIPromise<{
        data: RoutesAPI.RouteListResponse;
      }>
    )._thenUnwrap((obj) => obj.data);
  }

  /**
   * Get the version of the service.
   */
  version(options?: Core.RequestOptions): Core.APIPromise<Shared.VersionInfo> {
    return this._client.get('/v1alpha/admin/version', options);
  }
}

export interface AdminListRoutesParams {
  /**
   * Filter to control which routes are returned. Can be an API level ('v1',
   * 'v1alpha', 'v1beta') to show non-deprecated routes at that level, or
   * 'deprecated' to show deprecated routes across all levels. If not specified,
   * returns all non-deprecated routes.
   */
  api_filter?: 'v1' | 'v1alpha' | 'v1beta' | 'deprecated' | null;
}

export declare namespace Admin {
  export { type AdminListRoutesParams as AdminListRoutesParams };
}
