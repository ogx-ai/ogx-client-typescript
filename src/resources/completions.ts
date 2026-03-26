// Copyright (c) Meta Platforms, Inc. and affiliates.
// All rights reserved.
//
// This source code is licensed under the terms described in the LICENSE file in
// the root directory of this source tree.
//
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { APIPromise } from '../core';
import * as Core from '../core';
import * as CompletionsAPI from './completions';
import { Stream } from '../streaming';

/**
 * Llama Stack Inference API for generating completions, chat completions, and embeddings.
 *
 * This API provides the raw interface to the underlying models. Three kinds of models are supported:
 * - LLM models: these models generate "raw" and "chat" (conversational) completions.
 * - Embedding models: these models generate embeddings to be used for semantic search.
 * - Rerank models: these models reorder the documents based on their relevance to a query.
 */
export class Completions extends APIResource {
  /**
   * Generate an OpenAI-compatible completion for the given prompt using the
   * specified model.
   */
  create(
    body: CompletionCreateParamsNonStreaming,
    options?: Core.RequestOptions,
  ): APIPromise<CompletionCreateResponse>;
  create(
    body: CompletionCreateParamsStreaming,
    options?: Core.RequestOptions,
  ): APIPromise<Stream<CompletionCreateResponse>>;
  create(
    body: CompletionCreateParamsBase,
    options?: Core.RequestOptions,
  ): APIPromise<Stream<CompletionCreateResponse> | CompletionCreateResponse>;
  create(
    body: CompletionCreateParams,
    options?: Core.RequestOptions,
  ): APIPromise<CompletionCreateResponse> | APIPromise<Stream<CompletionCreateResponse>> {
    return this._client.post('/v1/completions', { body, ...options, stream: body.stream ?? false }) as
      | APIPromise<CompletionCreateResponse>
      | APIPromise<Stream<CompletionCreateResponse>>;
  }
}

/**
 * Response from an OpenAI-compatible completion request.
 */
export interface CompletionCreateResponse {
  /**
   * The ID of the completion.
   */
  id: string;

  /**
   * List of choices.
   */
  choices: Array<CompletionCreateResponse.Choice>;

  /**
   * The Unix timestamp in seconds when the completion was created.
   */
  created: number;

  /**
   * The model that was used to generate the completion.
   */
  model: string;

  /**
   * The object type.
   */
  object?: 'text_completion';
}

export namespace CompletionCreateResponse {
  /**
   * A choice from an OpenAI-compatible completion response.
   */
  export interface Choice {
    /**
     * The reason the model stopped generating.
     */
    finish_reason: 'stop' | 'length' | 'tool_calls' | 'content_filter' | 'function_call';

    /**
     * The index of the choice.
     */
    index: number;

    /**
     * The text of the choice.
     */
    text: string;

    /**
     * The log probabilities for the tokens in the choice.
     */
    logprobs?: Choice.Logprobs | null;
  }

  export namespace Choice {
    /**
     * The log probabilities for the tokens in the choice.
     */
    export interface Logprobs {
      /**
       * The log probabilities for the tokens in the message.
       */
      content?: Array<Logprobs.Content> | null;

      /**
       * The log probabilities for the refusal tokens.
       */
      refusal?: Array<Logprobs.Refusal> | null;
    }

    export namespace Logprobs {
      /**
       * The log probability for a token from an OpenAI-compatible chat completion
       * response.
       */
      export interface Content {
        /**
         * The token.
         */
        token: string;

        /**
         * The log probability of the token.
         */
        logprob: number;

        /**
         * The bytes for the token.
         */
        bytes?: Array<number> | null;

        /**
         * The top log probabilities for the token.
         */
        top_logprobs?: Array<Content.TopLogprob> | null;
      }

      export namespace Content {
        /**
         * The top log probability for a token from an OpenAI-compatible chat completion
         * response.
         */
        export interface TopLogprob {
          /**
           * The token.
           */
          token: string;

          /**
           * The log probability of the token.
           */
          logprob: number;

          /**
           * The bytes for the token.
           */
          bytes?: Array<number> | null;
        }
      }

      /**
       * The log probability for a token from an OpenAI-compatible chat completion
       * response.
       */
      export interface Refusal {
        /**
         * The token.
         */
        token: string;

        /**
         * The log probability of the token.
         */
        logprob: number;

        /**
         * The bytes for the token.
         */
        bytes?: Array<number> | null;

        /**
         * The top log probabilities for the token.
         */
        top_logprobs?: Array<Refusal.TopLogprob> | null;
      }

      export namespace Refusal {
        /**
         * The top log probability for a token from an OpenAI-compatible chat completion
         * response.
         */
        export interface TopLogprob {
          /**
           * The token.
           */
          token: string;

          /**
           * The log probability of the token.
           */
          logprob: number;

          /**
           * The bytes for the token.
           */
          bytes?: Array<number> | null;
        }
      }
    }
  }
}

export type CompletionCreateParams = CompletionCreateParamsNonStreaming | CompletionCreateParamsStreaming;

export interface CompletionCreateParamsBase {
  /**
   * The identifier of the model to use.
   */
  model: string;

  /**
   * The prompt to generate a completion for.
   */
  prompt: string | Array<string> | Array<number> | Array<Array<number>>;

  /**
   * The number of completions to generate.
   */
  best_of?: number | null;

  /**
   * Whether to echo the prompt.
   */
  echo?: boolean | null;

  /**
   * The penalty for repeated tokens.
   */
  frequency_penalty?: number | null;

  /**
   * The logit bias to use.
   */
  logit_bias?: { [key: string]: number } | null;

  /**
   * The log probabilities to use.
   */
  logprobs?: boolean | null;

  /**
   * The maximum number of tokens to generate.
   */
  max_tokens?: number | null;

  /**
   * The number of completions to generate.
   */
  n?: number | null;

  /**
   * The penalty for repeated tokens.
   */
  presence_penalty?: number | null;

  /**
   * The seed to use.
   */
  seed?: number | null;

  /**
   * The stop tokens to use.
   */
  stop?: string | Array<string> | null;

  /**
   * Whether to stream the response.
   */
  stream?: boolean | null;

  /**
   * The stream options to use.
   */
  stream_options?: { [key: string]: unknown } | null;

  /**
   * The suffix that should be appended to the completion.
   */
  suffix?: string | null;

  /**
   * The temperature to use.
   */
  temperature?: number | null;

  /**
   * The top p to use.
   */
  top_p?: number | null;

  /**
   * The user to use.
   */
  user?: string | null;

  [k: string]: unknown;
}

export namespace CompletionCreateParams {
  export type CompletionCreateParamsNonStreaming = CompletionsAPI.CompletionCreateParamsNonStreaming;
  export type CompletionCreateParamsStreaming = CompletionsAPI.CompletionCreateParamsStreaming;
}

export interface CompletionCreateParamsNonStreaming extends CompletionCreateParamsBase {
  /**
   * Whether to stream the response.
   */
  stream?: false | null;

  [k: string]: unknown;
}

export interface CompletionCreateParamsStreaming extends CompletionCreateParamsBase {
  /**
   * Whether to stream the response.
   */
  stream: true;

  [k: string]: unknown;
}

export declare namespace Completions {
  export {
    type CompletionCreateResponse as CompletionCreateResponse,
    type CompletionCreateParams as CompletionCreateParams,
    type CompletionCreateParamsNonStreaming as CompletionCreateParamsNonStreaming,
    type CompletionCreateParamsStreaming as CompletionCreateParamsStreaming,
  };
}
