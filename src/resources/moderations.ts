// Copyright (c) Meta Platforms, Inc. and affiliates.
// All rights reserved.
//
// This source code is licensed under the terms described in the LICENSE file in
// the root directory of this source tree.
//
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';

export class Moderations extends APIResource {
  /**
   * Classifies if text inputs are potentially harmful. OpenAI-compatible endpoint.
   */
  create(body: ModerationCreateParams, options?: Core.RequestOptions): Core.APIPromise<CreateResponse> {
    return this._client.post('/v1/moderations', { body, ...options });
  }
}

/**
 * A moderation object containing the results of content classification.
 */
export interface CreateResponse {
  /**
   * The unique identifier for the moderation request
   */
  id: string;

  /**
   * The model used to generate the moderation results
   */
  model: string;

  /**
   * A list of moderation result objects
   */
  results: Array<CreateResponse.Result>;
}

export namespace CreateResponse {
  /**
   * A moderation result object containing flagged status and category information.
   */
  export interface Result {
    /**
     * Whether any of the below categories are flagged
     */
    flagged: boolean;

    /**
     * A dictionary of the categories, and whether they are flagged or not
     */
    categories?: { [key: string]: boolean } | null;

    /**
     * A dictionary of the categories along with the input type(s) that the score
     * applies to
     */
    category_applied_input_types?: { [key: string]: Array<string> } | null;

    /**
     * A dictionary of the categories along with their scores as predicted by model
     */
    category_scores?: { [key: string]: number } | null;

    /**
     * Additional metadata about the moderation
     */
    metadata?: { [key: string]: unknown };

    /**
     * A message to convey to the user about the moderation result
     */
    user_message?: string | null;
  }
}

export interface ModerationCreateParams {
  /**
   * Input (or inputs) to classify. Can be a single string or an array of strings.
   */
  input: string | Array<string>;

  /**
   * The content moderation model to use. If not specified, the default shield will
   * be used.
   */
  model?: string | null;
}

export declare namespace Moderations {
  export { type CreateResponse as CreateResponse, type ModerationCreateParams as ModerationCreateParams };
}
