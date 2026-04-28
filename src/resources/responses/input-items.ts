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

/**
 * OpenAI Responses API for agent orchestration with tool use, multi-turn conversations, and background processing.
 */
export class InputItems extends APIResource {
  /**
   * List input items.
   */
  list(
    responseId: string,
    query?: InputItemListParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<InputItemListResponse>;
  list(responseId: string, options?: Core.RequestOptions): Core.APIPromise<InputItemListResponse>;
  list(
    responseId: string,
    query: InputItemListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<InputItemListResponse> {
    if (isRequestOptions(query)) {
      return this.list(responseId, {}, query);
    }
    return this._client.get(`/v1/responses/${responseId}/input_items`, { query, ...options });
  }
}

/**
 * List container for OpenAI response input items.
 */
export interface InputItemListResponse {
  data: Array<
    | InputItemListResponse.OpenAIResponseMessageOutput
    | InputItemListResponse.OpenAIResponseOutputMessageWebSearchToolCall
    | InputItemListResponse.OpenAIResponseOutputMessageFileSearchToolCall
    | InputItemListResponse.OpenAIResponseOutputMessageFunctionToolCall
    | InputItemListResponse.OpenAIResponseOutputMessageMcpCall
    | InputItemListResponse.OpenAIResponseOutputMessageMcpListTools
    | InputItemListResponse.OpenAIResponseMcpApprovalRequest
    | InputItemListResponse.OpenAIResponseOutputMessageReasoningItem
    | InputItemListResponse.OpenAIResponseInputFunctionToolCallOutput
    | InputItemListResponse.OpenAIResponseMcpApprovalResponse
    | InputItemListResponse.OpenAIResponseCompaction
  >;

  object?: 'list';
}

export namespace InputItemListResponse {
  /**
   * Corresponds to the various Message types in the Responses API. They are all
   * under one type because the Responses API gives them all the same "type" value,
   * and there is no way to tell them apart in certain scenarios.
   */
  export interface OpenAIResponseMessageOutput {
    content:
      | string
      | Array<
          | OpenAIResponseMessageOutput.OpenAIResponseInputMessageContentText
          | OpenAIResponseMessageOutput.OpenAIResponseInputMessageContentImage
          | OpenAIResponseMessageOutput.OpenAIResponseInputMessageContentFile
        >
      | Array<
          | OpenAIResponseMessageOutput.OpenAIResponseOutputMessageContentOutputTextOutput
          | OpenAIResponseMessageOutput.OpenAIResponseContentPartRefusal
        >;

    role: 'system' | 'developer' | 'user' | 'assistant';

    id?: string | null;

    status?: string | null;

    type?: 'message';
  }

  export namespace OpenAIResponseMessageOutput {
    /**
     * Text content for input messages in OpenAI response format.
     */
    export interface OpenAIResponseInputMessageContentText {
      text: string;

      type?: 'input_text';
    }

    /**
     * Image content for input messages in OpenAI response format.
     */
    export interface OpenAIResponseInputMessageContentImage {
      detail?: 'low' | 'high' | 'auto';

      file_id?: string | null;

      image_url?: string | null;

      type?: 'input_image';
    }

    /**
     * File content for input messages in OpenAI response format.
     */
    export interface OpenAIResponseInputMessageContentFile {
      file_data?: string | null;

      file_id?: string | null;

      file_url?: string | null;

      filename?: string | null;

      type?: 'input_file';
    }

    /**
     * Text content within an output message of an OpenAI response.
     */
    export interface OpenAIResponseOutputMessageContentOutputTextOutput {
      text: string;

      annotations?: Array<
        | OpenAIResponseOutputMessageContentOutputTextOutput.OpenAIResponseAnnotationFileCitation
        | OpenAIResponseOutputMessageContentOutputTextOutput.OpenAIResponseAnnotationCitation
        | OpenAIResponseOutputMessageContentOutputTextOutput.OpenAIResponseAnnotationContainerFileCitation
        | OpenAIResponseOutputMessageContentOutputTextOutput.OpenAIResponseAnnotationFilePath
      >;

      logprobs?: Array<OpenAIResponseOutputMessageContentOutputTextOutput.Logprob> | null;

      type?: 'output_text';
    }

    export namespace OpenAIResponseOutputMessageContentOutputTextOutput {
      /**
       * File citation annotation for referencing specific files in response content.
       */
      export interface OpenAIResponseAnnotationFileCitation {
        file_id: string;

        filename: string;

        index: number;

        type?: 'file_citation';
      }

      /**
       * URL citation annotation for referencing external web resources.
       */
      export interface OpenAIResponseAnnotationCitation {
        end_index: number;

        start_index: number;

        title: string;

        url: string;

        type?: 'url_citation';
      }

      /**
       * Container file citation annotation referencing a file within a container.
       */
      export interface OpenAIResponseAnnotationContainerFileCitation {
        container_id: string;

        end_index: number;

        file_id: string;

        filename: string;

        start_index: number;

        type?: 'container_file_citation';
      }

      /**
       * File path annotation referencing a generated file in response content.
       */
      export interface OpenAIResponseAnnotationFilePath {
        file_id: string;

        index: number;

        type?: 'file_path';
      }

      /**
       * The log probability for a token from an OpenAI-compatible chat completion
       * response.
       */
      export interface Logprob {
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
        top_logprobs?: Array<Logprob.TopLogprob> | null;
      }

      export namespace Logprob {
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

    /**
     * Refusal content within a streamed response part.
     */
    export interface OpenAIResponseContentPartRefusal {
      refusal: string;

      type?: 'refusal';
    }
  }

  /**
   * Web search tool call output message for OpenAI responses.
   */
  export interface OpenAIResponseOutputMessageWebSearchToolCall {
    id: string;

    status: string;

    type?: 'web_search_call';
  }

  /**
   * File search tool call output message for OpenAI responses.
   */
  export interface OpenAIResponseOutputMessageFileSearchToolCall {
    id: string;

    queries: Array<string>;

    status: string;

    results?: Array<OpenAIResponseOutputMessageFileSearchToolCall.Result> | null;

    type?: 'file_search_call';
  }

  export namespace OpenAIResponseOutputMessageFileSearchToolCall {
    /**
     * Search results returned by the file search operation.
     */
    export interface Result {
      attributes: { [key: string]: unknown };

      file_id: string;

      filename: string;

      score: number;

      text: string;
    }
  }

  /**
   * Function tool call output message for OpenAI responses.
   */
  export interface OpenAIResponseOutputMessageFunctionToolCall {
    arguments: string;

    call_id: string;

    name: string;

    id?: string | null;

    status?: string | null;

    type?: 'function_call';
  }

  /**
   * Model Context Protocol (MCP) call output message for OpenAI responses.
   */
  export interface OpenAIResponseOutputMessageMcpCall {
    id: string;

    arguments: string;

    name: string;

    server_label: string;

    error?: string | null;

    output?: string | null;

    type?: 'mcp_call';
  }

  /**
   * MCP list tools output message containing available tools from an MCP server.
   */
  export interface OpenAIResponseOutputMessageMcpListTools {
    id: string;

    server_label: string;

    tools: Array<OpenAIResponseOutputMessageMcpListTools.Tool>;

    type?: 'mcp_list_tools';
  }

  export namespace OpenAIResponseOutputMessageMcpListTools {
    /**
     * Tool definition returned by MCP list tools operation.
     */
    export interface Tool {
      input_schema: { [key: string]: unknown };

      name: string;

      description?: string | null;
    }
  }

  /**
   * A request for human approval of a tool invocation.
   */
  export interface OpenAIResponseMcpApprovalRequest {
    id: string;

    arguments: string;

    name: string;

    server_label: string;

    type?: 'mcp_approval_request';
  }

  /**
   * Reasoning output from the model, representing the model's thinking process.
   */
  export interface OpenAIResponseOutputMessageReasoningItem {
    /**
     * Unique identifier for the reasoning output item.
     */
    id: string;

    /**
     * Summary of the reasoning output.
     */
    summary: Array<OpenAIResponseOutputMessageReasoningItem.Summary>;

    /**
     * The reasoning content from the model.
     */
    content?: Array<OpenAIResponseOutputMessageReasoningItem.Content> | null;

    /**
     * The status of the reasoning output.
     */
    status?: 'in_progress' | 'completed' | 'incomplete' | null;

    /**
     * The type identifier, always 'reasoning'.
     */
    type?: 'reasoning';
  }

  export namespace OpenAIResponseOutputMessageReasoningItem {
    /**
     * A summary of reasoning output from the model.
     */
    export interface Summary {
      /**
       * The summary text of the reasoning output.
       */
      text: string;

      /**
       * The type identifier, always 'summary_text'.
       */
      type?: 'summary_text';
    }

    /**
     * Reasoning text from the model.
     */
    export interface Content {
      /**
       * The reasoning text content from the model.
       */
      text: string;

      /**
       * The type identifier, always 'reasoning_text'.
       */
      type?: 'reasoning_text';
    }
  }

  /**
   * This represents the output of a function call that gets passed back to the
   * model.
   */
  export interface OpenAIResponseInputFunctionToolCallOutput {
    call_id: string;

    output:
      | string
      | Array<
          | OpenAIResponseInputFunctionToolCallOutput.OpenAIResponseInputMessageContentText
          | OpenAIResponseInputFunctionToolCallOutput.OpenAIResponseInputMessageContentImage
          | OpenAIResponseInputFunctionToolCallOutput.OpenAIResponseInputMessageContentFile
        >;

    id?: string | null;

    status?: string | null;

    type?: 'function_call_output';
  }

  export namespace OpenAIResponseInputFunctionToolCallOutput {
    /**
     * Text content for input messages in OpenAI response format.
     */
    export interface OpenAIResponseInputMessageContentText {
      text: string;

      type?: 'input_text';
    }

    /**
     * Image content for input messages in OpenAI response format.
     */
    export interface OpenAIResponseInputMessageContentImage {
      detail?: 'low' | 'high' | 'auto';

      file_id?: string | null;

      image_url?: string | null;

      type?: 'input_image';
    }

    /**
     * File content for input messages in OpenAI response format.
     */
    export interface OpenAIResponseInputMessageContentFile {
      file_data?: string | null;

      file_id?: string | null;

      file_url?: string | null;

      filename?: string | null;

      type?: 'input_file';
    }
  }

  /**
   * A response to an MCP approval request.
   */
  export interface OpenAIResponseMcpApprovalResponse {
    approval_request_id: string;

    approve: boolean;

    id?: string | null;

    reason?: string | null;

    type?: 'mcp_approval_response';
  }

  /**
   * A compaction item that summarizes prior conversation context.
   */
  export interface OpenAIResponseCompaction {
    encrypted_content: string;

    id?: string | null;

    type?: 'compaction';
  }
}

export interface InputItemListParams {
  /**
   * An item ID to list items after, used for pagination.
   */
  after?: string | null;

  /**
   * An item ID to list items before, used for pagination.
   */
  before?: string | null;

  /**
   * Additional fields to include in the response.
   */
  include?: Array<
    | 'web_search_call.action.sources'
    | 'code_interpreter_call.outputs'
    | 'computer_call_output.output.image_url'
    | 'file_search_call.results'
    | 'message.input_image.image_url'
    | 'message.output_text.logprobs'
    | 'reasoning.encrypted_content'
  > | null;

  /**
   * A limit on the number of objects to be returned. Limit can range between 1 and
   * 100, and the default is 20.
   */
  limit?: number | null;

  /**
   * The order to return the input items in.
   */
  order?: 'asc' | 'desc' | null;
}

export declare namespace InputItems {
  export {
    type InputItemListResponse as InputItemListResponse,
    type InputItemListParams as InputItemListParams,
  };
}
