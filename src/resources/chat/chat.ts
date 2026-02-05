// Copyright (c) Meta Platforms, Inc. and affiliates.
// All rights reserved.
//
// This source code is licensed under the terms described in the LICENSE file in
// the root directory of this source tree.
//
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as CompletionsAPI from './completions';
import {
  CompletionCreateParams,
  CompletionCreateParamsNonStreaming,
  CompletionCreateParamsStreaming,
  CompletionCreateResponse,
  CompletionListParams,
  CompletionListResponse,
  CompletionRetrieveResponse,
  Completions,
} from './completions';

export class Chat extends APIResource {
  completions: CompletionsAPI.Completions = new CompletionsAPI.Completions(this._client);
}

/**
 * Chunk from a streaming response to an OpenAI-compatible chat completion request.
 */
export interface ChatCompletionChunk {
  /**
   * The ID of the chat completion.
   */
  id: string;

  /**
   * List of choices.
   */
  choices: Array<ChatCompletionChunk.Choice>;

  /**
   * The Unix timestamp in seconds when the chat completion was created.
   */
  created: number;

  /**
   * The model that was used to generate the chat completion.
   */
  model: string;

  /**
   * The object type.
   */
  object?: 'chat.completion.chunk';

  /**
   * Usage information for OpenAI chat completion.
   */
  usage?: ChatCompletionChunk.Usage | null;
}

export namespace ChatCompletionChunk {
  /**
   * A chunk choice from an OpenAI-compatible chat completion streaming response.
   */
  export interface Choice {
    /**
     * The delta from the chunk.
     */
    delta: Choice.Delta;

    /**
     * The index of the choice.
     */
    index: number;

    /**
     * The reason the model stopped generating.
     */
    finish_reason?: 'stop' | 'length' | 'tool_calls' | 'content_filter' | 'function_call' | null;

    /**
     * The log probabilities for the tokens in the message from an OpenAI-compatible
     * chat completion response.
     */
    logprobs?: Choice.Logprobs | null;
  }

  export namespace Choice {
    /**
     * The delta from the chunk.
     */
    export interface Delta {
      /**
       * The content of the delta.
       */
      content?: string | null;

      /**
       * The reasoning content from the model (for o1/o3 models).
       */
      reasoning_content?: string | null;

      /**
       * The refusal of the delta.
       */
      refusal?: string | null;

      /**
       * The role of the delta.
       */
      role?: string | null;

      /**
       * The tool calls of the delta.
       */
      tool_calls?: Array<Delta.ToolCall> | null;
    }

    export namespace Delta {
      /**
       * Tool call specification for OpenAI-compatible chat completion responses.
       */
      export interface ToolCall {
        /**
         * Unique identifier for the tool call.
         */
        id?: string | null;

        /**
         * Function call details for OpenAI-compatible tool calls.
         */
        function?: ToolCall.Function | null;

        /**
         * Index of the tool call in the list.
         */
        index?: number | null;

        /**
         * Must be 'function' to identify this as a function call.
         */
        type?: 'function';
      }

      export namespace ToolCall {
        /**
         * Function call details for OpenAI-compatible tool calls.
         */
        export interface Function {
          /**
           * Arguments to pass to the function as a JSON string.
           */
          arguments?: string | null;

          /**
           * Name of the function to call.
           */
          name?: string | null;
        }
      }
    }

    /**
     * The log probabilities for the tokens in the message from an OpenAI-compatible
     * chat completion response.
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

  /**
   * Usage information for OpenAI chat completion.
   */
  export interface Usage {
    /**
     * Number of tokens in the completion.
     */
    completion_tokens: number;

    /**
     * Number of tokens in the prompt.
     */
    prompt_tokens: number;

    /**
     * Total tokens used (prompt + completion).
     */
    total_tokens: number;

    /**
     * Token details for output tokens in OpenAI chat completion usage.
     */
    completion_tokens_details?: Usage.CompletionTokensDetails | null;

    /**
     * Token details for prompt tokens in OpenAI chat completion usage.
     */
    prompt_tokens_details?: Usage.PromptTokensDetails | null;
  }

  export namespace Usage {
    /**
     * Token details for output tokens in OpenAI chat completion usage.
     */
    export interface CompletionTokensDetails {
      /**
       * Number of tokens used for reasoning (o1/o3 models).
       */
      reasoning_tokens?: number | null;
    }

    /**
     * Token details for prompt tokens in OpenAI chat completion usage.
     */
    export interface PromptTokensDetails {
      /**
       * Number of tokens retrieved from cache.
       */
      cached_tokens?: number | null;
    }
  }
}

Chat.Completions = Completions;

export declare namespace Chat {
  export { type ChatCompletionChunk as ChatCompletionChunk };

  export {
    Completions as Completions,
    type CompletionCreateResponse as CompletionCreateResponse,
    type CompletionRetrieveResponse as CompletionRetrieveResponse,
    type CompletionListResponse as CompletionListResponse,
    type CompletionCreateParams as CompletionCreateParams,
    type CompletionCreateParamsNonStreaming as CompletionCreateParamsNonStreaming,
    type CompletionCreateParamsStreaming as CompletionCreateParamsStreaming,
    type CompletionListParams as CompletionListParams,
  };
}
