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

export class Scoring extends APIResource {
  /**
   * Score a list of rows.
   */
  score(body: ScoringScoreParams, options?: Core.RequestOptions): Core.APIPromise<ScoringScoreResponse> {
    return this._client.post('/v1/scoring/score', { body, ...options });
  }

  /**
   * Score a batch of rows.
   */
  scoreBatch(
    body: ScoringScoreBatchParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<ScoringScoreBatchResponse> {
    return this._client.post('/v1/scoring/score-batch', { body, ...options });
  }
}

/**
 * The response from scoring.
 */
export interface ScoringScoreResponse {
  /**
   * A map of scoring function name to ScoringResult.
   */
  results: { [key: string]: Shared.ScoringResult };
}

/**
 * Response from batch scoring operations on datasets.
 */
export interface ScoringScoreBatchResponse {
  /**
   * A map of scoring function name to ScoringResult
   */
  results: { [key: string]: Shared.ScoringResult };

  /**
   * (Optional) The identifier of the dataset that was scored
   */
  dataset_id?: string | null;
}

export interface ScoringScoreParams {
  /**
   * The rows to score.
   */
  input_rows: Array<{ [key: string]: unknown }>;

  /**
   * The scoring functions to use for the scoring.
   */
  scoring_functions: {
    [key: string]:
      | ScoringScoreParams.LlmAsJudgeScoringFnParams
      | ScoringScoreParams.RegexParserScoringFnParams
      | ScoringScoreParams.BasicScoringFnParams
      | null;
  };
}

export namespace ScoringScoreParams {
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

export interface ScoringScoreBatchParams {
  /**
   * The ID of the dataset to score.
   */
  dataset_id: string;

  /**
   * The scoring functions to use for the scoring.
   */
  scoring_functions: {
    [key: string]:
      | ScoringScoreBatchParams.LlmAsJudgeScoringFnParams
      | ScoringScoreBatchParams.RegexParserScoringFnParams
      | ScoringScoreBatchParams.BasicScoringFnParams
      | null;
  };

  /**
   * Whether to save the results to a dataset.
   */
  save_results_dataset?: boolean;
}

export namespace ScoringScoreBatchParams {
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

export declare namespace Scoring {
  export {
    type ScoringScoreResponse as ScoringScoreResponse,
    type ScoringScoreBatchResponse as ScoringScoreBatchResponse,
    type ScoringScoreParams as ScoringScoreParams,
    type ScoringScoreBatchParams as ScoringScoreBatchParams,
  };
}
