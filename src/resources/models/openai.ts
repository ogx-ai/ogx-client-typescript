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
import * as ModelsAPI from './models';

export class OpenAI extends APIResource {
  /**
   * List models. Returns OpenAI, Anthropic, or Google response format based on SDK
   * detection headers.
   */
  list(params?: OpenAIListParams, options?: Core.RequestOptions): Core.APIPromise<OpenAIListResponse>;
  list(options?: Core.RequestOptions): Core.APIPromise<OpenAIListResponse>;
  list(
    params: OpenAIListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<OpenAIListResponse> {
    if (isRequestOptions(params)) {
      return this.list({}, params);
    }
    const {
      'anthropic-version': anthropicVersion,
      'x-goog-api-client': xGoogAPIClient,
      'x-goog-api-key': xGoogAPIKey,
      'x-goog-user-project': xGoogUserProject,
      ...query
    } = params;
    return this._client.get('/v1/models', {
      query,
      ...options,
      headers: {
        ...(anthropicVersion != null ? { 'anthropic-version': anthropicVersion } : undefined),
        ...(xGoogAPIClient != null ? { 'x-goog-api-client': xGoogAPIClient } : undefined),
        ...(xGoogAPIKey != null ? { 'x-goog-api-key': xGoogAPIKey } : undefined),
        ...(xGoogUserProject != null ? { 'x-goog-user-project': xGoogUserProject } : undefined),
        ...options?.headers,
      },
    });
  }
}

/**
 * Response containing a list of OpenAI model objects.
 */
export type OpenAIListResponse =
  | ModelsAPI.ListModelsResponse
  | OpenAIListResponse.AnthropicListModelsResponse
  | OpenAIListResponse.GoogleListModelsResponse;

export namespace OpenAIListResponse {
  /**
   * Response containing a list of Anthropic model objects.
   */
  export interface AnthropicListModelsResponse {
    /**
     * List of Anthropic model objects.
     */
    data: Array<AnthropicListModelsResponse.Data>;

    /**
     * First ID in the data list, usable as before_id for the previous page.
     */
    first_id?: string | null;

    /**
     * Whether there are more results in the requested page direction.
     */
    has_more?: boolean;

    /**
     * Last ID in the data list, usable as after_id for the next page.
     */
    last_id?: string | null;
  }

  export namespace AnthropicListModelsResponse {
    /**
     * Anthropic model info response object.
     *
     * :id: Unique model identifier
     */
    export interface Data {
      /**
       * Unique model identifier.
       */
      id: string;

      /**
       * RFC 3339 datetime string representing when the model was released.
       */
      created_at: string;

      /**
       * A human-readable name for the model.
       */
      display_name: string;

      /**
       * Maximum input context window size in tokens.
       */
      max_input_tokens?: number | null;

      /**
       * Maximum value for the max_tokens parameter when using this model.
       */
      max_tokens?: number | null;

      /**
       * Object type, always 'model'.
       */
      type?: 'model';
    }
  }

  /**
   * Response containing a list of Google model objects.
   */
  export interface GoogleListModelsResponse {
    /**
     * List of Google model objects.
     */
    models: Array<GoogleListModelsResponse.Model>;
  }

  export namespace GoogleListModelsResponse {
    /**
     * Google model info response object.
     *
     * :name: Model resource name, e.g. 'models/gemini-pro' :display_name: A
     * human-readable name for the model :description: A description of the model
     */
    export interface Model {
      /**
       * A human-readable name for the model.
       */
      display_name: string;

      /**
       * Model resource name, e.g. 'models/gemini-pro'.
       */
      name: string;

      /**
       * A description of the model.
       */
      description?: string;
    }
  }
}

export interface OpenAIListParams {
  /**
   * Query param: Return models after this model ID (Anthropic SDK format only).
   */
  after_id?: string | null;

  /**
   * Query param: Return models before this model ID (Anthropic SDK format only).
   */
  before_id?: string | null;

  /**
   * Query param: Maximum number of models to return (Anthropic SDK format only).
   */
  limit?: number | null;

  /**
   * Header param
   */
  'anthropic-version'?: string;

  /**
   * Header param
   */
  'x-goog-api-client'?: string;

  /**
   * Header param
   */
  'x-goog-api-key'?: string;

  /**
   * Header param
   */
  'x-goog-user-project'?: string;
}

export declare namespace OpenAI {
  export { type OpenAIListResponse as OpenAIListResponse, type OpenAIListParams as OpenAIListParams };
}
