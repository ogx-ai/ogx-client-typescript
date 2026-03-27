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

/**
 * OpenAI-compatible Moderations API.
 */
export class Safety extends APIResource {
  /**
   * Run a safety shield on messages to check for policy violations.
   */
  runShield(body: SafetyRunShieldParams, options?: Core.RequestOptions): Core.APIPromise<RunShieldResponse> {
    return this._client.post('/v1/safety/run-shield', { body, ...options });
  }
}

/**
 * Response from running a safety shield.
 */
export interface RunShieldResponse {
  /**
   * Details of a safety violation detected by content moderation.
   */
  violation?: Shared.SafetyViolation | null;
}

export interface SafetyRunShieldParams {
  /**
   * The messages to run the shield on
   */
  messages: Array<
    | SafetyRunShieldParams.OpenAIUserMessageParamInput
    | SafetyRunShieldParams.OpenAISystemMessageParam
    | SafetyRunShieldParams.OpenAIAssistantMessageParamInput
    | SafetyRunShieldParams.OpenAIToolMessageParam
    | SafetyRunShieldParams.OpenAIDeveloperMessageParam
  >;

  /**
   * The identifier of the shield to run
   */
  shield_id: string;
}

export namespace SafetyRunShieldParams {
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
}

export declare namespace Safety {
  export { type RunShieldResponse as RunShieldResponse, type SafetyRunShieldParams as SafetyRunShieldParams };
}
