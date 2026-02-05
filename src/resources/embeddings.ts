// Copyright (c) Meta Platforms, Inc. and affiliates.
// All rights reserved.
//
// This source code is licensed under the terms described in the LICENSE file in
// the root directory of this source tree.
//
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';

export class Embeddings extends APIResource {
  /**
   * Generate OpenAI-compatible embeddings for the given input using the specified
   * model.
   */
  create(
    body: EmbeddingCreateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<CreateEmbeddingsResponse> {
    return this._client.post('/v1/embeddings', { body, ...options });
  }
}

/**
 * Response from an OpenAI-compatible embeddings request.
 */
export interface CreateEmbeddingsResponse {
  /**
   * List of embedding data objects.
   */
  data: Array<CreateEmbeddingsResponse.Data>;

  /**
   * The model that was used to generate the embeddings.
   */
  model: string;

  /**
   * Usage information.
   */
  usage: CreateEmbeddingsResponse.Usage;

  /**
   * The object type.
   */
  object?: 'list';
}

export namespace CreateEmbeddingsResponse {
  /**
   * A single embedding data object from an OpenAI-compatible embeddings response.
   */
  export interface Data {
    /**
     * The embedding vector as a list of floats (when encoding_format='float') or as a
     * base64-encoded string.
     */
    embedding: Array<number> | string;

    /**
     * The index of the embedding in the input list.
     */
    index: number;

    /**
     * The object type.
     */
    object?: 'embedding';
  }

  /**
   * Usage information.
   */
  export interface Usage {
    /**
     * The number of tokens in the input.
     */
    prompt_tokens: number;

    /**
     * The total number of tokens used.
     */
    total_tokens: number;
  }
}

export interface EmbeddingCreateParams {
  /**
   * Input text to embed, encoded as a string or array of tokens.
   */
  input: string | Array<string> | Array<number> | Array<Array<number>>;

  /**
   * The identifier of the model to use.
   */
  model: string;

  /**
   * The number of dimensions for output embeddings.
   */
  dimensions?: number;

  /**
   * The format to return the embeddings in.
   */
  encoding_format?: 'float' | 'base64';

  /**
   * A unique identifier representing your end-user.
   */
  user?: string;

  [k: string]: unknown;
}

export declare namespace Embeddings {
  export {
    type CreateEmbeddingsResponse as CreateEmbeddingsResponse,
    type EmbeddingCreateParams as EmbeddingCreateParams,
  };
}
