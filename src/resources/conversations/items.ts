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
import * as ConversationsAPI from './conversations';
import { OpenAICursorPage, type OpenAICursorPageParams } from '../../pagination';

/**
 * Protocol for conversation management operations.
 */
export class Items extends APIResource {
  /**
   * Create items in the conversation.
   */
  create(
    conversationId: string,
    body: ItemCreateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<ItemCreateResponse> {
    return this._client.post(`/v1/conversations/${conversationId}/items`, { body, ...options });
  }

  /**
   * List items in the conversation.
   */
  list(
    conversationId: string,
    query?: ItemListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<ItemListResponsesOpenAICursorPage, ItemListResponse>;
  list(
    conversationId: string,
    options?: Core.RequestOptions,
  ): Core.PagePromise<ItemListResponsesOpenAICursorPage, ItemListResponse>;
  list(
    conversationId: string,
    query: ItemListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<ItemListResponsesOpenAICursorPage, ItemListResponse> {
    if (isRequestOptions(query)) {
      return this.list(conversationId, {}, query);
    }
    return this._client.getAPIList(
      `/v1/conversations/${conversationId}/items`,
      ItemListResponsesOpenAICursorPage,
      { query, ...options },
    );
  }

  /**
   * Delete a conversation item.
   */
  delete(
    conversationId: string,
    itemId: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<ConversationsAPI.ConversationObject> {
    return this._client.delete(`/v1/conversations/${conversationId}/items/${itemId}`, options);
  }

  /**
   * Retrieve a conversation item.
   */
  get(
    conversationId: string,
    itemId: string,
    query?: ItemGetParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<ItemGetResponse>;
  get(
    conversationId: string,
    itemId: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<ItemGetResponse>;
  get(
    conversationId: string,
    itemId: string,
    query: ItemGetParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<ItemGetResponse> {
    if (isRequestOptions(query)) {
      return this.get(conversationId, itemId, {}, query);
    }
    return this._client.get(`/v1/conversations/${conversationId}/items/${itemId}`, { query, ...options });
  }
}

export class ItemListResponsesOpenAICursorPage extends OpenAICursorPage<ItemListResponse> {}

/**
 * List of conversation items with pagination.
 */
export interface ItemCreateResponse {
  /**
   * List of conversation items
   */
  data: Array<
    | ItemCreateResponse.OpenAIResponseMessageOutput
    | ItemCreateResponse.OpenAIResponseOutputMessageWebSearchToolCall
    | ItemCreateResponse.OpenAIResponseOutputMessageFileSearchToolCall
    | ItemCreateResponse.OpenAIResponseOutputMessageFunctionToolCall
    | ItemCreateResponse.OpenAIResponseInputFunctionToolCallOutput
    | ItemCreateResponse.OpenAIResponseMcpApprovalRequest
    | ItemCreateResponse.OpenAIResponseMcpApprovalResponse
    | ItemCreateResponse.OpenAIResponseOutputMessageMcpCall
    | ItemCreateResponse.OpenAIResponseOutputMessageMcpListTools
    | ItemCreateResponse.OpenAIResponseOutputMessageReasoningItem
    | ItemCreateResponse.OpenAIResponseCompaction
  >;

  /**
   * The ID of the first item in the list.
   */
  first_id: string | null;

  /**
   * Whether there are more items available.
   */
  has_more: boolean;

  /**
   * The ID of the last item in the list.
   */
  last_id: string | null;

  /**
   * The type of object returned, must be list.
   */
  object?: 'list';
}

export namespace ItemCreateResponse {
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
   * A compaction item that summarizes prior conversation context.
   */
  export interface OpenAIResponseCompaction {
    encrypted_content: string;

    id?: string | null;

    type?: 'compaction';
  }
}

/**
 * Corresponds to the various Message types in the Responses API. They are all
 * under one type because the Responses API gives them all the same "type" value,
 * and there is no way to tell them apart in certain scenarios.
 */
export type ItemListResponse =
  | ItemListResponse.OpenAIResponseMessageOutput
  | ItemListResponse.OpenAIResponseOutputMessageWebSearchToolCall
  | ItemListResponse.OpenAIResponseOutputMessageFileSearchToolCall
  | ItemListResponse.OpenAIResponseOutputMessageFunctionToolCall
  | ItemListResponse.OpenAIResponseInputFunctionToolCallOutput
  | ItemListResponse.OpenAIResponseMcpApprovalRequest
  | ItemListResponse.OpenAIResponseMcpApprovalResponse
  | ItemListResponse.OpenAIResponseOutputMessageMcpCall
  | ItemListResponse.OpenAIResponseOutputMessageMcpListTools
  | ItemListResponse.OpenAIResponseOutputMessageReasoningItem
  | ItemListResponse.OpenAIResponseCompaction;

export namespace ItemListResponse {
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
   * A compaction item that summarizes prior conversation context.
   */
  export interface OpenAIResponseCompaction {
    encrypted_content: string;

    id?: string | null;

    type?: 'compaction';
  }
}

/**
 * Corresponds to the various Message types in the Responses API. They are all
 * under one type because the Responses API gives them all the same "type" value,
 * and there is no way to tell them apart in certain scenarios.
 */
export type ItemGetResponse =
  | ItemGetResponse.OpenAIResponseMessageOutput
  | ItemGetResponse.OpenAIResponseOutputMessageWebSearchToolCall
  | ItemGetResponse.OpenAIResponseOutputMessageFileSearchToolCall
  | ItemGetResponse.OpenAIResponseOutputMessageFunctionToolCall
  | ItemGetResponse.OpenAIResponseInputFunctionToolCallOutput
  | ItemGetResponse.OpenAIResponseMcpApprovalRequest
  | ItemGetResponse.OpenAIResponseMcpApprovalResponse
  | ItemGetResponse.OpenAIResponseOutputMessageMcpCall
  | ItemGetResponse.OpenAIResponseOutputMessageMcpListTools
  | ItemGetResponse.OpenAIResponseOutputMessageReasoningItem
  | ItemGetResponse.OpenAIResponseCompaction;

export namespace ItemGetResponse {
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
   * A compaction item that summarizes prior conversation context.
   */
  export interface OpenAIResponseCompaction {
    encrypted_content: string;

    id?: string | null;

    type?: 'compaction';
  }
}

export interface ItemCreateParams {
  /**
   * Items to include in the conversation context. You may add up to 20 items at a
   * time.
   */
  items: Array<
    | ItemCreateParams.OpenAIResponseMessageInput
    | ItemCreateParams.OpenAIResponseOutputMessageWebSearchToolCall
    | ItemCreateParams.OpenAIResponseOutputMessageFileSearchToolCall
    | ItemCreateParams.OpenAIResponseOutputMessageFunctionToolCall
    | ItemCreateParams.OpenAIResponseInputFunctionToolCallOutput
    | ItemCreateParams.OpenAIResponseMcpApprovalRequest
    | ItemCreateParams.OpenAIResponseMcpApprovalResponse
    | ItemCreateParams.OpenAIResponseOutputMessageMcpCall
    | ItemCreateParams.OpenAIResponseOutputMessageMcpListTools
    | ItemCreateParams.OpenAIResponseOutputMessageReasoningItem
    | ItemCreateParams.OpenAIResponseCompaction
  >;
}

export namespace ItemCreateParams {
  /**
   * Corresponds to the various Message types in the Responses API. They are all
   * under one type because the Responses API gives them all the same "type" value,
   * and there is no way to tell them apart in certain scenarios.
   */
  export interface OpenAIResponseMessageInput {
    content:
      | string
      | Array<
          | OpenAIResponseMessageInput.OpenAIResponseInputMessageContentText
          | OpenAIResponseMessageInput.OpenAIResponseInputMessageContentImage
          | OpenAIResponseMessageInput.OpenAIResponseInputMessageContentFile
        >
      | Array<
          | OpenAIResponseMessageInput.OpenAIResponseOutputMessageContentOutputTextInput
          | OpenAIResponseMessageInput.OpenAIResponseContentPartRefusal
        >;

    role: 'system' | 'developer' | 'user' | 'assistant';

    id?: string | null;

    status?: string | null;

    type?: 'message';
  }

  export namespace OpenAIResponseMessageInput {
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
    export interface OpenAIResponseOutputMessageContentOutputTextInput {
      text: string;

      annotations?: Array<
        | OpenAIResponseOutputMessageContentOutputTextInput.OpenAIResponseAnnotationFileCitation
        | OpenAIResponseOutputMessageContentOutputTextInput.OpenAIResponseAnnotationCitation
        | OpenAIResponseOutputMessageContentOutputTextInput.OpenAIResponseAnnotationContainerFileCitation
        | OpenAIResponseOutputMessageContentOutputTextInput.OpenAIResponseAnnotationFilePath
      >;

      logprobs?: Array<OpenAIResponseOutputMessageContentOutputTextInput.Logprob> | null;

      type?: 'output_text';
    }

    export namespace OpenAIResponseOutputMessageContentOutputTextInput {
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
   * A compaction item that summarizes prior conversation context.
   */
  export interface OpenAIResponseCompaction {
    encrypted_content: string;

    id?: string | null;

    type?: 'compaction';
  }
}

export interface ItemListParams extends OpenAICursorPageParams {
  include?: Array<
    | 'web_search_call.action.sources'
    | 'code_interpreter_call.outputs'
    | 'computer_call_output.output.image_url'
    | 'file_search_call.results'
    | 'message.input_image.image_url'
    | 'message.output_text.logprobs'
    | 'reasoning.encrypted_content'
  > | null;

  order?: 'asc' | 'desc' | null;
}

export interface ItemGetParams {
  include?: Array<
    | 'web_search_call.action.sources'
    | 'code_interpreter_call.outputs'
    | 'computer_call_output.output.image_url'
    | 'file_search_call.results'
    | 'message.input_image.image_url'
    | 'message.output_text.logprobs'
    | 'reasoning.encrypted_content'
  > | null;
}

Items.ItemListResponsesOpenAICursorPage = ItemListResponsesOpenAICursorPage;

export declare namespace Items {
  export {
    type ItemCreateResponse as ItemCreateResponse,
    type ItemListResponse as ItemListResponse,
    type ItemGetResponse as ItemGetResponse,
    ItemListResponsesOpenAICursorPage as ItemListResponsesOpenAICursorPage,
    type ItemCreateParams as ItemCreateParams,
    type ItemListParams as ItemListParams,
    type ItemGetParams as ItemGetParams,
  };
}
