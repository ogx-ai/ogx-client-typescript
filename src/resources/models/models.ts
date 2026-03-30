// Copyright (c) Meta Platforms, Inc. and affiliates.
// All rights reserved.
//
// This source code is licensed under the terms described in the LICENSE file in
// the root directory of this source tree.
//
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';
import * as OpenAIAPI from './openai';
import { OpenAI } from './openai';

export class Models extends APIResource {
  openai: OpenAIAPI.OpenAI = new OpenAIAPI.OpenAI(this._client);

  /**
   * Get a model by its identifier.
   */
  retrieve(modelId: string, options?: Core.RequestOptions): Core.APIPromise<ModelRetrieveResponse> {
    return this._client.get(`/v1/models/${modelId}`, options);
  }

  /**
   * List models using the OpenAI API.
   */
  list(options?: Core.RequestOptions): Core.APIPromise<ModelListResponse> {
    return (
      this._client.get('/v1/models', options) as Core.APIPromise<{ data: ModelListResponse }>
    )._thenUnwrap((obj) => obj.data);
  }
}

/**
 * Response containing a list of OpenAI model objects.
 */
export interface ListModelsResponse {
  /**
   * List of OpenAI model objects.
   */
  data: ModelListResponse;
}

/**
 * A model from OpenAI.
 *
 * :id: The ID of the model :object: The object type, which will be "model"
 * :created: The Unix timestamp in seconds when the model was created :owned_by:
 * The owner of the model :custom_metadata: Llama Stack-specific metadata including
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
 * A model resource representing an AI model registered in Llama Stack.
 */
export interface ModelRetrieveResponse {
  /**
   * Unique identifier for this resource in llama stack
   */
  identifier: string;

  /**
   * ID of the provider that owns this resource
   */
  provider_id: string;

  /**
   * Any additional metadata for this model
   */
  metadata?: { [key: string]: unknown };

  /**
   * Enumeration of supported model types in Llama Stack.
   */
  model_type?: 'llm' | 'embedding' | 'rerank';

  /**
   * Enable model availability check during registration. When false (default),
   * validation is deferred to runtime and model is preserved during provider
   * refresh.
   */
  model_validation?: boolean | null;

  /**
   * Unique identifier for this resource in the provider
   */
  provider_resource_id?: string | null;

  type?: 'model';
}

/**
 * List of OpenAI model objects.
 */
export type ModelListResponse = Array<Model>;

Models.OpenAI = OpenAI;

export declare namespace Models {
  export {
    type ListModelsResponse as ListModelsResponse,
    type Model as Model,
    type ModelRetrieveResponse as ModelRetrieveResponse,
    type ModelListResponse as ModelListResponse,
  };

  export { OpenAI as OpenAI };
}
