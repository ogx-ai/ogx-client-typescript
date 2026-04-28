// Copyright (c) The OGX Contributors.
// All rights reserved.
//
// This source code is licensed under the terms described in the LICENSE file in
// the root directory of this source tree.
//
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import { isRequestOptions } from '../../core';
import { APIPromise } from '../../core';
import * as Core from '../../core';
import * as ResponsesAPI from './responses';
import * as InputItemsAPI from './input-items';
import { InputItemListParams, InputItemListResponse, InputItems } from './input-items';
import { OpenAICursorPage, type OpenAICursorPageParams } from '../../pagination';
import { Stream } from '../../streaming';

/**
 * OpenAI Responses API for agent orchestration with tool use, multi-turn conversations, and background processing.
 */
export class Responses extends APIResource {
  inputItems: InputItemsAPI.InputItems = new InputItemsAPI.InputItems(this._client);

  /**
   * Create a model response.
   */
  create(body: ResponseCreateParamsNonStreaming, options?: Core.RequestOptions): APIPromise<ResponseObject>;
  create(
    body: ResponseCreateParamsStreaming,
    options?: Core.RequestOptions,
  ): APIPromise<Stream<ResponseObjectStream>>;
  create(
    body: ResponseCreateParamsBase,
    options?: Core.RequestOptions,
  ): APIPromise<Stream<ResponseObjectStream> | ResponseObject>;
  create(
    body: ResponseCreateParams,
    options?: Core.RequestOptions,
  ): APIPromise<ResponseObject> | APIPromise<Stream<ResponseObjectStream>> {
    return this._client.post('/v1/responses', { body, ...options, stream: body.stream ?? false }) as
      | APIPromise<ResponseObject>
      | APIPromise<Stream<ResponseObjectStream>>;
  }

  /**
   * Get a model response.
   */
  retrieve(responseId: string, options?: Core.RequestOptions): Core.APIPromise<ResponseObject> {
    return this._client.get(`/v1/responses/${responseId}`, options);
  }

  /**
   * List all responses.
   */
  list(
    query?: ResponseListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<ResponseListResponsesOpenAICursorPage, ResponseListResponse>;
  list(
    options?: Core.RequestOptions,
  ): Core.PagePromise<ResponseListResponsesOpenAICursorPage, ResponseListResponse>;
  list(
    query: ResponseListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<ResponseListResponsesOpenAICursorPage, ResponseListResponse> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.getAPIList('/v1/responses', ResponseListResponsesOpenAICursorPage, {
      query,
      ...options,
    });
  }

  /**
   * Delete a response.
   */
  delete(responseId: string, options?: Core.RequestOptions): Core.APIPromise<ResponseDeleteResponse> {
    return this._client.delete(`/v1/responses/${responseId}`, options);
  }

  /**
   * **[alpha]** Compresses conversation history into a smaller representation while
   * preserving context. This endpoint is in alpha and may change without notice.
   */
  compact(body: ResponseCompactParams, options?: Core.RequestOptions): Core.APIPromise<CompactedResponse> {
    return this._client.post('/v1/responses/compact', { body, ...options });
  }
}

export class ResponseListResponsesOpenAICursorPage extends OpenAICursorPage<ResponseListResponse> {}

/**
 * Response from compacting a conversation.
 */
export interface CompactedResponse {
  id: string;

  created_at: number;

  output: Array<
    | CompactedResponse.OpenAIResponseMessageOutput
    | CompactedResponse.OpenAIResponseOutputMessageWebSearchToolCall
    | CompactedResponse.OpenAIResponseOutputMessageFileSearchToolCall
    | CompactedResponse.OpenAIResponseOutputMessageFunctionToolCall
    | CompactedResponse.OpenAIResponseOutputMessageMcpCall
    | CompactedResponse.OpenAIResponseOutputMessageMcpListTools
    | CompactedResponse.OpenAIResponseMcpApprovalRequest
    | CompactedResponse.OpenAIResponseOutputMessageReasoningItem
    | CompactedResponse.OpenAIResponseInputFunctionToolCallOutput
    | CompactedResponse.OpenAIResponseMcpApprovalResponse
    | CompactedResponse.OpenAIResponseCompaction
  >;

  /**
   * Usage information for OpenAI response.
   */
  usage: CompactedResponse.Usage;

  object?: 'response.compaction';
}

export namespace CompactedResponse {
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

  /**
   * Usage information for OpenAI response.
   */
  export interface Usage {
    input_tokens: number;

    /**
     * Token details for input tokens in OpenAI response usage.
     */
    input_tokens_details: Usage.InputTokensDetails;

    output_tokens: number;

    /**
     * Token details for output tokens in OpenAI response usage.
     */
    output_tokens_details: Usage.OutputTokensDetails;

    total_tokens: number;
  }

  export namespace Usage {
    /**
     * Token details for input tokens in OpenAI response usage.
     */
    export interface InputTokensDetails {
      cached_tokens: number;
    }

    /**
     * Token details for output tokens in OpenAI response usage.
     */
    export interface OutputTokensDetails {
      reasoning_tokens: number;
    }
  }
}

/**
 * Corresponds to the various Message types in the Responses API. They are all
 * under one type because the Responses API gives them all the same "type" value,
 * and there is no way to tell them apart in certain scenarios.
 */
export type ResponseInput =
  | ResponseMessage
  | ResponseInput.OpenAIResponseOutputMessageWebSearchToolCall
  | ResponseInput.OpenAIResponseOutputMessageFileSearchToolCall
  | ResponseInput.OpenAIResponseOutputMessageFunctionToolCall
  | ResponseInput.OpenAIResponseOutputMessageMcpCall
  | ResponseInput.OpenAIResponseOutputMessageMcpListTools
  | ResponseInput.OpenAIResponseMcpApprovalRequest
  | ResponseInput.OpenAIResponseOutputMessageReasoningItem
  | ResponseInput.OpenAIResponseInputFunctionToolCallOutput
  | ResponseInput.OpenAIResponseMcpApprovalResponse
  | ResponseInput.OpenAIResponseCompaction
  | ResponseMessage;

export namespace ResponseInput {
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

/**
 * Corresponds to the various Message types in the Responses API. They are all
 * under one type because the Responses API gives them all the same "type" value,
 * and there is no way to tell them apart in certain scenarios.
 */
export interface ResponseMessage {
  content:
    | string
    | Array<
        | ResponseMessage.OpenAIResponseInputMessageContentText
        | ResponseMessage.OpenAIResponseInputMessageContentImage
        | ResponseMessage.OpenAIResponseInputMessageContentFile
      >
    | Array<
        | ResponseMessage.OpenAIResponseOutputMessageContentOutputText
        | ResponseMessage.OpenAIResponseContentPartRefusal
      >;

  role: 'system' | 'developer' | 'user' | 'assistant';

  id?: string | null;

  status?: string | null;

  type?: 'message';
}

export namespace ResponseMessage {
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
  export interface OpenAIResponseOutputMessageContentOutputText {
    text: string;

    annotations?: Array<
      | OpenAIResponseOutputMessageContentOutputText.OpenAIResponseAnnotationFileCitation
      | OpenAIResponseOutputMessageContentOutputText.OpenAIResponseAnnotationCitation
      | OpenAIResponseOutputMessageContentOutputText.OpenAIResponseAnnotationContainerFileCitation
      | OpenAIResponseOutputMessageContentOutputText.OpenAIResponseAnnotationFilePath
    >;

    logprobs?: Array<OpenAIResponseOutputMessageContentOutputText.Logprob> | null;

    type?: 'output_text';
  }

  export namespace OpenAIResponseOutputMessageContentOutputText {
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
 * Complete OpenAI response object containing generation results and metadata.
 */
export interface ResponseObject {
  id: string;

  created_at: number;

  model: string;

  output: Array<
    | ResponseObject.OpenAIResponseMessageOutput
    | ResponseObject.OpenAIResponseOutputMessageWebSearchToolCall
    | ResponseObject.OpenAIResponseOutputMessageFileSearchToolCall
    | ResponseObject.OpenAIResponseOutputMessageFunctionToolCall
    | ResponseObject.OpenAIResponseOutputMessageMcpCall
    | ResponseObject.OpenAIResponseOutputMessageMcpListTools
    | ResponseObject.OpenAIResponseMcpApprovalRequest
    | ResponseObject.OpenAIResponseOutputMessageReasoningItem
  >;

  status: string;

  store: boolean;

  background?: boolean;

  completed_at?: number | null;

  /**
   * Error details for failed OpenAI response requests.
   */
  error?: ResponseObject.Error | null;

  frequency_penalty?: number;

  /**
   * Details explaining why a response was incomplete.
   */
  incomplete_details?: ResponseObject.IncompleteDetails | null;

  instructions?: string | null;

  max_output_tokens?: number | null;

  max_tool_calls?: number | null;

  metadata?: { [key: string]: string } | null;

  object?: 'response';

  parallel_tool_calls?: boolean;

  presence_penalty?: number;

  previous_response_id?: string | null;

  /**
   * OpenAI compatible Prompt object that is used in OpenAI responses.
   */
  prompt?: ResponseObject.Prompt | null;

  prompt_cache_key?: string | null;

  /**
   * Configuration for reasoning effort in OpenAI responses.
   *
   * Controls how much reasoning the model performs before generating a response.
   */
  reasoning?: ResponseObject.Reasoning | null;

  safety_identifier?: string | null;

  service_tier?: string;

  temperature?: number;

  /**
   * Text response configuration for OpenAI responses.
   */
  text?: ResponseObject.Text;

  /**
   * Enumeration of simple tool choice modes for response generation.
   */
  tool_choice?:
    | 'auto'
    | 'required'
    | 'none'
    | ResponseObject.OpenAIResponseInputToolChoiceAllowedTools
    | ResponseObject.OpenAIResponseInputToolChoiceFileSearch
    | ResponseObject.OpenAIResponseInputToolChoiceWebSearch
    | ResponseObject.OpenAIResponseInputToolChoiceFunctionTool
    | ResponseObject.OpenAIResponseInputToolChoiceMcpTool
    | ResponseObject.OpenAIResponseInputToolChoiceCustomTool
    | null;

  tools?: Array<
    | ResponseObject.OpenAIResponseInputToolWebSearch
    | ResponseObject.OpenAIResponseInputToolFileSearch
    | ResponseObject.OpenAIResponseInputToolFunction
    | ResponseObject.OpenAIResponseToolMcp
  >;

  top_logprobs?: number;

  top_p?: number;

  truncation?: string | null;

  /**
   * Usage information for OpenAI response.
   */
  usage?: ResponseObject.Usage | null;
}

export namespace ResponseObject {
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
   * Error details for failed OpenAI response requests.
   */
  export interface Error {
    code: string;

    message: string;
  }

  /**
   * Details explaining why a response was incomplete.
   */
  export interface IncompleteDetails {
    reason: string;
  }

  /**
   * OpenAI compatible Prompt object that is used in OpenAI responses.
   */
  export interface Prompt {
    id: string;

    variables?: {
      [key: string]:
        | Prompt.OpenAIResponseInputMessageContentText
        | Prompt.OpenAIResponseInputMessageContentImage
        | Prompt.OpenAIResponseInputMessageContentFile;
    } | null;

    version?: string | null;
  }

  export namespace Prompt {
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
   * Configuration for reasoning effort in OpenAI responses.
   *
   * Controls how much reasoning the model performs before generating a response.
   */
  export interface Reasoning {
    effort?: 'none' | 'minimal' | 'low' | 'medium' | 'high' | 'xhigh' | null;

    /**
     * Summary mode for reasoning output. One of 'auto', 'concise', or 'detailed'.
     */
    summary?: 'auto' | 'concise' | 'detailed' | null;
  }

  /**
   * Text response configuration for OpenAI responses.
   */
  export interface Text {
    /**
     * Configuration for Responses API text format.
     */
    format?: Text.Format | null;

    verbosity?: 'low' | 'medium' | 'high' | null;
  }

  export namespace Text {
    /**
     * Configuration for Responses API text format.
     */
    export interface Format {
      description?: string | null;

      name?: string | null;

      schema?: { [key: string]: unknown } | null;

      strict?: boolean | null;

      type?: 'text' | 'json_schema' | 'json_object';
    }
  }

  /**
   * Constrains the tools available to the model to a pre-defined set.
   */
  export interface OpenAIResponseInputToolChoiceAllowedTools {
    tools: Array<{ [key: string]: string }>;

    mode?: 'auto' | 'required';

    type?: 'allowed_tools';
  }

  /**
   * Indicates that the model should use file search to generate a response.
   */
  export interface OpenAIResponseInputToolChoiceFileSearch {
    type?: 'file_search';
  }

  /**
   * Indicates that the model should use web search to generate a response
   */
  export interface OpenAIResponseInputToolChoiceWebSearch {
    type?: 'web_search' | 'web_search_preview' | 'web_search_preview_2025_03_11' | 'web_search_2025_08_26';
  }

  /**
   * Forces the model to call a specific function.
   */
  export interface OpenAIResponseInputToolChoiceFunctionTool {
    name: string;

    type?: 'function';
  }

  /**
   * Forces the model to call a specific tool on a remote MCP server
   */
  export interface OpenAIResponseInputToolChoiceMcpTool {
    server_label: string;

    name?: string | null;

    type?: 'mcp';
  }

  /**
   * Forces the model to call a custom tool.
   */
  export interface OpenAIResponseInputToolChoiceCustomTool {
    name: string;

    type?: 'custom';
  }

  /**
   * Web search tool configuration for OpenAI response inputs.
   */
  export interface OpenAIResponseInputToolWebSearch {
    search_context_size?: string | null;

    type?: 'web_search' | 'web_search_preview' | 'web_search_preview_2025_03_11' | 'web_search_2025_08_26';
  }

  /**
   * File search tool configuration for OpenAI response inputs.
   */
  export interface OpenAIResponseInputToolFileSearch {
    vector_store_ids: Array<string>;

    filters?: { [key: string]: unknown } | null;

    max_num_results?: number | null;

    /**
     * Options for ranking and filtering search results.
     *
     * This class configures how search results are ranked and filtered. You can use
     * algorithm-based rerankers (weighted, RRF) or neural rerankers. Defaults from
     * VectorStoresConfig are used when parameters are not provided.
     *
     * Examples: # Weighted ranker with custom alpha
     * SearchRankingOptions(ranker="weighted", alpha=0.7)
     *
     *     # RRF ranker with custom impact factor
     *     SearchRankingOptions(ranker="rrf", impact_factor=50.0)
     *
     *     # Use config defaults (just specify ranker type)
     *     SearchRankingOptions(ranker="weighted")  # Uses alpha from VectorStoresConfig
     *
     *     # Score threshold filtering
     *     SearchRankingOptions(ranker="weighted", score_threshold=0.5)
     */
    ranking_options?: OpenAIResponseInputToolFileSearch.RankingOptions | null;

    type?: 'file_search';
  }

  export namespace OpenAIResponseInputToolFileSearch {
    /**
     * Options for ranking and filtering search results.
     *
     * This class configures how search results are ranked and filtered. You can use
     * algorithm-based rerankers (weighted, RRF) or neural rerankers. Defaults from
     * VectorStoresConfig are used when parameters are not provided.
     *
     * Examples: # Weighted ranker with custom alpha
     * SearchRankingOptions(ranker="weighted", alpha=0.7)
     *
     *     # RRF ranker with custom impact factor
     *     SearchRankingOptions(ranker="rrf", impact_factor=50.0)
     *
     *     # Use config defaults (just specify ranker type)
     *     SearchRankingOptions(ranker="weighted")  # Uses alpha from VectorStoresConfig
     *
     *     # Score threshold filtering
     *     SearchRankingOptions(ranker="weighted", score_threshold=0.5)
     */
    export interface RankingOptions {
      /**
       * Weight factor for weighted ranker
       */
      alpha?: number | null;

      /**
       * Impact factor for RRF algorithm
       */
      impact_factor?: number | null;

      /**
       * Model identifier for neural reranker
       */
      model?: string | null;

      ranker?: string | null;

      score_threshold?: number | null;

      /**
       * Weights for combining vector, keyword, and neural scores. Keys: 'vector',
       * 'keyword', 'neural'
       */
      weights?: { [key: string]: number } | null;
    }
  }

  /**
   * Function tool configuration for OpenAI response inputs.
   */
  export interface OpenAIResponseInputToolFunction {
    name: string;

    parameters: { [key: string]: unknown } | null;

    description?: string | null;

    strict?: boolean | null;

    type?: 'function';
  }

  /**
   * Model Context Protocol (MCP) tool configuration for OpenAI response object.
   */
  export interface OpenAIResponseToolMcp {
    server_label: string;

    /**
     * Filter configuration for restricting which MCP tools can be used.
     */
    allowed_tools?: Array<string> | OpenAIResponseToolMcp.AllowedToolsFilter | null;

    type?: 'mcp';
  }

  export namespace OpenAIResponseToolMcp {
    /**
     * Filter configuration for restricting which MCP tools can be used.
     */
    export interface AllowedToolsFilter {
      tool_names?: Array<string> | null;
    }
  }

  /**
   * Usage information for OpenAI response.
   */
  export interface Usage {
    input_tokens: number;

    /**
     * Token details for input tokens in OpenAI response usage.
     */
    input_tokens_details: Usage.InputTokensDetails;

    output_tokens: number;

    /**
     * Token details for output tokens in OpenAI response usage.
     */
    output_tokens_details: Usage.OutputTokensDetails;

    total_tokens: number;
  }

  export namespace Usage {
    /**
     * Token details for input tokens in OpenAI response usage.
     */
    export interface InputTokensDetails {
      cached_tokens: number;
    }

    /**
     * Token details for output tokens in OpenAI response usage.
     */
    export interface OutputTokensDetails {
      reasoning_tokens: number;
    }
  }
}

/**
 * Streaming event indicating a new response has been created.
 */
export type ResponseObjectStream =
  | ResponseObjectStream.OpenAIResponseObjectStreamResponseCreated
  | ResponseObjectStream.OpenAIResponseObjectStreamResponseInProgress
  | ResponseObjectStream.OpenAIResponseObjectStreamResponseOutputItemAdded
  | ResponseObjectStream.OpenAIResponseObjectStreamResponseOutputItemDone
  | ResponseObjectStream.OpenAIResponseObjectStreamResponseOutputTextDelta
  | ResponseObjectStream.OpenAIResponseObjectStreamResponseOutputTextDone
  | ResponseObjectStream.OpenAIResponseObjectStreamResponseFunctionCallArgumentsDelta
  | ResponseObjectStream.OpenAIResponseObjectStreamResponseFunctionCallArgumentsDone
  | ResponseObjectStream.OpenAIResponseObjectStreamResponseWebSearchCallInProgress
  | ResponseObjectStream.OpenAIResponseObjectStreamResponseWebSearchCallSearching
  | ResponseObjectStream.OpenAIResponseObjectStreamResponseWebSearchCallCompleted
  | ResponseObjectStream.OpenAIResponseObjectStreamResponseMcpListToolsInProgress
  | ResponseObjectStream.OpenAIResponseObjectStreamResponseMcpListToolsFailed
  | ResponseObjectStream.OpenAIResponseObjectStreamResponseMcpListToolsCompleted
  | ResponseObjectStream.OpenAIResponseObjectStreamResponseMcpCallArgumentsDelta
  | ResponseObjectStream.OpenAIResponseObjectStreamResponseMcpCallArgumentsDone
  | ResponseObjectStream.OpenAIResponseObjectStreamResponseMcpCallInProgress
  | ResponseObjectStream.OpenAIResponseObjectStreamResponseMcpCallFailed
  | ResponseObjectStream.OpenAIResponseObjectStreamResponseMcpCallCompleted
  | ResponseObjectStream.OpenAIResponseObjectStreamResponseContentPartAdded
  | ResponseObjectStream.OpenAIResponseObjectStreamResponseContentPartDone
  | ResponseObjectStream.OpenAIResponseObjectStreamResponseReasoningTextDelta
  | ResponseObjectStream.OpenAIResponseObjectStreamResponseReasoningTextDone
  | ResponseObjectStream.OpenAIResponseObjectStreamResponseReasoningSummaryPartAdded
  | ResponseObjectStream.OpenAIResponseObjectStreamResponseReasoningSummaryPartDone
  | ResponseObjectStream.OpenAIResponseObjectStreamResponseReasoningSummaryTextDelta
  | ResponseObjectStream.OpenAIResponseObjectStreamResponseReasoningSummaryTextDone
  | ResponseObjectStream.OpenAIResponseObjectStreamResponseRefusalDelta
  | ResponseObjectStream.OpenAIResponseObjectStreamResponseRefusalDone
  | ResponseObjectStream.OpenAIResponseObjectStreamResponseOutputTextAnnotationAdded
  | ResponseObjectStream.OpenAIResponseObjectStreamResponseFileSearchCallInProgress
  | ResponseObjectStream.OpenAIResponseObjectStreamResponseFileSearchCallSearching
  | ResponseObjectStream.OpenAIResponseObjectStreamResponseFileSearchCallCompleted
  | ResponseObjectStream.OpenAIResponseObjectStreamResponseIncomplete
  | ResponseObjectStream.OpenAIResponseObjectStreamResponseFailed
  | ResponseObjectStream.OpenAIResponseObjectStreamResponseCompleted
  | ResponseObjectStream.OpenAIResponseObjectStreamError;

export namespace ResponseObjectStream {
  /**
   * Streaming event indicating a new response has been created.
   */
  export interface OpenAIResponseObjectStreamResponseCreated {
    /**
     * Complete OpenAI response object containing generation results and metadata.
     */
    response: ResponsesAPI.ResponseObject;

    sequence_number: number;

    type?: 'response.created';
  }

  /**
   * Streaming event indicating the response remains in progress.
   */
  export interface OpenAIResponseObjectStreamResponseInProgress {
    /**
     * Complete OpenAI response object containing generation results and metadata.
     */
    response: ResponsesAPI.ResponseObject;

    sequence_number: number;

    type?: 'response.in_progress';
  }

  /**
   * Streaming event for when a new output item is added to the response.
   */
  export interface OpenAIResponseObjectStreamResponseOutputItemAdded {
    /**
     * Corresponds to the various Message types in the Responses API. They are all
     * under one type because the Responses API gives them all the same "type" value,
     * and there is no way to tell them apart in certain scenarios.
     */
    item:
      | ResponsesAPI.ResponseMessage
      | OpenAIResponseObjectStreamResponseOutputItemAdded.OpenAIResponseOutputMessageWebSearchToolCall
      | OpenAIResponseObjectStreamResponseOutputItemAdded.OpenAIResponseOutputMessageFileSearchToolCall
      | OpenAIResponseObjectStreamResponseOutputItemAdded.OpenAIResponseOutputMessageFunctionToolCall
      | OpenAIResponseObjectStreamResponseOutputItemAdded.OpenAIResponseOutputMessageMcpCall
      | OpenAIResponseObjectStreamResponseOutputItemAdded.OpenAIResponseOutputMessageMcpListTools
      | OpenAIResponseObjectStreamResponseOutputItemAdded.OpenAIResponseMcpApprovalRequest
      | OpenAIResponseObjectStreamResponseOutputItemAdded.OpenAIResponseOutputMessageReasoningItem;

    output_index: number;

    response_id: string;

    sequence_number: number;

    type?: 'response.output_item.added';
  }

  export namespace OpenAIResponseObjectStreamResponseOutputItemAdded {
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
  }

  /**
   * Streaming event for when an output item is completed.
   */
  export interface OpenAIResponseObjectStreamResponseOutputItemDone {
    /**
     * Corresponds to the various Message types in the Responses API. They are all
     * under one type because the Responses API gives them all the same "type" value,
     * and there is no way to tell them apart in certain scenarios.
     */
    item:
      | ResponsesAPI.ResponseMessage
      | OpenAIResponseObjectStreamResponseOutputItemDone.OpenAIResponseOutputMessageWebSearchToolCall
      | OpenAIResponseObjectStreamResponseOutputItemDone.OpenAIResponseOutputMessageFileSearchToolCall
      | OpenAIResponseObjectStreamResponseOutputItemDone.OpenAIResponseOutputMessageFunctionToolCall
      | OpenAIResponseObjectStreamResponseOutputItemDone.OpenAIResponseOutputMessageMcpCall
      | OpenAIResponseObjectStreamResponseOutputItemDone.OpenAIResponseOutputMessageMcpListTools
      | OpenAIResponseObjectStreamResponseOutputItemDone.OpenAIResponseMcpApprovalRequest
      | OpenAIResponseObjectStreamResponseOutputItemDone.OpenAIResponseOutputMessageReasoningItem;

    output_index: number;

    response_id: string;

    sequence_number: number;

    type?: 'response.output_item.done';
  }

  export namespace OpenAIResponseObjectStreamResponseOutputItemDone {
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
  }

  /**
   * Streaming event for incremental text content updates.
   */
  export interface OpenAIResponseObjectStreamResponseOutputTextDelta {
    content_index: number;

    delta: string;

    item_id: string;

    output_index: number;

    sequence_number: number;

    logprobs?: Array<OpenAIResponseObjectStreamResponseOutputTextDelta.Logprob> | null;

    type?: 'response.output_text.delta';
  }

  export namespace OpenAIResponseObjectStreamResponseOutputTextDelta {
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
   * Streaming event for when text output is completed.
   */
  export interface OpenAIResponseObjectStreamResponseOutputTextDone {
    content_index: number;

    item_id: string;

    output_index: number;

    sequence_number: number;

    text: string;

    type?: 'response.output_text.done';
  }

  /**
   * Streaming event for incremental function call argument updates.
   */
  export interface OpenAIResponseObjectStreamResponseFunctionCallArgumentsDelta {
    delta: string;

    item_id: string;

    output_index: number;

    sequence_number: number;

    type?: 'response.function_call_arguments.delta';
  }

  /**
   * Streaming event for when function call arguments are completed.
   */
  export interface OpenAIResponseObjectStreamResponseFunctionCallArgumentsDone {
    arguments: string;

    item_id: string;

    output_index: number;

    sequence_number: number;

    type?: 'response.function_call_arguments.done';
  }

  /**
   * Streaming event for web search calls in progress.
   */
  export interface OpenAIResponseObjectStreamResponseWebSearchCallInProgress {
    item_id: string;

    output_index: number;

    sequence_number: number;

    type?: 'response.web_search_call.in_progress';
  }

  /**
   * Streaming event for web search calls currently searching.
   */
  export interface OpenAIResponseObjectStreamResponseWebSearchCallSearching {
    item_id: string;

    output_index: number;

    sequence_number: number;

    type?: 'response.web_search_call.searching';
  }

  /**
   * Streaming event for completed web search calls.
   */
  export interface OpenAIResponseObjectStreamResponseWebSearchCallCompleted {
    item_id: string;

    output_index: number;

    sequence_number: number;

    type?: 'response.web_search_call.completed';
  }

  /**
   * Streaming event for MCP list tools operation in progress.
   */
  export interface OpenAIResponseObjectStreamResponseMcpListToolsInProgress {
    sequence_number: number;

    type?: 'response.mcp_list_tools.in_progress';
  }

  /**
   * Streaming event for a failed MCP list tools operation.
   */
  export interface OpenAIResponseObjectStreamResponseMcpListToolsFailed {
    sequence_number: number;

    type?: 'response.mcp_list_tools.failed';
  }

  /**
   * Streaming event for a completed MCP list tools operation.
   */
  export interface OpenAIResponseObjectStreamResponseMcpListToolsCompleted {
    sequence_number: number;

    type?: 'response.mcp_list_tools.completed';
  }

  /**
   * Streaming event for incremental MCP call argument updates.
   */
  export interface OpenAIResponseObjectStreamResponseMcpCallArgumentsDelta {
    delta: string;

    item_id: string;

    output_index: number;

    sequence_number: number;

    type?: 'response.mcp_call.arguments.delta';
  }

  /**
   * Streaming event for completed MCP call arguments.
   */
  export interface OpenAIResponseObjectStreamResponseMcpCallArgumentsDone {
    arguments: string;

    item_id: string;

    output_index: number;

    sequence_number: number;

    type?: 'response.mcp_call.arguments.done';
  }

  /**
   * Streaming event for MCP calls in progress.
   */
  export interface OpenAIResponseObjectStreamResponseMcpCallInProgress {
    item_id: string;

    output_index: number;

    sequence_number: number;

    type?: 'response.mcp_call.in_progress';
  }

  /**
   * Streaming event for failed MCP calls.
   */
  export interface OpenAIResponseObjectStreamResponseMcpCallFailed {
    sequence_number: number;

    type?: 'response.mcp_call.failed';
  }

  /**
   * Streaming event for completed MCP calls.
   */
  export interface OpenAIResponseObjectStreamResponseMcpCallCompleted {
    sequence_number: number;

    type?: 'response.mcp_call.completed';
  }

  /**
   * Streaming event for when a new content part is added to a response item.
   */
  export interface OpenAIResponseObjectStreamResponseContentPartAdded {
    content_index: number;

    item_id: string;

    output_index: number;

    /**
     * Text content within a streamed response part.
     */
    part:
      | OpenAIResponseObjectStreamResponseContentPartAdded.OpenAIResponseContentPartOutputText
      | OpenAIResponseObjectStreamResponseContentPartAdded.OpenAIResponseContentPartRefusal
      | OpenAIResponseObjectStreamResponseContentPartAdded.OpenAIResponseContentPartReasoningText;

    response_id: string;

    sequence_number: number;

    type?: 'response.content_part.added';
  }

  export namespace OpenAIResponseObjectStreamResponseContentPartAdded {
    /**
     * Text content within a streamed response part.
     */
    export interface OpenAIResponseContentPartOutputText {
      text: string;

      annotations?: Array<
        | OpenAIResponseContentPartOutputText.OpenAIResponseAnnotationFileCitation
        | OpenAIResponseContentPartOutputText.OpenAIResponseAnnotationCitation
        | OpenAIResponseContentPartOutputText.OpenAIResponseAnnotationContainerFileCitation
        | OpenAIResponseContentPartOutputText.OpenAIResponseAnnotationFilePath
      >;

      logprobs?: Array<OpenAIResponseContentPartOutputText.Logprob> | null;

      type?: 'output_text';
    }

    export namespace OpenAIResponseContentPartOutputText {
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

    /**
     * Reasoning text emitted as part of a streamed response.
     */
    export interface OpenAIResponseContentPartReasoningText {
      text: string;

      type?: 'reasoning_text';
    }
  }

  /**
   * Streaming event for when a content part is completed.
   */
  export interface OpenAIResponseObjectStreamResponseContentPartDone {
    content_index: number;

    item_id: string;

    output_index: number;

    /**
     * Text content within a streamed response part.
     */
    part:
      | OpenAIResponseObjectStreamResponseContentPartDone.OpenAIResponseContentPartOutputText
      | OpenAIResponseObjectStreamResponseContentPartDone.OpenAIResponseContentPartRefusal
      | OpenAIResponseObjectStreamResponseContentPartDone.OpenAIResponseContentPartReasoningText;

    response_id: string;

    sequence_number: number;

    type?: 'response.content_part.done';
  }

  export namespace OpenAIResponseObjectStreamResponseContentPartDone {
    /**
     * Text content within a streamed response part.
     */
    export interface OpenAIResponseContentPartOutputText {
      text: string;

      annotations?: Array<
        | OpenAIResponseContentPartOutputText.OpenAIResponseAnnotationFileCitation
        | OpenAIResponseContentPartOutputText.OpenAIResponseAnnotationCitation
        | OpenAIResponseContentPartOutputText.OpenAIResponseAnnotationContainerFileCitation
        | OpenAIResponseContentPartOutputText.OpenAIResponseAnnotationFilePath
      >;

      logprobs?: Array<OpenAIResponseContentPartOutputText.Logprob> | null;

      type?: 'output_text';
    }

    export namespace OpenAIResponseContentPartOutputText {
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

    /**
     * Reasoning text emitted as part of a streamed response.
     */
    export interface OpenAIResponseContentPartReasoningText {
      text: string;

      type?: 'reasoning_text';
    }
  }

  /**
   * Streaming event for incremental reasoning text updates.
   */
  export interface OpenAIResponseObjectStreamResponseReasoningTextDelta {
    content_index: number;

    delta: string;

    item_id: string;

    output_index: number;

    sequence_number: number;

    type?: 'response.reasoning_text.delta';
  }

  /**
   * Streaming event for when reasoning text is completed.
   */
  export interface OpenAIResponseObjectStreamResponseReasoningTextDone {
    content_index: number;

    item_id: string;

    output_index: number;

    sequence_number: number;

    text: string;

    type?: 'response.reasoning_text.done';
  }

  /**
   * Streaming event for when a new reasoning summary part is added.
   */
  export interface OpenAIResponseObjectStreamResponseReasoningSummaryPartAdded {
    item_id: string;

    output_index: number;

    /**
     * Reasoning summary part in a streamed response.
     */
    part: OpenAIResponseObjectStreamResponseReasoningSummaryPartAdded.Part;

    sequence_number: number;

    summary_index: number;

    type?: 'response.reasoning_summary_part.added';
  }

  export namespace OpenAIResponseObjectStreamResponseReasoningSummaryPartAdded {
    /**
     * Reasoning summary part in a streamed response.
     */
    export interface Part {
      text: string;

      type?: 'summary_text';
    }
  }

  /**
   * Streaming event for when a reasoning summary part is completed.
   */
  export interface OpenAIResponseObjectStreamResponseReasoningSummaryPartDone {
    item_id: string;

    output_index: number;

    /**
     * Reasoning summary part in a streamed response.
     */
    part: OpenAIResponseObjectStreamResponseReasoningSummaryPartDone.Part;

    sequence_number: number;

    summary_index: number;

    type?: 'response.reasoning_summary_part.done';
  }

  export namespace OpenAIResponseObjectStreamResponseReasoningSummaryPartDone {
    /**
     * Reasoning summary part in a streamed response.
     */
    export interface Part {
      text: string;

      type?: 'summary_text';
    }
  }

  /**
   * Streaming event for incremental reasoning summary text updates.
   */
  export interface OpenAIResponseObjectStreamResponseReasoningSummaryTextDelta {
    delta: string;

    item_id: string;

    output_index: number;

    sequence_number: number;

    summary_index: number;

    type?: 'response.reasoning_summary_text.delta';
  }

  /**
   * Streaming event for when reasoning summary text is completed.
   */
  export interface OpenAIResponseObjectStreamResponseReasoningSummaryTextDone {
    item_id: string;

    output_index: number;

    sequence_number: number;

    summary_index: number;

    text: string;

    type?: 'response.reasoning_summary_text.done';
  }

  /**
   * Streaming event for incremental refusal text updates.
   */
  export interface OpenAIResponseObjectStreamResponseRefusalDelta {
    content_index: number;

    delta: string;

    item_id: string;

    output_index: number;

    sequence_number: number;

    type?: 'response.refusal.delta';
  }

  /**
   * Streaming event for when refusal text is completed.
   */
  export interface OpenAIResponseObjectStreamResponseRefusalDone {
    content_index: number;

    item_id: string;

    output_index: number;

    refusal: string;

    sequence_number: number;

    type?: 'response.refusal.done';
  }

  /**
   * Streaming event for when an annotation is added to output text.
   */
  export interface OpenAIResponseObjectStreamResponseOutputTextAnnotationAdded {
    /**
     * File citation annotation for referencing specific files in response content.
     */
    annotation:
      | OpenAIResponseObjectStreamResponseOutputTextAnnotationAdded.OpenAIResponseAnnotationFileCitation
      | OpenAIResponseObjectStreamResponseOutputTextAnnotationAdded.OpenAIResponseAnnotationCitation
      | OpenAIResponseObjectStreamResponseOutputTextAnnotationAdded.OpenAIResponseAnnotationContainerFileCitation
      | OpenAIResponseObjectStreamResponseOutputTextAnnotationAdded.OpenAIResponseAnnotationFilePath;

    annotation_index: number;

    content_index: number;

    item_id: string;

    output_index: number;

    sequence_number: number;

    type?: 'response.output_text.annotation.added';
  }

  export namespace OpenAIResponseObjectStreamResponseOutputTextAnnotationAdded {
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
  }

  /**
   * Streaming event for file search calls in progress.
   */
  export interface OpenAIResponseObjectStreamResponseFileSearchCallInProgress {
    item_id: string;

    output_index: number;

    sequence_number: number;

    type?: 'response.file_search_call.in_progress';
  }

  /**
   * Streaming event for file search currently searching.
   */
  export interface OpenAIResponseObjectStreamResponseFileSearchCallSearching {
    item_id: string;

    output_index: number;

    sequence_number: number;

    type?: 'response.file_search_call.searching';
  }

  /**
   * Streaming event for completed file search calls.
   */
  export interface OpenAIResponseObjectStreamResponseFileSearchCallCompleted {
    item_id: string;

    output_index: number;

    sequence_number: number;

    type?: 'response.file_search_call.completed';
  }

  /**
   * Streaming event emitted when a response ends in an incomplete state.
   */
  export interface OpenAIResponseObjectStreamResponseIncomplete {
    /**
     * Complete OpenAI response object containing generation results and metadata.
     */
    response: ResponsesAPI.ResponseObject;

    sequence_number: number;

    type?: 'response.incomplete';
  }

  /**
   * Streaming event emitted when a response fails.
   */
  export interface OpenAIResponseObjectStreamResponseFailed {
    /**
     * Complete OpenAI response object containing generation results and metadata.
     */
    response: ResponsesAPI.ResponseObject;

    sequence_number: number;

    type?: 'response.failed';
  }

  /**
   * Streaming event indicating a response has been completed.
   */
  export interface OpenAIResponseObjectStreamResponseCompleted {
    /**
     * Complete OpenAI response object containing generation results and metadata.
     */
    response: ResponsesAPI.ResponseObject;

    sequence_number: number;

    type?: 'response.completed';
  }

  /**
   * Standalone error event emitted during streaming when an error occurs.
   *
   * This is distinct from response.failed which is a response lifecycle event. The
   * error event signals transport/infrastructure-level errors to the client.
   */
  export interface OpenAIResponseObjectStreamError {
    message: string;

    sequence_number: number;

    code?: string | null;

    param?: string | null;

    type?: 'error';
  }
}

/**
 * Corresponds to the various Message types in the Responses API. They are all
 * under one type because the Responses API gives them all the same "type" value,
 * and there is no way to tell them apart in certain scenarios.
 */
export type ResponseOutput =
  | ResponseMessage
  | ResponseOutput.OpenAIResponseOutputMessageWebSearchToolCall
  | ResponseOutput.OpenAIResponseOutputMessageFileSearchToolCall
  | ResponseOutput.OpenAIResponseOutputMessageFunctionToolCall
  | ResponseOutput.OpenAIResponseOutputMessageMcpCall
  | ResponseOutput.OpenAIResponseOutputMessageMcpListTools
  | ResponseOutput.OpenAIResponseMcpApprovalRequest
  | ResponseOutput.OpenAIResponseOutputMessageReasoningItem;

export namespace ResponseOutput {
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
}

/**
 * OpenAI response object extended with input context information.
 */
export interface ResponseListResponse {
  id: string;

  created_at: number;

  input: Array<
    | ResponseListResponse.OpenAIResponseMessageOutput
    | ResponseListResponse.OpenAIResponseOutputMessageWebSearchToolCall
    | ResponseListResponse.OpenAIResponseOutputMessageFileSearchToolCall
    | ResponseListResponse.OpenAIResponseOutputMessageFunctionToolCall
    | ResponseListResponse.OpenAIResponseOutputMessageMcpCall
    | ResponseListResponse.OpenAIResponseOutputMessageMcpListTools
    | ResponseListResponse.OpenAIResponseMcpApprovalRequest
    | ResponseListResponse.OpenAIResponseOutputMessageReasoningItem
    | ResponseListResponse.OpenAIResponseInputFunctionToolCallOutput
    | ResponseListResponse.OpenAIResponseMcpApprovalResponse
    | ResponseListResponse.OpenAIResponseCompaction
  >;

  model: string;

  output: Array<
    | ResponseListResponse.OpenAIResponseMessageOutput
    | ResponseListResponse.OpenAIResponseOutputMessageWebSearchToolCall
    | ResponseListResponse.OpenAIResponseOutputMessageFileSearchToolCall
    | ResponseListResponse.OpenAIResponseOutputMessageFunctionToolCall
    | ResponseListResponse.OpenAIResponseOutputMessageMcpCall
    | ResponseListResponse.OpenAIResponseOutputMessageMcpListTools
    | ResponseListResponse.OpenAIResponseMcpApprovalRequest
    | ResponseListResponse.OpenAIResponseOutputMessageReasoningItem
  >;

  status: string;

  store: boolean;

  background?: boolean;

  completed_at?: number | null;

  /**
   * Error details for failed OpenAI response requests.
   */
  error?: ResponseListResponse.Error | null;

  frequency_penalty?: number;

  /**
   * Details explaining why a response was incomplete.
   */
  incomplete_details?: ResponseListResponse.IncompleteDetails | null;

  instructions?: string | null;

  max_output_tokens?: number | null;

  max_tool_calls?: number | null;

  metadata?: { [key: string]: string } | null;

  object?: 'response';

  parallel_tool_calls?: boolean;

  presence_penalty?: number;

  previous_response_id?: string | null;

  /**
   * OpenAI compatible Prompt object that is used in OpenAI responses.
   */
  prompt?: ResponseListResponse.Prompt | null;

  prompt_cache_key?: string | null;

  /**
   * Configuration for reasoning effort in OpenAI responses.
   *
   * Controls how much reasoning the model performs before generating a response.
   */
  reasoning?: ResponseListResponse.Reasoning | null;

  safety_identifier?: string | null;

  service_tier?: string;

  temperature?: number;

  /**
   * Text response configuration for OpenAI responses.
   */
  text?: ResponseListResponse.Text;

  /**
   * Enumeration of simple tool choice modes for response generation.
   */
  tool_choice?:
    | 'auto'
    | 'required'
    | 'none'
    | ResponseListResponse.OpenAIResponseInputToolChoiceAllowedTools
    | ResponseListResponse.OpenAIResponseInputToolChoiceFileSearch
    | ResponseListResponse.OpenAIResponseInputToolChoiceWebSearch
    | ResponseListResponse.OpenAIResponseInputToolChoiceFunctionTool
    | ResponseListResponse.OpenAIResponseInputToolChoiceMcpTool
    | ResponseListResponse.OpenAIResponseInputToolChoiceCustomTool
    | null;

  tools?: Array<
    | ResponseListResponse.OpenAIResponseInputToolWebSearch
    | ResponseListResponse.OpenAIResponseInputToolFileSearch
    | ResponseListResponse.OpenAIResponseInputToolFunction
    | ResponseListResponse.OpenAIResponseToolMcp
  >;

  top_logprobs?: number;

  top_p?: number;

  truncation?: string | null;

  /**
   * Usage information for OpenAI response.
   */
  usage?: ResponseListResponse.Usage | null;
}

export namespace ResponseListResponse {
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
   * Error details for failed OpenAI response requests.
   */
  export interface Error {
    code: string;

    message: string;
  }

  /**
   * Details explaining why a response was incomplete.
   */
  export interface IncompleteDetails {
    reason: string;
  }

  /**
   * OpenAI compatible Prompt object that is used in OpenAI responses.
   */
  export interface Prompt {
    id: string;

    variables?: {
      [key: string]:
        | Prompt.OpenAIResponseInputMessageContentText
        | Prompt.OpenAIResponseInputMessageContentImage
        | Prompt.OpenAIResponseInputMessageContentFile;
    } | null;

    version?: string | null;
  }

  export namespace Prompt {
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
   * Configuration for reasoning effort in OpenAI responses.
   *
   * Controls how much reasoning the model performs before generating a response.
   */
  export interface Reasoning {
    effort?: 'none' | 'minimal' | 'low' | 'medium' | 'high' | 'xhigh' | null;

    /**
     * Summary mode for reasoning output. One of 'auto', 'concise', or 'detailed'.
     */
    summary?: 'auto' | 'concise' | 'detailed' | null;
  }

  /**
   * Text response configuration for OpenAI responses.
   */
  export interface Text {
    /**
     * Configuration for Responses API text format.
     */
    format?: Text.Format | null;

    verbosity?: 'low' | 'medium' | 'high' | null;
  }

  export namespace Text {
    /**
     * Configuration for Responses API text format.
     */
    export interface Format {
      description?: string | null;

      name?: string | null;

      schema?: { [key: string]: unknown } | null;

      strict?: boolean | null;

      type?: 'text' | 'json_schema' | 'json_object';
    }
  }

  /**
   * Constrains the tools available to the model to a pre-defined set.
   */
  export interface OpenAIResponseInputToolChoiceAllowedTools {
    tools: Array<{ [key: string]: string }>;

    mode?: 'auto' | 'required';

    type?: 'allowed_tools';
  }

  /**
   * Indicates that the model should use file search to generate a response.
   */
  export interface OpenAIResponseInputToolChoiceFileSearch {
    type?: 'file_search';
  }

  /**
   * Indicates that the model should use web search to generate a response
   */
  export interface OpenAIResponseInputToolChoiceWebSearch {
    type?: 'web_search' | 'web_search_preview' | 'web_search_preview_2025_03_11' | 'web_search_2025_08_26';
  }

  /**
   * Forces the model to call a specific function.
   */
  export interface OpenAIResponseInputToolChoiceFunctionTool {
    name: string;

    type?: 'function';
  }

  /**
   * Forces the model to call a specific tool on a remote MCP server
   */
  export interface OpenAIResponseInputToolChoiceMcpTool {
    server_label: string;

    name?: string | null;

    type?: 'mcp';
  }

  /**
   * Forces the model to call a custom tool.
   */
  export interface OpenAIResponseInputToolChoiceCustomTool {
    name: string;

    type?: 'custom';
  }

  /**
   * Web search tool configuration for OpenAI response inputs.
   */
  export interface OpenAIResponseInputToolWebSearch {
    search_context_size?: string | null;

    type?: 'web_search' | 'web_search_preview' | 'web_search_preview_2025_03_11' | 'web_search_2025_08_26';
  }

  /**
   * File search tool configuration for OpenAI response inputs.
   */
  export interface OpenAIResponseInputToolFileSearch {
    vector_store_ids: Array<string>;

    filters?: { [key: string]: unknown } | null;

    max_num_results?: number | null;

    /**
     * Options for ranking and filtering search results.
     *
     * This class configures how search results are ranked and filtered. You can use
     * algorithm-based rerankers (weighted, RRF) or neural rerankers. Defaults from
     * VectorStoresConfig are used when parameters are not provided.
     *
     * Examples: # Weighted ranker with custom alpha
     * SearchRankingOptions(ranker="weighted", alpha=0.7)
     *
     *     # RRF ranker with custom impact factor
     *     SearchRankingOptions(ranker="rrf", impact_factor=50.0)
     *
     *     # Use config defaults (just specify ranker type)
     *     SearchRankingOptions(ranker="weighted")  # Uses alpha from VectorStoresConfig
     *
     *     # Score threshold filtering
     *     SearchRankingOptions(ranker="weighted", score_threshold=0.5)
     */
    ranking_options?: OpenAIResponseInputToolFileSearch.RankingOptions | null;

    type?: 'file_search';
  }

  export namespace OpenAIResponseInputToolFileSearch {
    /**
     * Options for ranking and filtering search results.
     *
     * This class configures how search results are ranked and filtered. You can use
     * algorithm-based rerankers (weighted, RRF) or neural rerankers. Defaults from
     * VectorStoresConfig are used when parameters are not provided.
     *
     * Examples: # Weighted ranker with custom alpha
     * SearchRankingOptions(ranker="weighted", alpha=0.7)
     *
     *     # RRF ranker with custom impact factor
     *     SearchRankingOptions(ranker="rrf", impact_factor=50.0)
     *
     *     # Use config defaults (just specify ranker type)
     *     SearchRankingOptions(ranker="weighted")  # Uses alpha from VectorStoresConfig
     *
     *     # Score threshold filtering
     *     SearchRankingOptions(ranker="weighted", score_threshold=0.5)
     */
    export interface RankingOptions {
      /**
       * Weight factor for weighted ranker
       */
      alpha?: number | null;

      /**
       * Impact factor for RRF algorithm
       */
      impact_factor?: number | null;

      /**
       * Model identifier for neural reranker
       */
      model?: string | null;

      ranker?: string | null;

      score_threshold?: number | null;

      /**
       * Weights for combining vector, keyword, and neural scores. Keys: 'vector',
       * 'keyword', 'neural'
       */
      weights?: { [key: string]: number } | null;
    }
  }

  /**
   * Function tool configuration for OpenAI response inputs.
   */
  export interface OpenAIResponseInputToolFunction {
    name: string;

    parameters: { [key: string]: unknown } | null;

    description?: string | null;

    strict?: boolean | null;

    type?: 'function';
  }

  /**
   * Model Context Protocol (MCP) tool configuration for OpenAI response object.
   */
  export interface OpenAIResponseToolMcp {
    server_label: string;

    /**
     * Filter configuration for restricting which MCP tools can be used.
     */
    allowed_tools?: Array<string> | OpenAIResponseToolMcp.AllowedToolsFilter | null;

    type?: 'mcp';
  }

  export namespace OpenAIResponseToolMcp {
    /**
     * Filter configuration for restricting which MCP tools can be used.
     */
    export interface AllowedToolsFilter {
      tool_names?: Array<string> | null;
    }
  }

  /**
   * Usage information for OpenAI response.
   */
  export interface Usage {
    input_tokens: number;

    /**
     * Token details for input tokens in OpenAI response usage.
     */
    input_tokens_details: Usage.InputTokensDetails;

    output_tokens: number;

    /**
     * Token details for output tokens in OpenAI response usage.
     */
    output_tokens_details: Usage.OutputTokensDetails;

    total_tokens: number;
  }

  export namespace Usage {
    /**
     * Token details for input tokens in OpenAI response usage.
     */
    export interface InputTokensDetails {
      cached_tokens: number;
    }

    /**
     * Token details for output tokens in OpenAI response usage.
     */
    export interface OutputTokensDetails {
      reasoning_tokens: number;
    }
  }
}

/**
 * Response object confirming deletion of an OpenAI response.
 */
export interface ResponseDeleteResponse {
  id: string;

  deleted?: boolean;

  object?: 'response';
}

export type ResponseCreateParams = ResponseCreateParamsNonStreaming | ResponseCreateParamsStreaming;

export interface ResponseCreateParamsBase {
  /**
   * Input message(s) to create the response.
   */
  input:
    | string
    | Array<
        | ResponseCreateParams.OpenAIResponseMessageInput
        | ResponseCreateParams.OpenAIResponseOutputMessageWebSearchToolCall
        | ResponseCreateParams.OpenAIResponseOutputMessageFileSearchToolCall
        | ResponseCreateParams.OpenAIResponseOutputMessageFunctionToolCall
        | ResponseCreateParams.OpenAIResponseOutputMessageMcpCall
        | ResponseCreateParams.OpenAIResponseOutputMessageMcpListTools
        | ResponseCreateParams.OpenAIResponseMcpApprovalRequest
        | ResponseCreateParams.OpenAIResponseOutputMessageReasoningItem
        | ResponseCreateParams.OpenAIResponseInputFunctionToolCallOutput
        | ResponseCreateParams.OpenAIResponseMcpApprovalResponse
        | ResponseCreateParams.OpenAIResponseCompaction
      >;

  /**
   * The underlying LLM used for completions.
   */
  model: string;

  /**
   * Whether to run the model response in the background. When true, returns
   * immediately with status 'queued'.
   */
  background?: boolean;

  /**
   * Context management configuration. When set with type 'compaction', automatically
   * compacts conversation history when token count exceeds the compact_threshold.
   */
  context_management?: Array<ResponseCreateParams.ContextManagement> | null;

  /**
   * Optional ID of a conversation to add the response to.
   */
  conversation?: string | null;

  /**
   * Penalizes new tokens based on their frequency in the text so far.
   */
  frequency_penalty?: number | null;

  /**
   * List of guardrails to apply during response generation.
   */
  guardrails?: Array<string | ResponseCreateParams.ResponseGuardrailSpec> | null;

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
  >;

  /**
   * Instructions to guide the model's behavior.
   */
  instructions?: string | null;

  /**
   * Maximum number of inference iterations.
   */
  max_infer_iters?: number | null;

  /**
   * Upper bound for the number of tokens that can be generated for a response.
   */
  max_output_tokens?: number | null;

  /**
   * Max number of total calls to built-in tools that can be processed in a response.
   */
  max_tool_calls?: number | null;

  /**
   * Dictionary of metadata key-value pairs to attach to the response.
   */
  metadata?: { [key: string]: string } | null;

  /**
   * Whether to enable parallel tool calls.
   */
  parallel_tool_calls?: boolean | null;

  /**
   * Penalizes new tokens based on whether they appear in the text so far.
   */
  presence_penalty?: number | null;

  /**
   * Optional ID of a previous response to continue from.
   */
  previous_response_id?: string | null;

  /**
   * OpenAI compatible Prompt object that is used in OpenAI responses.
   */
  prompt?: ResponseCreateParams.Prompt | null;

  /**
   * A key to use when reading from or writing to the prompt cache.
   */
  prompt_cache_key?: string | null;

  /**
   * Configuration for reasoning effort in OpenAI responses.
   *
   * Controls how much reasoning the model performs before generating a response.
   */
  reasoning?: ResponseCreateParams.Reasoning | null;

  /**
   * A stable identifier used for safety monitoring and abuse detection.
   */
  safety_identifier?: string | null;

  /**
   * The service tier for the request.
   */
  service_tier?: 'auto' | 'default' | 'flex' | 'priority' | null;

  /**
   * Whether to store the response in the database.
   */
  store?: boolean;

  /**
   * Whether to stream the response.
   */
  stream?: boolean;

  /**
   * Options that control streamed response behavior.
   */
  stream_options?: ResponseCreateParams.StreamOptions | null;

  /**
   * Sampling temperature.
   */
  temperature?: number | null;

  /**
   * Text response configuration for OpenAI responses.
   */
  text?: ResponseCreateParams.Text | null;

  /**
   * How the model should select which tool to call (if any).
   */
  tool_choice?:
    | 'auto'
    | 'required'
    | 'none'
    | ResponseCreateParams.OpenAIResponseInputToolChoiceAllowedTools
    | ResponseCreateParams.OpenAIResponseInputToolChoiceFileSearch
    | ResponseCreateParams.OpenAIResponseInputToolChoiceWebSearch
    | ResponseCreateParams.OpenAIResponseInputToolChoiceFunctionTool
    | ResponseCreateParams.OpenAIResponseInputToolChoiceMcpTool
    | ResponseCreateParams.OpenAIResponseInputToolChoiceCustomTool
    | null;

  /**
   * List of tools available to the model.
   */
  tools?: Array<
    | ResponseCreateParams.OpenAIResponseInputToolWebSearch
    | ResponseCreateParams.OpenAIResponseInputToolFileSearch
    | ResponseCreateParams.OpenAIResponseInputToolFunction
    | ResponseCreateParams.OpenAIResponseInputToolMcp
  > | null;

  /**
   * The number of most likely tokens to return at each position, along with their
   * log probabilities.
   */
  top_logprobs?: number | null;

  /**
   * Nucleus sampling parameter that controls response diversity (lower values
   * increase focus).
   */
  top_p?: number | null;

  /**
   * Controls how the service truncates input when it exceeds the model context
   * window.
   */
  truncation?: 'auto' | 'disabled' | null;

  [k: string]: unknown;
}

export namespace ResponseCreateParams {
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

  /**
   * Configuration for automatic context management during response generation.
   */
  export interface ContextManagement {
    /**
     * The context management entry type. Currently only 'compaction' is supported.
     */
    type: 'compaction';

    /**
     * Token threshold at which compaction should be triggered.
     */
    compact_threshold?: number | null;
  }

  /**
   * Specification for a guardrail to apply during response generation.
   */
  export interface ResponseGuardrailSpec {
    type: string;
  }

  /**
   * OpenAI compatible Prompt object that is used in OpenAI responses.
   */
  export interface Prompt {
    id: string;

    variables?: {
      [key: string]:
        | Prompt.OpenAIResponseInputMessageContentText
        | Prompt.OpenAIResponseInputMessageContentImage
        | Prompt.OpenAIResponseInputMessageContentFile;
    } | null;

    version?: string | null;
  }

  export namespace Prompt {
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
   * Configuration for reasoning effort in OpenAI responses.
   *
   * Controls how much reasoning the model performs before generating a response.
   */
  export interface Reasoning {
    effort?: 'none' | 'minimal' | 'low' | 'medium' | 'high' | 'xhigh' | null;

    /**
     * Summary mode for reasoning output. One of 'auto', 'concise', or 'detailed'.
     */
    summary?: 'auto' | 'concise' | 'detailed' | null;
  }

  /**
   * Options that control streamed response behavior.
   */
  export interface StreamOptions {
    /**
     * Whether to obfuscate sensitive information in streamed output.
     */
    include_obfuscation?: boolean;
  }

  /**
   * Text response configuration for OpenAI responses.
   */
  export interface Text {
    /**
     * Configuration for Responses API text format.
     */
    format?: Text.Format | null;

    verbosity?: 'low' | 'medium' | 'high' | null;
  }

  export namespace Text {
    /**
     * Configuration for Responses API text format.
     */
    export interface Format {
      description?: string | null;

      name?: string | null;

      schema?: { [key: string]: unknown } | null;

      strict?: boolean | null;

      type?: 'text' | 'json_schema' | 'json_object';
    }
  }

  /**
   * Constrains the tools available to the model to a pre-defined set.
   */
  export interface OpenAIResponseInputToolChoiceAllowedTools {
    tools: Array<{ [key: string]: string }>;

    mode?: 'auto' | 'required';

    type?: 'allowed_tools';
  }

  /**
   * Indicates that the model should use file search to generate a response.
   */
  export interface OpenAIResponseInputToolChoiceFileSearch {
    type?: 'file_search';
  }

  /**
   * Indicates that the model should use web search to generate a response
   */
  export interface OpenAIResponseInputToolChoiceWebSearch {
    type?: 'web_search' | 'web_search_preview' | 'web_search_preview_2025_03_11' | 'web_search_2025_08_26';
  }

  /**
   * Forces the model to call a specific function.
   */
  export interface OpenAIResponseInputToolChoiceFunctionTool {
    name: string;

    type?: 'function';
  }

  /**
   * Forces the model to call a specific tool on a remote MCP server
   */
  export interface OpenAIResponseInputToolChoiceMcpTool {
    server_label: string;

    name?: string | null;

    type?: 'mcp';
  }

  /**
   * Forces the model to call a custom tool.
   */
  export interface OpenAIResponseInputToolChoiceCustomTool {
    name: string;

    type?: 'custom';
  }

  /**
   * Web search tool configuration for OpenAI response inputs.
   */
  export interface OpenAIResponseInputToolWebSearch {
    search_context_size?: string | null;

    type?: 'web_search' | 'web_search_preview' | 'web_search_preview_2025_03_11' | 'web_search_2025_08_26';
  }

  /**
   * File search tool configuration for OpenAI response inputs.
   */
  export interface OpenAIResponseInputToolFileSearch {
    vector_store_ids: Array<string>;

    filters?: { [key: string]: unknown } | null;

    max_num_results?: number | null;

    /**
     * Options for ranking and filtering search results.
     *
     * This class configures how search results are ranked and filtered. You can use
     * algorithm-based rerankers (weighted, RRF) or neural rerankers. Defaults from
     * VectorStoresConfig are used when parameters are not provided.
     *
     * Examples: # Weighted ranker with custom alpha
     * SearchRankingOptions(ranker="weighted", alpha=0.7)
     *
     *     # RRF ranker with custom impact factor
     *     SearchRankingOptions(ranker="rrf", impact_factor=50.0)
     *
     *     # Use config defaults (just specify ranker type)
     *     SearchRankingOptions(ranker="weighted")  # Uses alpha from VectorStoresConfig
     *
     *     # Score threshold filtering
     *     SearchRankingOptions(ranker="weighted", score_threshold=0.5)
     */
    ranking_options?: OpenAIResponseInputToolFileSearch.RankingOptions | null;

    type?: 'file_search';
  }

  export namespace OpenAIResponseInputToolFileSearch {
    /**
     * Options for ranking and filtering search results.
     *
     * This class configures how search results are ranked and filtered. You can use
     * algorithm-based rerankers (weighted, RRF) or neural rerankers. Defaults from
     * VectorStoresConfig are used when parameters are not provided.
     *
     * Examples: # Weighted ranker with custom alpha
     * SearchRankingOptions(ranker="weighted", alpha=0.7)
     *
     *     # RRF ranker with custom impact factor
     *     SearchRankingOptions(ranker="rrf", impact_factor=50.0)
     *
     *     # Use config defaults (just specify ranker type)
     *     SearchRankingOptions(ranker="weighted")  # Uses alpha from VectorStoresConfig
     *
     *     # Score threshold filtering
     *     SearchRankingOptions(ranker="weighted", score_threshold=0.5)
     */
    export interface RankingOptions {
      /**
       * Weight factor for weighted ranker
       */
      alpha?: number | null;

      /**
       * Impact factor for RRF algorithm
       */
      impact_factor?: number | null;

      /**
       * Model identifier for neural reranker
       */
      model?: string | null;

      ranker?: string | null;

      score_threshold?: number | null;

      /**
       * Weights for combining vector, keyword, and neural scores. Keys: 'vector',
       * 'keyword', 'neural'
       */
      weights?: { [key: string]: number } | null;
    }
  }

  /**
   * Function tool configuration for OpenAI response inputs.
   */
  export interface OpenAIResponseInputToolFunction {
    name: string;

    parameters: { [key: string]: unknown } | null;

    description?: string | null;

    strict?: boolean | null;

    type?: 'function';
  }

  /**
   * Model Context Protocol (MCP) tool configuration for OpenAI response inputs.
   */
  export interface OpenAIResponseInputToolMcp {
    server_label: string;

    /**
     * Filter configuration for restricting which MCP tools can be used.
     */
    allowed_tools?: Array<string> | OpenAIResponseInputToolMcp.AllowedToolsFilter | null;

    authorization?: string | null;

    connector_id?: string | null;

    headers?: { [key: string]: unknown } | null;

    /**
     * Filter configuration for MCP tool approval requirements.
     */
    require_approval?: 'always' | 'never' | OpenAIResponseInputToolMcp.ApprovalFilter;

    server_url?: string | null;

    type?: 'mcp';
  }

  export namespace OpenAIResponseInputToolMcp {
    /**
     * Filter configuration for restricting which MCP tools can be used.
     */
    export interface AllowedToolsFilter {
      tool_names?: Array<string> | null;
    }

    /**
     * Filter configuration for MCP tool approval requirements.
     */
    export interface ApprovalFilter {
      always?: Array<string> | null;

      never?: Array<string> | null;
    }
  }

  export type ResponseCreateParamsNonStreaming = ResponsesAPI.ResponseCreateParamsNonStreaming;
  export type ResponseCreateParamsStreaming = ResponsesAPI.ResponseCreateParamsStreaming;
}

export interface ResponseCreateParamsNonStreaming extends ResponseCreateParamsBase {
  /**
   * Whether to stream the response.
   */
  stream?: false;

  [k: string]: unknown;
}

export interface ResponseCreateParamsStreaming extends ResponseCreateParamsBase {
  /**
   * Whether to stream the response.
   */
  stream: true;

  [k: string]: unknown;
}

export interface ResponseListParams extends OpenAICursorPageParams {
  /**
   * The model to filter responses by.
   */
  model?: string | null;

  /**
   * The order to sort responses by when sorted by created_at ('asc' or 'desc').
   */
  order?: 'asc' | 'desc' | null;
}

export interface ResponseCompactParams {
  /**
   * The model to use for generating the compacted summary.
   */
  model: string;

  /**
   * Input message(s) to compact.
   */
  input?:
    | string
    | Array<
        | ResponseCompactParams.OpenAIResponseMessageInput
        | ResponseCompactParams.OpenAIResponseOutputMessageWebSearchToolCall
        | ResponseCompactParams.OpenAIResponseOutputMessageFileSearchToolCall
        | ResponseCompactParams.OpenAIResponseOutputMessageFunctionToolCall
        | ResponseCompactParams.OpenAIResponseOutputMessageMcpCall
        | ResponseCompactParams.OpenAIResponseOutputMessageMcpListTools
        | ResponseCompactParams.OpenAIResponseMcpApprovalRequest
        | ResponseCompactParams.OpenAIResponseOutputMessageReasoningItem
        | ResponseCompactParams.OpenAIResponseInputFunctionToolCallOutput
        | ResponseCompactParams.OpenAIResponseMcpApprovalResponse
        | ResponseCompactParams.OpenAIResponseCompaction
      >
    | null;

  /**
   * Instructions to guide the compaction.
   */
  instructions?: string | null;

  /**
   * Whether to enable parallel tool calls. Accepted for compatibility but not used
   * during compaction.
   */
  parallel_tool_calls?: boolean | null;

  /**
   * ID of a previous response whose history to compact.
   */
  previous_response_id?: string | null;

  /**
   * A key to use when reading from or writing to the prompt cache.
   */
  prompt_cache_key?: string | null;

  /**
   * Configuration for reasoning effort in OpenAI responses.
   *
   * Controls how much reasoning the model performs before generating a response.
   */
  reasoning?: ResponseCompactParams.Reasoning | null;

  /**
   * Text response configuration for OpenAI responses.
   */
  text?: ResponseCompactParams.Text | null;

  /**
   * List of tools available to the model. Accepted for compatibility but not used
   * during compaction.
   */
  tools?: Array<
    | ResponseCompactParams.OpenAIResponseInputToolWebSearch
    | ResponseCompactParams.OpenAIResponseInputToolFileSearch
    | ResponseCompactParams.OpenAIResponseInputToolFunction
    | ResponseCompactParams.OpenAIResponseInputToolMcp
  > | null;

  [k: string]: unknown;
}

export namespace ResponseCompactParams {
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

  /**
   * Configuration for reasoning effort in OpenAI responses.
   *
   * Controls how much reasoning the model performs before generating a response.
   */
  export interface Reasoning {
    effort?: 'none' | 'minimal' | 'low' | 'medium' | 'high' | 'xhigh' | null;

    /**
     * Summary mode for reasoning output. One of 'auto', 'concise', or 'detailed'.
     */
    summary?: 'auto' | 'concise' | 'detailed' | null;
  }

  /**
   * Text response configuration for OpenAI responses.
   */
  export interface Text {
    /**
     * Configuration for Responses API text format.
     */
    format?: Text.Format | null;

    verbosity?: 'low' | 'medium' | 'high' | null;
  }

  export namespace Text {
    /**
     * Configuration for Responses API text format.
     */
    export interface Format {
      description?: string | null;

      name?: string | null;

      schema?: { [key: string]: unknown } | null;

      strict?: boolean | null;

      type?: 'text' | 'json_schema' | 'json_object';
    }
  }

  /**
   * Web search tool configuration for OpenAI response inputs.
   */
  export interface OpenAIResponseInputToolWebSearch {
    search_context_size?: string | null;

    type?: 'web_search' | 'web_search_preview' | 'web_search_preview_2025_03_11' | 'web_search_2025_08_26';
  }

  /**
   * File search tool configuration for OpenAI response inputs.
   */
  export interface OpenAIResponseInputToolFileSearch {
    vector_store_ids: Array<string>;

    filters?: { [key: string]: unknown } | null;

    max_num_results?: number | null;

    /**
     * Options for ranking and filtering search results.
     *
     * This class configures how search results are ranked and filtered. You can use
     * algorithm-based rerankers (weighted, RRF) or neural rerankers. Defaults from
     * VectorStoresConfig are used when parameters are not provided.
     *
     * Examples: # Weighted ranker with custom alpha
     * SearchRankingOptions(ranker="weighted", alpha=0.7)
     *
     *     # RRF ranker with custom impact factor
     *     SearchRankingOptions(ranker="rrf", impact_factor=50.0)
     *
     *     # Use config defaults (just specify ranker type)
     *     SearchRankingOptions(ranker="weighted")  # Uses alpha from VectorStoresConfig
     *
     *     # Score threshold filtering
     *     SearchRankingOptions(ranker="weighted", score_threshold=0.5)
     */
    ranking_options?: OpenAIResponseInputToolFileSearch.RankingOptions | null;

    type?: 'file_search';
  }

  export namespace OpenAIResponseInputToolFileSearch {
    /**
     * Options for ranking and filtering search results.
     *
     * This class configures how search results are ranked and filtered. You can use
     * algorithm-based rerankers (weighted, RRF) or neural rerankers. Defaults from
     * VectorStoresConfig are used when parameters are not provided.
     *
     * Examples: # Weighted ranker with custom alpha
     * SearchRankingOptions(ranker="weighted", alpha=0.7)
     *
     *     # RRF ranker with custom impact factor
     *     SearchRankingOptions(ranker="rrf", impact_factor=50.0)
     *
     *     # Use config defaults (just specify ranker type)
     *     SearchRankingOptions(ranker="weighted")  # Uses alpha from VectorStoresConfig
     *
     *     # Score threshold filtering
     *     SearchRankingOptions(ranker="weighted", score_threshold=0.5)
     */
    export interface RankingOptions {
      /**
       * Weight factor for weighted ranker
       */
      alpha?: number | null;

      /**
       * Impact factor for RRF algorithm
       */
      impact_factor?: number | null;

      /**
       * Model identifier for neural reranker
       */
      model?: string | null;

      ranker?: string | null;

      score_threshold?: number | null;

      /**
       * Weights for combining vector, keyword, and neural scores. Keys: 'vector',
       * 'keyword', 'neural'
       */
      weights?: { [key: string]: number } | null;
    }
  }

  /**
   * Function tool configuration for OpenAI response inputs.
   */
  export interface OpenAIResponseInputToolFunction {
    name: string;

    parameters: { [key: string]: unknown } | null;

    description?: string | null;

    strict?: boolean | null;

    type?: 'function';
  }

  /**
   * Model Context Protocol (MCP) tool configuration for OpenAI response inputs.
   */
  export interface OpenAIResponseInputToolMcp {
    server_label: string;

    /**
     * Filter configuration for restricting which MCP tools can be used.
     */
    allowed_tools?: Array<string> | OpenAIResponseInputToolMcp.AllowedToolsFilter | null;

    authorization?: string | null;

    connector_id?: string | null;

    headers?: { [key: string]: unknown } | null;

    /**
     * Filter configuration for MCP tool approval requirements.
     */
    require_approval?: 'always' | 'never' | OpenAIResponseInputToolMcp.ApprovalFilter;

    server_url?: string | null;

    type?: 'mcp';
  }

  export namespace OpenAIResponseInputToolMcp {
    /**
     * Filter configuration for restricting which MCP tools can be used.
     */
    export interface AllowedToolsFilter {
      tool_names?: Array<string> | null;
    }

    /**
     * Filter configuration for MCP tool approval requirements.
     */
    export interface ApprovalFilter {
      always?: Array<string> | null;

      never?: Array<string> | null;
    }
  }
}

Responses.ResponseListResponsesOpenAICursorPage = ResponseListResponsesOpenAICursorPage;
Responses.InputItems = InputItems;

export declare namespace Responses {
  export {
    type CompactedResponse as CompactedResponse,
    type ResponseInput as ResponseInput,
    type ResponseMessage as ResponseMessage,
    type ResponseObject as ResponseObject,
    type ResponseObjectStream as ResponseObjectStream,
    type ResponseOutput as ResponseOutput,
    type ResponseListResponse as ResponseListResponse,
    type ResponseDeleteResponse as ResponseDeleteResponse,
    ResponseListResponsesOpenAICursorPage as ResponseListResponsesOpenAICursorPage,
    type ResponseCreateParams as ResponseCreateParams,
    type ResponseCreateParamsNonStreaming as ResponseCreateParamsNonStreaming,
    type ResponseCreateParamsStreaming as ResponseCreateParamsStreaming,
    type ResponseListParams as ResponseListParams,
    type ResponseCompactParams as ResponseCompactParams,
  };

  export {
    InputItems as InputItems,
    type InputItemListResponse as InputItemListResponse,
    type InputItemListParams as InputItemListParams,
  };
}
