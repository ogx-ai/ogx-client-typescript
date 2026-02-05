// Copyright (c) Meta Platforms, Inc. and affiliates.
// All rights reserved.
//
// This source code is licensed under the terms described in the LICENSE file in
// the root directory of this source tree.
//
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';

export class ScoringFunctions extends APIResource {
  /**
   * Get a scoring function by its ID.
   */
  retrieve(scoringFnId: string, options?: Core.RequestOptions): Core.APIPromise<ScoringFn> {
    return this._client.get(`/v1/scoring-functions/${scoringFnId}`, options);
  }

  /**
   * List all scoring functions.
   */
  list(options?: Core.RequestOptions): Core.APIPromise<ScoringFunctionListResponse> {
    return (
      this._client.get('/v1/scoring-functions', options) as Core.APIPromise<{
        data: ScoringFunctionListResponse;
      }>
    )._thenUnwrap((obj) => obj.data);
  }

  /**
   * Register a scoring function.
   *
   * @deprecated
   */
  register(body: ScoringFunctionRegisterParams, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.post('/v1/scoring-functions', {
      body,
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
  }

  /**
   * Unregister a scoring function.
   *
   * @deprecated
   */
  unregister(scoringFnId: string, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.delete(`/v1/scoring-functions/${scoringFnId}`, {
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
  }
}

/**
 * Response containing a list of scoring function objects.
 */
export interface ListScoringFunctionsResponse {
  /**
   * List of scoring function objects.
   */
  data: ScoringFunctionListResponse;
}

/**
 * A scoring function resource for evaluating model outputs.
 */
export interface ScoringFn {
  /**
   * Unique identifier for this resource in llama stack
   */
  identifier: string;

  /**
   * ID of the provider that owns this resource
   */
  provider_id: string;

  return_type: ScoringFn.ReturnType;

  description?: string | null;

  /**
   * Any additional metadata for this definition
   */
  metadata?: { [key: string]: unknown };

  /**
   * The parameters for the scoring function for benchmark eval, these can be
   * overridden for app eval
   */
  params?:
    | ScoringFn.LlmAsJudgeScoringFnParams
    | ScoringFn.RegexParserScoringFnParams
    | ScoringFn.BasicScoringFnParams
    | null;

  /**
   * Unique identifier for this resource in the provider
   */
  provider_resource_id?: string | null;

  type?: 'scoring_function';
}

export namespace ScoringFn {
  export interface ReturnType {
    type:
      | 'string'
      | 'number'
      | 'boolean'
      | 'array'
      | 'object'
      | 'json'
      | 'union'
      | 'chat_completion_input'
      | 'completion_input'
      | 'agent_turn_input';
  }

  /**
   * Parameters for LLM-as-judge scoring function configuration.
   */
  export interface LlmAsJudgeScoringFnParams {
    judge_model: string;

    /**
     * Aggregation functions to apply to the scores of each row
     */
    aggregation_functions?: Array<
      'average' | 'weighted_average' | 'median' | 'categorical_count' | 'accuracy'
    >;

    /**
     * Regexes to extract the answer from generated response
     */
    judge_score_regexes?: Array<string>;

    prompt_template?: string | null;

    type?: 'llm_as_judge';
  }

  /**
   * Parameters for regex parser scoring function configuration.
   */
  export interface RegexParserScoringFnParams {
    /**
     * Aggregation functions to apply to the scores of each row
     */
    aggregation_functions?: Array<
      'average' | 'weighted_average' | 'median' | 'categorical_count' | 'accuracy'
    >;

    /**
     * Regex to extract the answer from generated response
     */
    parsing_regexes?: Array<string>;

    type?: 'regex_parser';
  }

  /**
   * Parameters for basic scoring function configuration.
   */
  export interface BasicScoringFnParams {
    /**
     * Aggregation functions to apply to the scores of each row
     */
    aggregation_functions?: Array<
      'average' | 'weighted_average' | 'median' | 'categorical_count' | 'accuracy'
    >;

    type?: 'basic';
  }
}

/**
 * Parameters for LLM-as-judge scoring function configuration.
 */
export type ScoringFnParams =
  | ScoringFnParams.LlmAsJudgeScoringFnParams
  | ScoringFnParams.RegexParserScoringFnParams
  | ScoringFnParams.BasicScoringFnParams;

export namespace ScoringFnParams {
  /**
   * Parameters for LLM-as-judge scoring function configuration.
   */
  export interface LlmAsJudgeScoringFnParams {
    judge_model: string;

    /**
     * Aggregation functions to apply to the scores of each row
     */
    aggregation_functions?: Array<
      'average' | 'weighted_average' | 'median' | 'categorical_count' | 'accuracy'
    >;

    /**
     * Regexes to extract the answer from generated response
     */
    judge_score_regexes?: Array<string>;

    prompt_template?: string | null;

    type?: 'llm_as_judge';
  }

  /**
   * Parameters for regex parser scoring function configuration.
   */
  export interface RegexParserScoringFnParams {
    /**
     * Aggregation functions to apply to the scores of each row
     */
    aggregation_functions?: Array<
      'average' | 'weighted_average' | 'median' | 'categorical_count' | 'accuracy'
    >;

    /**
     * Regex to extract the answer from generated response
     */
    parsing_regexes?: Array<string>;

    type?: 'regex_parser';
  }

  /**
   * Parameters for basic scoring function configuration.
   */
  export interface BasicScoringFnParams {
    /**
     * Aggregation functions to apply to the scores of each row
     */
    aggregation_functions?: Array<
      'average' | 'weighted_average' | 'median' | 'categorical_count' | 'accuracy'
    >;

    type?: 'basic';
  }
}

/**
 * List of scoring function objects.
 */
export type ScoringFunctionListResponse = Array<ScoringFn>;

export interface ScoringFunctionRegisterParams {
  /**
   * The description of the scoring function.
   */
  description: string;

  return_type: ScoringFunctionRegisterParams.ReturnType;

  /**
   * The ID of the scoring function to register.
   */
  scoring_fn_id: string;

  /**
   * The parameters for the scoring function for benchmark eval, these can be
   * overridden for app eval.
   */
  params?:
    | ScoringFunctionRegisterParams.LlmAsJudgeScoringFnParams
    | ScoringFunctionRegisterParams.RegexParserScoringFnParams
    | ScoringFunctionRegisterParams.BasicScoringFnParams
    | null;

  /**
   * The ID of the provider to use for the scoring function.
   */
  provider_id?: string | null;

  /**
   * The ID of the provider scoring function to use for the scoring function.
   */
  provider_scoring_fn_id?: string | null;
}

export namespace ScoringFunctionRegisterParams {
  export interface ReturnType {
    type:
      | 'string'
      | 'number'
      | 'boolean'
      | 'array'
      | 'object'
      | 'json'
      | 'union'
      | 'chat_completion_input'
      | 'completion_input'
      | 'agent_turn_input';
  }

  /**
   * Parameters for LLM-as-judge scoring function configuration.
   */
  export interface LlmAsJudgeScoringFnParams {
    judge_model: string;

    /**
     * Aggregation functions to apply to the scores of each row
     */
    aggregation_functions?: Array<
      'average' | 'weighted_average' | 'median' | 'categorical_count' | 'accuracy'
    >;

    /**
     * Regexes to extract the answer from generated response
     */
    judge_score_regexes?: Array<string>;

    prompt_template?: string | null;

    type?: 'llm_as_judge';
  }

  /**
   * Parameters for regex parser scoring function configuration.
   */
  export interface RegexParserScoringFnParams {
    /**
     * Aggregation functions to apply to the scores of each row
     */
    aggregation_functions?: Array<
      'average' | 'weighted_average' | 'median' | 'categorical_count' | 'accuracy'
    >;

    /**
     * Regex to extract the answer from generated response
     */
    parsing_regexes?: Array<string>;

    type?: 'regex_parser';
  }

  /**
   * Parameters for basic scoring function configuration.
   */
  export interface BasicScoringFnParams {
    /**
     * Aggregation functions to apply to the scores of each row
     */
    aggregation_functions?: Array<
      'average' | 'weighted_average' | 'median' | 'categorical_count' | 'accuracy'
    >;

    type?: 'basic';
  }
}

export declare namespace ScoringFunctions {
  export {
    type ListScoringFunctionsResponse as ListScoringFunctionsResponse,
    type ScoringFn as ScoringFn,
    type ScoringFnParams as ScoringFnParams,
    type ScoringFunctionListResponse as ScoringFunctionListResponse,
    type ScoringFunctionRegisterParams as ScoringFunctionRegisterParams,
  };
}
