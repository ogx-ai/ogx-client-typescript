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
import * as OpenAIAPI from './openai';
import { OpenAI, OpenAIListParams, OpenAIListResponse } from './openai';

export class Models extends APIResource {
  openai: OpenAIAPI.OpenAI = new OpenAIAPI.OpenAI(this._client);

  /**
   * Get a model by its identifier. Returns OpenAI, Anthropic, or Google response
   * format based on SDK detection headers.
   */
  retrieve(
    modelId: string,
    params?: ModelRetrieveParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<ModelRetrieveResponse>;
  retrieve(modelId: string, options?: Core.RequestOptions): Core.APIPromise<ModelRetrieveResponse>;
  retrieve(
    modelId: string,
    params: ModelRetrieveParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<ModelRetrieveResponse> {
    if (isRequestOptions(params)) {
      return this.retrieve(modelId, {}, params);
    }
    const {
      'anthropic-version': anthropicVersion,
      'x-goog-api-client': xGoogAPIClient,
      'x-goog-api-key': xGoogAPIKey,
      'x-goog-user-project': xGoogUserProject,
    } = params;
    return this._client.get(`/v1/models/${modelId}`, {
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

  /**
   * List models. Returns OpenAI, Anthropic, or Google response format based on SDK
   * detection headers.
   */
  list(params?: ModelListParams, options?: Core.RequestOptions): Core.APIPromise<ModelListResponse>;
  list(options?: Core.RequestOptions): Core.APIPromise<ModelListResponse>;
  list(
    params: ModelListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<ModelListResponse> {
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
export interface ListModelsResponse {
  /**
   * List of OpenAI model objects.
   */
  data: Array<Model>;

  object?: 'list';
}

/**
 * A model from OpenAI.
 *
 * :id: The ID of the model :object: The object type, which will be "model"
 * :created: The Unix timestamp in seconds when the model was created :owned_by:
 * The owner of the model :custom_metadata: OGX-specific metadata including
 * model_type, provider info, and additional metadata
 */
export interface Model {
  id: string;

  created: number;

  owned_by: string;

  custom_metadata?: { [key: string]: unknown } | null;

  object?: 'model';
}

/**
 * A model resource representing an AI model registered in OGX.
 */
export type ModelRetrieveResponse =
  | ModelRetrieveResponse.Model
  | ModelRetrieveResponse.AnthropicModelInfo
  | ModelRetrieveResponse.GoogleModelInfo;

export namespace ModelRetrieveResponse {
  /**
   * A model resource representing an AI model registered in OGX.
   */
  export interface Model {
    /**
     * The model identifier (OpenAI-compatible alias for identifier).
     */
    id: string;

    /**
     * Unique identifier for this resource in ogx
     */
    identifier: string;

    /**
     * The object type, always 'model'.
     */
    object: 'model';

    /**
     * ID of the provider that owns this resource
     */
    provider_id: string;

    /**
     * The Unix timestamp in seconds when the model was created.
     */
    created?: number;

    /**
     * Any additional metadata for this model
     */
    metadata?: { [key: string]: unknown };

    /**
     * Enumeration of supported model types in OGX.
     */
    model_type?: 'llm' | 'embedding' | 'rerank';

    /**
     * Enable model availability check during registration. When false (default),
     * validation is deferred to runtime and model is preserved during provider
     * refresh.
     */
    model_validation?: boolean | null;

    /**
     * The owner of the model.
     */
    owned_by?: string;

    /**
     * Unique identifier for this resource in the provider
     */
    provider_resource_id?: string | null;

    type?: 'model';
  }

  /**
   * Anthropic model info response object.
   *
   * :id: Unique model identifier
   */
  export interface AnthropicModelInfo {
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

  /**
   * Google model info response object.
   *
   * :name: Model resource name, e.g. 'models/gemini-pro' :display_name: A
   * human-readable name for the model :description: A description of the model
   */
  export interface GoogleModelInfo {
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

/**
 * Response containing a list of OpenAI model objects.
 */
export type ModelListResponse =
  | ListModelsResponse
  | ModelListResponse.AnthropicListModelsResponse
  | ModelListResponse.GoogleListModelsResponse;

export namespace ModelListResponse {
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

export interface ModelRetrieveParams {
  'anthropic-version'?: string;

  'x-goog-api-client'?: string;

  'x-goog-api-key'?: string;

  'x-goog-user-project'?: string;
}

export interface ModelListParams {
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

Models.OpenAI = OpenAI;

export declare namespace Models {
  export {
    type ListModelsResponse as ListModelsResponse,
    type Model as Model,
    type ModelRetrieveResponse as ModelRetrieveResponse,
    type ModelListResponse as ModelListResponse,
    type ModelRetrieveParams as ModelRetrieveParams,
    type ModelListParams as ModelListParams,
  };

  export {
    OpenAI as OpenAI,
    type OpenAIListResponse as OpenAIListResponse,
    type OpenAIListParams as OpenAIListParams,
  };
}
