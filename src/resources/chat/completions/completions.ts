// Copyright (c) The OGX Contributors.
// All rights reserved.
//
// This source code is licensed under the terms described in the LICENSE file in
// the root directory of this source tree.
//
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../resource';
import { isRequestOptions } from '../../../core';
import { APIPromise } from '../../../core';
import * as Core from '../../../core';
import * as CompletionsAPI from './completions';
import * as ChatAPI from '../chat';
import * as MessagesAPI from './messages';
import {
  MessageListParams,
  MessageListResponse,
  MessageListResponsesOpenAICursorPage,
  Messages,
} from './messages';
import { Stream } from '../../../streaming';

/**
 * OGX Inference API for generating completions, chat completions, and embeddings.
 *
 * This API provides the raw interface to the underlying models. Three kinds of models are supported:
 * - LLM models: these models generate "raw" and "chat" (conversational) completions.
 * - Embedding models: these models generate embeddings to be used for semantic search.
 * - Rerank models: these models reorder the documents based on their relevance to a query.
 */
export class Completions extends APIResource {
  messages: MessagesAPI.Messages = new MessagesAPI.Messages(this._client);

  /**
   * Generate an OpenAI-compatible chat completion for the given messages using the
   * specified model.
   */
  create(
    body: CompletionCreateParamsNonStreaming,
    options?: Core.RequestOptions,
  ): APIPromise<CompletionCreateResponse>;
  create(
    body: CompletionCreateParamsStreaming,
    options?: Core.RequestOptions,
  ): APIPromise<Stream<ChatAPI.ChatCompletionChunk>>;
  create(
    body: CompletionCreateParamsBase,
    options?: Core.RequestOptions,
  ): APIPromise<Stream<ChatAPI.ChatCompletionChunk> | CompletionCreateResponse>;
  create(
    body: CompletionCreateParams,
    options?: Core.RequestOptions,
  ): APIPromise<CompletionCreateResponse> | APIPromise<Stream<ChatAPI.ChatCompletionChunk>> {
    return this._client.post('/v1/chat/completions', { body, ...options, stream: body.stream ?? false }) as
      | APIPromise<CompletionCreateResponse>
      | APIPromise<Stream<ChatAPI.ChatCompletionChunk>>;
  }

  /**
   * Describe a chat completion by its ID.
   */
  retrieve(completionId: string, options?: Core.RequestOptions): Core.APIPromise<CompletionRetrieveResponse> {
    return this._client.get(`/v1/chat/completions/${completionId}`, options);
  }

  /**
   * List chat completions.
   */
  list(query?: CompletionListParams, options?: Core.RequestOptions): Core.APIPromise<CompletionListResponse>;
  list(options?: Core.RequestOptions): Core.APIPromise<CompletionListResponse>;
  list(
    query: CompletionListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<CompletionListResponse> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.get('/v1/chat/completions', { query, ...options });
  }
}

/**
 * Response from an OpenAI-compatible chat completion request.
 */
export interface CompletionCreateResponse {
  /**
   * The ID of the chat completion.
   */
  id: string;

  /**
   * List of choices.
   */
  choices: Array<CompletionCreateResponse.Choice>;

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
  object?: 'chat.completion';

  /**
   * The service tier that was used for this response.
   */
  service_tier?: string | null;

  /**
   * System fingerprint for this completion.
   */
  system_fingerprint?: string | null;

  /**
   * Token usage information for the completion.
   */
  usage?: CompletionCreateResponse.Usage | null;
}

export namespace CompletionCreateResponse {
  /**
   * A choice from an OpenAI-compatible chat completion response.
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
     * The message from the model.
     */
    message: Choice.Message;

    /**
     * The log probabilities for the tokens in the message.
     */
    logprobs?: Choice.Logprobs | null;
  }

  export namespace Choice {
    /**
     * The message from the model.
     */
    export interface Message {
      /**
       * Annotations for the message, when applicable.
       */
      annotations?: Array<{ [key: string]: unknown }>;

      /**
       * Audio response data when using audio output modality.
       */
      audio?: { [key: string]: unknown } | null;

      /**
       * The content of the message.
       */
      content?: string | null;

      /**
       * Deprecated: the name and arguments of a function that should be called.
       */
      function_call?: Message.FunctionCall;

      /**
       * The refusal message generated by the model.
       */
      refusal?: string | null;

      /**
       * The role of the message author, always 'assistant' in responses.
       */
      role?: 'assistant';

      /**
       * The tool calls generated by the model.
       */
      tool_calls?: Array<Message.Function | Message.Custom>;
    }

    export namespace Message {
      /**
       * Deprecated: the name and arguments of a function that should be called.
       */
      export interface FunctionCall {
        /**
         * Arguments to pass to the function as a JSON string.
         */
        arguments: string;

        /**
         * Name of the function to call.
         */
        name: string;
      }

      /**
       * Tool call specification for OpenAI-compatible chat completion responses.
       */
      export interface Function {
        /**
         * Unique identifier for the tool call.
         */
        id: string;

        /**
         * Function call details.
         */
        function: Function.Function;

        /**
         * Must be 'function' to identify this as a function call.
         */
        type: 'function';
      }

      export namespace Function {
        /**
         * Function call details.
         */
        export interface Function {
          /**
           * Arguments to pass to the function as a JSON string.
           */
          arguments: string;

          /**
           * Name of the function to call.
           */
          name: string;
        }
      }

      /**
       * A call to a custom tool created by the model.
       */
      export interface Custom {
        /**
         * The ID of the tool call.
         */
        id: string;

        /**
         * The custom tool that the model called.
         */
        custom: Custom.Custom;

        /**
         * The type of the tool. Always 'custom'.
         */
        type: 'custom';
      }

      export namespace Custom {
        /**
         * The custom tool that the model called.
         */
        export interface Custom {
          /**
           * The input for the custom tool call generated by the model.
           */
          input: string;

          /**
           * The name of the custom tool to call.
           */
          name: string;
        }
      }
    }

    /**
     * The log probabilities for the tokens in the message.
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
   * Token usage information for the completion.
   */
  export interface Usage {
    /**
     * Number of tokens in the completion.
     */
    completion_tokens?: number;

    /**
     * Detailed breakdown of output token usage.
     */
    completion_tokens_details?: Usage.CompletionTokensDetails;

    /**
     * Number of tokens in the prompt.
     */
    prompt_tokens?: number;

    /**
     * Detailed breakdown of input token usage.
     */
    prompt_tokens_details?: Usage.PromptTokensDetails;

    /**
     * Total tokens used (prompt + completion).
     */
    total_tokens?: number;
  }

  export namespace Usage {
    /**
     * Detailed breakdown of output token usage.
     */
    export interface CompletionTokensDetails {
      /**
       * Number of tokens used for reasoning (o1/o3 models).
       */
      reasoning_tokens?: number;
    }

    /**
     * Detailed breakdown of input token usage.
     */
    export interface PromptTokensDetails {
      /**
       * Number of tokens retrieved from cache.
       */
      cached_tokens?: number;
    }
  }
}

/**
 * Chat completion response extended with the original input messages.
 */
export interface CompletionRetrieveResponse {
  /**
   * The ID of the chat completion.
   */
  id: string;

  /**
   * List of choices.
   */
  choices: Array<CompletionRetrieveResponse.Choice>;

  /**
   * The Unix timestamp in seconds when the chat completion was created.
   */
  created: number;

  /**
   * The input messages used to generate this completion.
   */
  input_messages: Array<
    | CompletionRetrieveResponse.OpenAIUserMessageParamOutput
    | CompletionRetrieveResponse.OpenAISystemMessageParam
    | CompletionRetrieveResponse.OpenAIAssistantMessageParamOutput
    | CompletionRetrieveResponse.OpenAIToolMessageParam
    | CompletionRetrieveResponse.OpenAIDeveloperMessageParam
  >;

  /**
   * The model that was used to generate the chat completion.
   */
  model: string;

  /**
   * The object type.
   */
  object?: 'chat.completion';

  /**
   * The service tier that was used for this response.
   */
  service_tier?: string | null;

  /**
   * System fingerprint for this completion.
   */
  system_fingerprint?: string;

  /**
   * Token usage information for the completion.
   */
  usage?: CompletionRetrieveResponse.Usage;
}

export namespace CompletionRetrieveResponse {
  /**
   * A choice from an OpenAI-compatible chat completion response.
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
     * The message from the model.
     */
    message: Choice.Message;

    /**
     * The log probabilities for the tokens in the message.
     */
    logprobs?: Choice.Logprobs | null;
  }

  export namespace Choice {
    /**
     * The message from the model.
     */
    export interface Message {
      /**
       * Annotations for the message, when applicable.
       */
      annotations?: Array<{ [key: string]: unknown }>;

      /**
       * Audio response data when using audio output modality.
       */
      audio?: { [key: string]: unknown } | null;

      /**
       * The content of the message.
       */
      content?: string | null;

      /**
       * Deprecated: the name and arguments of a function that should be called.
       */
      function_call?: Message.FunctionCall;

      /**
       * The refusal message generated by the model.
       */
      refusal?: string | null;

      /**
       * The role of the message author, always 'assistant' in responses.
       */
      role?: 'assistant';

      /**
       * The tool calls generated by the model.
       */
      tool_calls?: Array<Message.Function | Message.Custom>;
    }

    export namespace Message {
      /**
       * Deprecated: the name and arguments of a function that should be called.
       */
      export interface FunctionCall {
        /**
         * Arguments to pass to the function as a JSON string.
         */
        arguments: string;

        /**
         * Name of the function to call.
         */
        name: string;
      }

      /**
       * Tool call specification for OpenAI-compatible chat completion responses.
       */
      export interface Function {
        /**
         * Unique identifier for the tool call.
         */
        id: string;

        /**
         * Function call details.
         */
        function: Function.Function;

        /**
         * Must be 'function' to identify this as a function call.
         */
        type: 'function';
      }

      export namespace Function {
        /**
         * Function call details.
         */
        export interface Function {
          /**
           * Arguments to pass to the function as a JSON string.
           */
          arguments: string;

          /**
           * Name of the function to call.
           */
          name: string;
        }
      }

      /**
       * A call to a custom tool created by the model.
       */
      export interface Custom {
        /**
         * The ID of the tool call.
         */
        id: string;

        /**
         * The custom tool that the model called.
         */
        custom: Custom.Custom;

        /**
         * The type of the tool. Always 'custom'.
         */
        type: 'custom';
      }

      export namespace Custom {
        /**
         * The custom tool that the model called.
         */
        export interface Custom {
          /**
           * The input for the custom tool call generated by the model.
           */
          input: string;

          /**
           * The name of the custom tool to call.
           */
          name: string;
        }
      }
    }

    /**
     * The log probabilities for the tokens in the message.
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
   * A message from the user in an OpenAI-compatible chat completion request.
   */
  export interface OpenAIUserMessageParamOutput {
    /**
     * The content of the message, which can include text and other media.
     */
    content:
      | string
      | Array<
          | OpenAIUserMessageParamOutput.OpenAIChatCompletionContentPartTextParam
          | OpenAIUserMessageParamOutput.OpenAIChatCompletionContentPartImageParam
          | OpenAIUserMessageParamOutput.OpenAIFile
        >;

    /**
     * The name of the user message participant.
     */
    name?: string | null;

    /**
     * Must be 'user' to identify this as a user message.
     */
    role?: 'user';
  }

  export namespace OpenAIUserMessageParamOutput {
    /**
     * Text content part for OpenAI-compatible chat completion messages.
     */
    export interface OpenAIChatCompletionContentPartTextParam {
      /**
       * The text content of the message.
       */
      text: string;

      /**
       * Must be 'text' to identify this as text content.
       */
      type?: 'text';
    }

    /**
     * Image content part for OpenAI-compatible chat completion messages.
     */
    export interface OpenAIChatCompletionContentPartImageParam {
      /**
       * Image URL specification and processing details.
       */
      image_url: OpenAIChatCompletionContentPartImageParam.ImageURL;

      /**
       * Must be 'image_url' to identify this as image content.
       */
      type?: 'image_url';
    }

    export namespace OpenAIChatCompletionContentPartImageParam {
      /**
       * Image URL specification and processing details.
       */
      export interface ImageURL {
        /**
         * URL of the image to include in the message.
         */
        url: string;

        /**
         * Level of detail for image processing. Can be 'low', 'high', or 'auto'.
         */
        detail?: 'low' | 'high' | 'auto' | null;
      }
    }

    /**
     * File content part for OpenAI-compatible chat completion messages.
     */
    export interface OpenAIFile {
      /**
       * File specification.
       */
      file: OpenAIFile.File;

      /**
       * Must be 'file' to identify this as file content.
       */
      type?: 'file';
    }

    export namespace OpenAIFile {
      /**
       * File specification.
       */
      export interface File {
        /**
         * Base64-encoded file data.
         */
        file_data?: string | null;

        /**
         * ID of an uploaded file.
         */
        file_id?: string | null;

        /**
         * Name of the file.
         */
        filename?: string | null;
      }
    }
  }

  /**
   * A system message providing instructions or context to the model.
   */
  export interface OpenAISystemMessageParam {
    /**
     * The content of the 'system prompt'. If multiple system messages are provided,
     * they are concatenated.
     */
    content: string | Array<OpenAISystemMessageParam.ListOpenAIChatCompletionContentPartTextParam>;

    /**
     * The name of the system message participant.
     */
    name?: string | null;

    /**
     * Must be 'system' to identify this as a system message.
     */
    role?: 'system';
  }

  export namespace OpenAISystemMessageParam {
    /**
     * Text content part for OpenAI-compatible chat completion messages.
     */
    export interface ListOpenAIChatCompletionContentPartTextParam {
      /**
       * The text content of the message.
       */
      text: string;

      /**
       * Must be 'text' to identify this as text content.
       */
      type?: 'text';
    }
  }

  /**
   * A message containing the model's (assistant) response in an OpenAI-compatible
   * chat completion request.
   */
  export interface OpenAIAssistantMessageParamOutput {
    /**
     * The content of the model's response.
     */
    content?:
      | string
      | Array<OpenAIAssistantMessageParamOutput.ListOpenAIChatCompletionContentPartTextParam>
      | null;

    /**
     * The name of the assistant message participant.
     */
    name?: string | null;

    /**
     * Must be 'assistant' to identify this as the model's response.
     */
    role?: 'assistant';

    /**
     * List of tool calls. Each tool call is an OpenAIChatCompletionToolCall object.
     */
    tool_calls?: Array<OpenAIAssistantMessageParamOutput.ToolCall> | null;

    [k: string]: unknown;
  }

  export namespace OpenAIAssistantMessageParamOutput {
    /**
     * Text content part for OpenAI-compatible chat completion messages.
     */
    export interface ListOpenAIChatCompletionContentPartTextParam {
      /**
       * The text content of the message.
       */
      text: string;

      /**
       * Must be 'text' to identify this as text content.
       */
      type?: 'text';
    }

    /**
     * Tool call specification for OpenAI-compatible chat completion responses.
     */
    export interface ToolCall {
      /**
       * Unique identifier for the tool call.
       */
      id: string;

      /**
       * Function call details.
       */
      function: ToolCall.Function;

      /**
       * Must be 'function' to identify this as a function call.
       */
      type: 'function';
    }

    export namespace ToolCall {
      /**
       * Function call details.
       */
      export interface Function {
        /**
         * Arguments to pass to the function as a JSON string.
         */
        arguments: string;

        /**
         * Name of the function to call.
         */
        name: string;
      }
    }
  }

  /**
   * A message representing the result of a tool invocation in an OpenAI-compatible
   * chat completion request.
   */
  export interface OpenAIToolMessageParam {
    /**
     * The response content from the tool.
     */
    content: string | Array<OpenAIToolMessageParam.ListOpenAIChatCompletionContentPartTextParam>;

    /**
     * Unique identifier for the tool call this response is for.
     */
    tool_call_id: string;

    /**
     * Must be 'tool' to identify this as a tool response.
     */
    role?: 'tool';
  }

  export namespace OpenAIToolMessageParam {
    /**
     * Text content part for OpenAI-compatible chat completion messages.
     */
    export interface ListOpenAIChatCompletionContentPartTextParam {
      /**
       * The text content of the message.
       */
      text: string;

      /**
       * Must be 'text' to identify this as text content.
       */
      type?: 'text';
    }
  }

  /**
   * A message from the developer in an OpenAI-compatible chat completion request.
   */
  export interface OpenAIDeveloperMessageParam {
    /**
     * The content of the developer message.
     */
    content: string | Array<OpenAIDeveloperMessageParam.ListOpenAIChatCompletionContentPartTextParam>;

    /**
     * The name of the developer message participant.
     */
    name?: string | null;

    /**
     * Must be 'developer' to identify this as a developer message.
     */
    role?: 'developer';
  }

  export namespace OpenAIDeveloperMessageParam {
    /**
     * Text content part for OpenAI-compatible chat completion messages.
     */
    export interface ListOpenAIChatCompletionContentPartTextParam {
      /**
       * The text content of the message.
       */
      text: string;

      /**
       * Must be 'text' to identify this as text content.
       */
      type?: 'text';
    }
  }

  /**
   * Token usage information for the completion.
   */
  export interface Usage {
    /**
     * Number of tokens in the completion.
     */
    completion_tokens?: number;

    /**
     * Detailed breakdown of output token usage.
     */
    completion_tokens_details?: Usage.CompletionTokensDetails;

    /**
     * Number of tokens in the prompt.
     */
    prompt_tokens?: number;

    /**
     * Detailed breakdown of input token usage.
     */
    prompt_tokens_details?: Usage.PromptTokensDetails;

    /**
     * Total tokens used (prompt + completion).
     */
    total_tokens?: number;
  }

  export namespace Usage {
    /**
     * Detailed breakdown of output token usage.
     */
    export interface CompletionTokensDetails {
      /**
       * Number of tokens used for reasoning (o1/o3 models).
       */
      reasoning_tokens?: number;
    }

    /**
     * Detailed breakdown of input token usage.
     */
    export interface PromptTokensDetails {
      /**
       * Number of tokens retrieved from cache.
       */
      cached_tokens?: number;
    }
  }
}

/**
 * Response from listing OpenAI-compatible chat completions.
 */
export interface CompletionListResponse {
  /**
   * List of chat completion objects with their input messages.
   */
  data: Array<CompletionListResponse.Data>;

  /**
   * ID of the first completion in this list.
   */
  first_id: string;

  /**
   * Whether there are more completions available beyond this list.
   */
  has_more: boolean;

  /**
   * ID of the last completion in this list.
   */
  last_id: string;

  /**
   * Must be 'list' to identify this as a list response.
   */
  object?: 'list';
}

export namespace CompletionListResponse {
  /**
   * Chat completion response extended with the original input messages.
   */
  export interface Data {
    /**
     * The ID of the chat completion.
     */
    id: string;

    /**
     * List of choices.
     */
    choices: Array<Data.Choice>;

    /**
     * The Unix timestamp in seconds when the chat completion was created.
     */
    created: number;

    /**
     * The input messages used to generate this completion.
     */
    input_messages: Array<
      | Data.OpenAIUserMessageParamOutput
      | Data.OpenAISystemMessageParam
      | Data.OpenAIAssistantMessageParamOutput
      | Data.OpenAIToolMessageParam
      | Data.OpenAIDeveloperMessageParam
    >;

    /**
     * The model that was used to generate the chat completion.
     */
    model: string;

    /**
     * The object type.
     */
    object?: 'chat.completion';

    /**
     * The service tier that was used for this response.
     */
    service_tier?: string | null;

    /**
     * System fingerprint for this completion.
     */
    system_fingerprint?: string;

    /**
     * Token usage information for the completion.
     */
    usage?: Data.Usage;
  }

  export namespace Data {
    /**
     * A choice from an OpenAI-compatible chat completion response.
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
       * The message from the model.
       */
      message: Choice.Message;

      /**
       * The log probabilities for the tokens in the message.
       */
      logprobs?: Choice.Logprobs | null;
    }

    export namespace Choice {
      /**
       * The message from the model.
       */
      export interface Message {
        /**
         * Annotations for the message, when applicable.
         */
        annotations?: Array<{ [key: string]: unknown }>;

        /**
         * Audio response data when using audio output modality.
         */
        audio?: { [key: string]: unknown } | null;

        /**
         * The content of the message.
         */
        content?: string | null;

        /**
         * Deprecated: the name and arguments of a function that should be called.
         */
        function_call?: Message.FunctionCall;

        /**
         * The refusal message generated by the model.
         */
        refusal?: string | null;

        /**
         * The role of the message author, always 'assistant' in responses.
         */
        role?: 'assistant';

        /**
         * The tool calls generated by the model.
         */
        tool_calls?: Array<Message.Function | Message.Custom>;
      }

      export namespace Message {
        /**
         * Deprecated: the name and arguments of a function that should be called.
         */
        export interface FunctionCall {
          /**
           * Arguments to pass to the function as a JSON string.
           */
          arguments: string;

          /**
           * Name of the function to call.
           */
          name: string;
        }

        /**
         * Tool call specification for OpenAI-compatible chat completion responses.
         */
        export interface Function {
          /**
           * Unique identifier for the tool call.
           */
          id: string;

          /**
           * Function call details.
           */
          function: Function.Function;

          /**
           * Must be 'function' to identify this as a function call.
           */
          type: 'function';
        }

        export namespace Function {
          /**
           * Function call details.
           */
          export interface Function {
            /**
             * Arguments to pass to the function as a JSON string.
             */
            arguments: string;

            /**
             * Name of the function to call.
             */
            name: string;
          }
        }

        /**
         * A call to a custom tool created by the model.
         */
        export interface Custom {
          /**
           * The ID of the tool call.
           */
          id: string;

          /**
           * The custom tool that the model called.
           */
          custom: Custom.Custom;

          /**
           * The type of the tool. Always 'custom'.
           */
          type: 'custom';
        }

        export namespace Custom {
          /**
           * The custom tool that the model called.
           */
          export interface Custom {
            /**
             * The input for the custom tool call generated by the model.
             */
            input: string;

            /**
             * The name of the custom tool to call.
             */
            name: string;
          }
        }
      }

      /**
       * The log probabilities for the tokens in the message.
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
     * A message from the user in an OpenAI-compatible chat completion request.
     */
    export interface OpenAIUserMessageParamOutput {
      /**
       * The content of the message, which can include text and other media.
       */
      content:
        | string
        | Array<
            | OpenAIUserMessageParamOutput.OpenAIChatCompletionContentPartTextParam
            | OpenAIUserMessageParamOutput.OpenAIChatCompletionContentPartImageParam
            | OpenAIUserMessageParamOutput.OpenAIFile
          >;

      /**
       * The name of the user message participant.
       */
      name?: string | null;

      /**
       * Must be 'user' to identify this as a user message.
       */
      role?: 'user';
    }

    export namespace OpenAIUserMessageParamOutput {
      /**
       * Text content part for OpenAI-compatible chat completion messages.
       */
      export interface OpenAIChatCompletionContentPartTextParam {
        /**
         * The text content of the message.
         */
        text: string;

        /**
         * Must be 'text' to identify this as text content.
         */
        type?: 'text';
      }

      /**
       * Image content part for OpenAI-compatible chat completion messages.
       */
      export interface OpenAIChatCompletionContentPartImageParam {
        /**
         * Image URL specification and processing details.
         */
        image_url: OpenAIChatCompletionContentPartImageParam.ImageURL;

        /**
         * Must be 'image_url' to identify this as image content.
         */
        type?: 'image_url';
      }

      export namespace OpenAIChatCompletionContentPartImageParam {
        /**
         * Image URL specification and processing details.
         */
        export interface ImageURL {
          /**
           * URL of the image to include in the message.
           */
          url: string;

          /**
           * Level of detail for image processing. Can be 'low', 'high', or 'auto'.
           */
          detail?: 'low' | 'high' | 'auto' | null;
        }
      }

      /**
       * File content part for OpenAI-compatible chat completion messages.
       */
      export interface OpenAIFile {
        /**
         * File specification.
         */
        file: OpenAIFile.File;

        /**
         * Must be 'file' to identify this as file content.
         */
        type?: 'file';
      }

      export namespace OpenAIFile {
        /**
         * File specification.
         */
        export interface File {
          /**
           * Base64-encoded file data.
           */
          file_data?: string | null;

          /**
           * ID of an uploaded file.
           */
          file_id?: string | null;

          /**
           * Name of the file.
           */
          filename?: string | null;
        }
      }
    }

    /**
     * A system message providing instructions or context to the model.
     */
    export interface OpenAISystemMessageParam {
      /**
       * The content of the 'system prompt'. If multiple system messages are provided,
       * they are concatenated.
       */
      content: string | Array<OpenAISystemMessageParam.ListOpenAIChatCompletionContentPartTextParam>;

      /**
       * The name of the system message participant.
       */
      name?: string | null;

      /**
       * Must be 'system' to identify this as a system message.
       */
      role?: 'system';
    }

    export namespace OpenAISystemMessageParam {
      /**
       * Text content part for OpenAI-compatible chat completion messages.
       */
      export interface ListOpenAIChatCompletionContentPartTextParam {
        /**
         * The text content of the message.
         */
        text: string;

        /**
         * Must be 'text' to identify this as text content.
         */
        type?: 'text';
      }
    }

    /**
     * A message containing the model's (assistant) response in an OpenAI-compatible
     * chat completion request.
     */
    export interface OpenAIAssistantMessageParamOutput {
      /**
       * The content of the model's response.
       */
      content?:
        | string
        | Array<OpenAIAssistantMessageParamOutput.ListOpenAIChatCompletionContentPartTextParam>
        | null;

      /**
       * The name of the assistant message participant.
       */
      name?: string | null;

      /**
       * Must be 'assistant' to identify this as the model's response.
       */
      role?: 'assistant';

      /**
       * List of tool calls. Each tool call is an OpenAIChatCompletionToolCall object.
       */
      tool_calls?: Array<OpenAIAssistantMessageParamOutput.ToolCall> | null;

      [k: string]: unknown;
    }

    export namespace OpenAIAssistantMessageParamOutput {
      /**
       * Text content part for OpenAI-compatible chat completion messages.
       */
      export interface ListOpenAIChatCompletionContentPartTextParam {
        /**
         * The text content of the message.
         */
        text: string;

        /**
         * Must be 'text' to identify this as text content.
         */
        type?: 'text';
      }

      /**
       * Tool call specification for OpenAI-compatible chat completion responses.
       */
      export interface ToolCall {
        /**
         * Unique identifier for the tool call.
         */
        id: string;

        /**
         * Function call details.
         */
        function: ToolCall.Function;

        /**
         * Must be 'function' to identify this as a function call.
         */
        type: 'function';
      }

      export namespace ToolCall {
        /**
         * Function call details.
         */
        export interface Function {
          /**
           * Arguments to pass to the function as a JSON string.
           */
          arguments: string;

          /**
           * Name of the function to call.
           */
          name: string;
        }
      }
    }

    /**
     * A message representing the result of a tool invocation in an OpenAI-compatible
     * chat completion request.
     */
    export interface OpenAIToolMessageParam {
      /**
       * The response content from the tool.
       */
      content: string | Array<OpenAIToolMessageParam.ListOpenAIChatCompletionContentPartTextParam>;

      /**
       * Unique identifier for the tool call this response is for.
       */
      tool_call_id: string;

      /**
       * Must be 'tool' to identify this as a tool response.
       */
      role?: 'tool';
    }

    export namespace OpenAIToolMessageParam {
      /**
       * Text content part for OpenAI-compatible chat completion messages.
       */
      export interface ListOpenAIChatCompletionContentPartTextParam {
        /**
         * The text content of the message.
         */
        text: string;

        /**
         * Must be 'text' to identify this as text content.
         */
        type?: 'text';
      }
    }

    /**
     * A message from the developer in an OpenAI-compatible chat completion request.
     */
    export interface OpenAIDeveloperMessageParam {
      /**
       * The content of the developer message.
       */
      content: string | Array<OpenAIDeveloperMessageParam.ListOpenAIChatCompletionContentPartTextParam>;

      /**
       * The name of the developer message participant.
       */
      name?: string | null;

      /**
       * Must be 'developer' to identify this as a developer message.
       */
      role?: 'developer';
    }

    export namespace OpenAIDeveloperMessageParam {
      /**
       * Text content part for OpenAI-compatible chat completion messages.
       */
      export interface ListOpenAIChatCompletionContentPartTextParam {
        /**
         * The text content of the message.
         */
        text: string;

        /**
         * Must be 'text' to identify this as text content.
         */
        type?: 'text';
      }
    }

    /**
     * Token usage information for the completion.
     */
    export interface Usage {
      /**
       * Number of tokens in the completion.
       */
      completion_tokens?: number;

      /**
       * Detailed breakdown of output token usage.
       */
      completion_tokens_details?: Usage.CompletionTokensDetails;

      /**
       * Number of tokens in the prompt.
       */
      prompt_tokens?: number;

      /**
       * Detailed breakdown of input token usage.
       */
      prompt_tokens_details?: Usage.PromptTokensDetails;

      /**
       * Total tokens used (prompt + completion).
       */
      total_tokens?: number;
    }

    export namespace Usage {
      /**
       * Detailed breakdown of output token usage.
       */
      export interface CompletionTokensDetails {
        /**
         * Number of tokens used for reasoning (o1/o3 models).
         */
        reasoning_tokens?: number;
      }

      /**
       * Detailed breakdown of input token usage.
       */
      export interface PromptTokensDetails {
        /**
         * Number of tokens retrieved from cache.
         */
        cached_tokens?: number;
      }
    }
  }
}

export type CompletionCreateParams = CompletionCreateParamsNonStreaming | CompletionCreateParamsStreaming;

export interface CompletionCreateParamsBase {
  /**
   * List of messages in the conversation.
   */
  messages: Array<
    | CompletionCreateParams.OpenAIUserMessageParamInput
    | CompletionCreateParams.OpenAISystemMessageParam
    | CompletionCreateParams.OpenAIAssistantMessageParamInput
    | CompletionCreateParams.OpenAIToolMessageParam
    | CompletionCreateParams.OpenAIDeveloperMessageParam
  >;

  /**
   * The identifier of the model to use.
   */
  model: string;

  /**
   * The penalty for repeated tokens.
   */
  frequency_penalty?: number | null;

  /**
   * The function call to use.
   */
  function_call?: string | { [key: string]: unknown } | null;

  /**
   * List of functions to use.
   */
  functions?: Array<{ [key: string]: unknown }> | null;

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
  max_completion_tokens?: number | null;

  /**
   * The maximum number of tokens to generate.
   */
  max_tokens?: number | null;

  /**
   * The number of completions to generate.
   */
  n?: number | null;

  /**
   * Whether to parallelize tool calls.
   */
  parallel_tool_calls?: boolean | null;

  /**
   * The penalty for repeated tokens.
   */
  presence_penalty?: number | null;

  /**
   * A key to use when reading from or writing to the prompt cache.
   */
  prompt_cache_key?: string | null;

  /**
   * The effort level for reasoning models.
   */
  reasoning_effort?: 'none' | 'minimal' | 'low' | 'medium' | 'high' | 'xhigh' | null;

  /**
   * The response format to use.
   */
  response_format?:
    | CompletionCreateParams.OpenAIResponseFormatText
    | CompletionCreateParams.OpenAIResponseFormatJsonSchema
    | CompletionCreateParams.OpenAIResponseFormatJsonObject
    | null;

  /**
   * The seed to use.
   */
  seed?: number | null;

  /**
   * The service tier for the request.
   */
  service_tier?: 'auto' | 'default' | 'flex' | 'priority' | null;

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
   * The temperature to use.
   */
  temperature?: number | null;

  /**
   * The tool choice to use.
   */
  tool_choice?: string | { [key: string]: unknown } | null;

  /**
   * The tools to use.
   */
  tools?: Array<{ [key: string]: unknown }> | null;

  /**
   * The number of most likely tokens to return at each position.
   */
  top_logprobs?: number | null;

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
  /**
   * A message from the user in an OpenAI-compatible chat completion request.
   */
  export interface OpenAIUserMessageParamInput {
    /**
     * The content of the message, which can include text and other media.
     */
    content:
      | string
      | Array<
          | OpenAIUserMessageParamInput.OpenAIChatCompletionContentPartTextParam
          | OpenAIUserMessageParamInput.OpenAIChatCompletionContentPartImageParam
          | OpenAIUserMessageParamInput.OpenAIFile
        >;

    /**
     * The name of the user message participant.
     */
    name?: string | null;

    /**
     * Must be 'user' to identify this as a user message.
     */
    role?: 'user';
  }

  export namespace OpenAIUserMessageParamInput {
    /**
     * Text content part for OpenAI-compatible chat completion messages.
     */
    export interface OpenAIChatCompletionContentPartTextParam {
      /**
       * The text content of the message.
       */
      text: string;

      /**
       * Must be 'text' to identify this as text content.
       */
      type?: 'text';
    }

    /**
     * Image content part for OpenAI-compatible chat completion messages.
     */
    export interface OpenAIChatCompletionContentPartImageParam {
      /**
       * Image URL specification and processing details.
       */
      image_url: OpenAIChatCompletionContentPartImageParam.ImageURL;

      /**
       * Must be 'image_url' to identify this as image content.
       */
      type?: 'image_url';
    }

    export namespace OpenAIChatCompletionContentPartImageParam {
      /**
       * Image URL specification and processing details.
       */
      export interface ImageURL {
        /**
         * URL of the image to include in the message.
         */
        url: string;

        /**
         * Level of detail for image processing. Can be 'low', 'high', or 'auto'.
         */
        detail?: 'low' | 'high' | 'auto' | null;
      }
    }

    /**
     * File content part for OpenAI-compatible chat completion messages.
     */
    export interface OpenAIFile {
      /**
       * File specification.
       */
      file: OpenAIFile.File;

      /**
       * Must be 'file' to identify this as file content.
       */
      type?: 'file';
    }

    export namespace OpenAIFile {
      /**
       * File specification.
       */
      export interface File {
        /**
         * Base64-encoded file data.
         */
        file_data?: string | null;

        /**
         * ID of an uploaded file.
         */
        file_id?: string | null;

        /**
         * Name of the file.
         */
        filename?: string | null;
      }
    }
  }

  /**
   * A system message providing instructions or context to the model.
   */
  export interface OpenAISystemMessageParam {
    /**
     * The content of the 'system prompt'. If multiple system messages are provided,
     * they are concatenated.
     */
    content: string | Array<OpenAISystemMessageParam.ListOpenAIChatCompletionContentPartTextParam>;

    /**
     * The name of the system message participant.
     */
    name?: string | null;

    /**
     * Must be 'system' to identify this as a system message.
     */
    role?: 'system';
  }

  export namespace OpenAISystemMessageParam {
    /**
     * Text content part for OpenAI-compatible chat completion messages.
     */
    export interface ListOpenAIChatCompletionContentPartTextParam {
      /**
       * The text content of the message.
       */
      text: string;

      /**
       * Must be 'text' to identify this as text content.
       */
      type?: 'text';
    }
  }

  /**
   * A message containing the model's (assistant) response in an OpenAI-compatible
   * chat completion request.
   */
  export interface OpenAIAssistantMessageParamInput {
    /**
     * The content of the model's response.
     */
    content?:
      | string
      | Array<OpenAIAssistantMessageParamInput.ListOpenAIChatCompletionContentPartTextParam>
      | null;

    /**
     * The name of the assistant message participant.
     */
    name?: string | null;

    /**
     * Must be 'assistant' to identify this as the model's response.
     */
    role?: 'assistant';

    /**
     * List of tool calls. Each tool call is an OpenAIChatCompletionToolCall object.
     */
    tool_calls?: Array<OpenAIAssistantMessageParamInput.ToolCall> | null;

    [k: string]: unknown;
  }

  export namespace OpenAIAssistantMessageParamInput {
    /**
     * Text content part for OpenAI-compatible chat completion messages.
     */
    export interface ListOpenAIChatCompletionContentPartTextParam {
      /**
       * The text content of the message.
       */
      text: string;

      /**
       * Must be 'text' to identify this as text content.
       */
      type?: 'text';
    }

    /**
     * Tool call specification for OpenAI-compatible chat completion responses.
     */
    export interface ToolCall {
      /**
       * Unique identifier for the tool call.
       */
      id: string;

      /**
       * Function call details.
       */
      function: ToolCall.Function;

      /**
       * Must be 'function' to identify this as a function call.
       */
      type: 'function';
    }

    export namespace ToolCall {
      /**
       * Function call details.
       */
      export interface Function {
        /**
         * Arguments to pass to the function as a JSON string.
         */
        arguments: string;

        /**
         * Name of the function to call.
         */
        name: string;
      }
    }
  }

  /**
   * A message representing the result of a tool invocation in an OpenAI-compatible
   * chat completion request.
   */
  export interface OpenAIToolMessageParam {
    /**
     * The response content from the tool.
     */
    content: string | Array<OpenAIToolMessageParam.ListOpenAIChatCompletionContentPartTextParam>;

    /**
     * Unique identifier for the tool call this response is for.
     */
    tool_call_id: string;

    /**
     * Must be 'tool' to identify this as a tool response.
     */
    role?: 'tool';
  }

  export namespace OpenAIToolMessageParam {
    /**
     * Text content part for OpenAI-compatible chat completion messages.
     */
    export interface ListOpenAIChatCompletionContentPartTextParam {
      /**
       * The text content of the message.
       */
      text: string;

      /**
       * Must be 'text' to identify this as text content.
       */
      type?: 'text';
    }
  }

  /**
   * A message from the developer in an OpenAI-compatible chat completion request.
   */
  export interface OpenAIDeveloperMessageParam {
    /**
     * The content of the developer message.
     */
    content: string | Array<OpenAIDeveloperMessageParam.ListOpenAIChatCompletionContentPartTextParam>;

    /**
     * The name of the developer message participant.
     */
    name?: string | null;

    /**
     * Must be 'developer' to identify this as a developer message.
     */
    role?: 'developer';
  }

  export namespace OpenAIDeveloperMessageParam {
    /**
     * Text content part for OpenAI-compatible chat completion messages.
     */
    export interface ListOpenAIChatCompletionContentPartTextParam {
      /**
       * The text content of the message.
       */
      text: string;

      /**
       * Must be 'text' to identify this as text content.
       */
      type?: 'text';
    }
  }

  /**
   * Text response format for OpenAI-compatible chat completion requests.
   */
  export interface OpenAIResponseFormatText {
    /**
     * Must be 'text' to indicate plain text response format.
     */
    type?: 'text';
  }

  /**
   * JSON schema response format for OpenAI-compatible chat completion requests.
   */
  export interface OpenAIResponseFormatJsonSchema {
    /**
     * The JSON schema specification for the response.
     */
    json_schema: OpenAIResponseFormatJsonSchema.JsonSchema;

    /**
     * Must be 'json_schema' to indicate structured JSON response format.
     */
    type?: 'json_schema';
  }

  export namespace OpenAIResponseFormatJsonSchema {
    /**
     * The JSON schema specification for the response.
     */
    export interface JsonSchema {
      description?: string | null;

      name?: string;

      schema?: { [key: string]: unknown } | null;

      strict?: boolean | null;
    }
  }

  /**
   * JSON object response format for OpenAI-compatible chat completion requests.
   */
  export interface OpenAIResponseFormatJsonObject {
    /**
     * Must be 'json_object' to indicate generic JSON object response format.
     */
    type?: 'json_object';
  }

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

export interface CompletionListParams {
  /**
   * The ID of the last chat completion to return.
   */
  after?: string | null;

  /**
   * The maximum number of chat completions to return.
   */
  limit?: number | null;

  /**
   * The model to filter by.
   */
  model?: string | null;

  /**
   * The order to sort the chat completions by: "asc" or "desc". Defaults to "desc".
   */
  order?: 'asc' | 'desc' | null;
}

Completions.Messages = Messages;
Completions.MessageListResponsesOpenAICursorPage = MessageListResponsesOpenAICursorPage;

export declare namespace Completions {
  export {
    type CompletionCreateResponse as CompletionCreateResponse,
    type CompletionRetrieveResponse as CompletionRetrieveResponse,
    type CompletionListResponse as CompletionListResponse,
    type CompletionCreateParams as CompletionCreateParams,
    type CompletionCreateParamsNonStreaming as CompletionCreateParamsNonStreaming,
    type CompletionCreateParamsStreaming as CompletionCreateParamsStreaming,
    type CompletionListParams as CompletionListParams,
  };

  export {
    Messages as Messages,
    type MessageListResponse as MessageListResponse,
    MessageListResponsesOpenAICursorPage as MessageListResponsesOpenAICursorPage,
    type MessageListParams as MessageListParams,
  };
}
