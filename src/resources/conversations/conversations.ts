// Copyright (c) The OGX Contributors.
// All rights reserved.
//
// This source code is licensed under the terms described in the LICENSE file in
// the root directory of this source tree.
//
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';
import * as ItemsAPI from './items';
import {
  ItemCreateParams,
  ItemCreateResponse,
  ItemGetParams,
  ItemGetResponse,
  ItemListParams,
  ItemListResponse,
  ItemListResponsesOpenAICursorPage,
  Items,
} from './items';

/**
 * Protocol for conversation management operations.
 */
export class Conversations extends APIResource {
  items: ItemsAPI.Items = new ItemsAPI.Items(this._client);

  /**
   * Create a conversation.
   */
  create(body: ConversationCreateParams, options?: Core.RequestOptions): Core.APIPromise<ConversationObject> {
    return this._client.post('/v1/conversations', { body, ...options });
  }

  /**
   * Get a conversation with the given ID.
   */
  retrieve(conversationId: string, options?: Core.RequestOptions): Core.APIPromise<ConversationObject> {
    return this._client.get(`/v1/conversations/${conversationId}`, options);
  }

  /**
   * Update a conversation's metadata with the given ID.
   */
  update(
    conversationId: string,
    body: ConversationUpdateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<ConversationObject> {
    return this._client.post(`/v1/conversations/${conversationId}`, { body, ...options });
  }

  /**
   * Delete a conversation with the given ID.
   */
  delete(conversationId: string, options?: Core.RequestOptions): Core.APIPromise<ConversationDeleteResponse> {
    return this._client.delete(`/v1/conversations/${conversationId}`, options);
  }
}

/**
 * OpenAI-compatible conversation object.
 */
export interface ConversationObject {
  /**
   * The unique ID of the conversation.
   */
  id: string;

  /**
   * The time at which the conversation was created, measured in seconds since the
   * Unix epoch.
   */
  created_at: number;

  /**
   * Set of 16 key-value pairs that can be attached to an object. This can be useful
   * for storing additional information about the object in a structured format, and
   * querying for objects via API or the dashboard.
   */
  metadata?: { [key: string]: string } | null;

  /**
   * The object type, which is always conversation.
   */
  object?: 'conversation';
}

/**
 * Response for deleted conversation.
 */
export interface ConversationDeleteResponse {
  /**
   * The deleted conversation identifier
   */
  id: string;

  /**
   * Whether the object was deleted
   */
  deleted?: boolean;

  /**
   * Object type
   */
  object?: 'conversation.deleted';
}

export interface ConversationCreateParams {
  /**
   * Initial items to include in the conversation context.
   */
  items?: Array<
    | ConversationCreateParams.OpenAIResponseMessageInput
    | ConversationCreateParams.OpenAIResponseOutputMessageWebSearchToolCallInput
    | ConversationCreateParams.OpenAIResponseOutputMessageFileSearchToolCall
    | ConversationCreateParams.OpenAIResponseOutputMessageFunctionToolCall
    | ConversationCreateParams.OpenAIResponseInputFunctionToolCallOutput
    | ConversationCreateParams.OpenAIResponseMcpApprovalRequest
    | ConversationCreateParams.OpenAIResponseMcpApprovalResponse
    | ConversationCreateParams.OpenAIResponseOutputMessageMcpCall
    | ConversationCreateParams.OpenAIResponseOutputMessageMcpListTools
    | ConversationCreateParams.OpenAIResponseOutputMessageReasoningItem
    | ConversationCreateParams.OpenAIResponseCompaction
  > | null;

  /**
   * Set of key-value pairs that can be attached to an object.
   */
  metadata?: { [key: string]: string } | null;
}

export namespace ConversationCreateParams {
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
  export interface OpenAIResponseOutputMessageWebSearchToolCallInput {
    id: string;

    status: string;

    /**
     * Web search action: performs a search query.
     */
    action?:
      | OpenAIResponseOutputMessageWebSearchToolCallInput.WebSearchActionSearch
      | OpenAIResponseOutputMessageWebSearchToolCallInput.WebSearchActionOpenPage
      | OpenAIResponseOutputMessageWebSearchToolCallInput.WebSearchActionFind
      | null;

    type?: 'web_search_call';
  }

  export namespace OpenAIResponseOutputMessageWebSearchToolCallInput {
    /**
     * Web search action: performs a search query.
     */
    export interface WebSearchActionSearch {
      query: string;

      queries?: Array<string> | null;

      sources?: Array<WebSearchActionSearch.Source> | null;

      type?: 'search';
    }

    export namespace WebSearchActionSearch {
      /**
       * A source URL returned by a web search action.
       */
      export interface Source {
        url: string;

        type?: 'url';
      }
    }

    /**
     * Web search action: opens a specific URL from search results.
     */
    export interface WebSearchActionOpenPage {
      type?: 'open_page';

      url?: string | null;
    }

    /**
     * Web search action: searches for a pattern within a loaded page.
     */
    export interface WebSearchActionFind {
      pattern: string;

      url: string;

      type?: 'find_in_page';
    }
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

export interface ConversationUpdateParams {
  /**
   * Set of key-value pairs that can be attached to an object.
   */
  metadata: { [key: string]: string };
}

Conversations.Items = Items;
Conversations.ItemListResponsesOpenAICursorPage = ItemListResponsesOpenAICursorPage;

export declare namespace Conversations {
  export {
    type ConversationObject as ConversationObject,
    type ConversationDeleteResponse as ConversationDeleteResponse,
    type ConversationCreateParams as ConversationCreateParams,
    type ConversationUpdateParams as ConversationUpdateParams,
  };

  export {
    Items as Items,
    type ItemCreateResponse as ItemCreateResponse,
    type ItemListResponse as ItemListResponse,
    type ItemGetResponse as ItemGetResponse,
    ItemListResponsesOpenAICursorPage as ItemListResponsesOpenAICursorPage,
    type ItemCreateParams as ItemCreateParams,
    type ItemListParams as ItemListParams,
    type ItemGetParams as ItemGetParams,
  };
}
