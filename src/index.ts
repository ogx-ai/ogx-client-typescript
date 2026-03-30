// Copyright (c) Meta Platforms, Inc. and affiliates.
// All rights reserved.
//
// This source code is licensed under the terms described in the LICENSE file in
// the root directory of this source tree.

//
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { type Agent } from './_shims/index';
import { stringifyQuery } from './internal/utils/query';
import * as Core from './core';
import * as Errors from './error';
import * as Pagination from './pagination';
import {
  type DatasetsIterrowsParams,
  DatasetsIterrowsResponse,
  type OpenAICursorPageParams,
  OpenAICursorPageResponse,
} from './pagination';
import * as Uploads from './uploads';
import * as API from './resources/index';
import {
  BatchCancelResponse,
  BatchCreateParams,
  BatchCreateResponse,
  BatchListParams,
  BatchListResponse,
  BatchListResponsesOpenAICursorPage,
  BatchRetrieveResponse,
  Batches,
} from './resources/batches';
import {
  CompletionCreateParams,
  CompletionCreateParamsNonStreaming,
  CompletionCreateParamsStreaming,
  CompletionCreateResponse,
  Completions,
} from './resources/completions';
import { CreateEmbeddingsResponse, EmbeddingCreateParams, Embeddings } from './resources/embeddings';
import {
  DeleteFileResponse,
  File,
  FileContentResponse,
  FileCreateParams,
  FileListParams,
  Files,
  FilesOpenAICursorPage,
  ListFilesResponse,
} from './resources/files';
import { Inspect } from './resources/inspect';
import { CreateResponse, ModerationCreateParams, Moderations } from './resources/moderations';
import { ProviderListResponse, Providers } from './resources/providers';
import { RouteListParams, RouteListResponse, Routes } from './resources/routes';
import { RunShieldResponse, Safety, SafetyRunShieldParams } from './resources/safety';
import {
  Scoring,
  ScoringScoreBatchParams,
  ScoringScoreBatchResponse,
  ScoringScoreParams,
  ScoringScoreResponse,
} from './resources/scoring';
import {
  ListScoringFunctionsResponse,
  ScoringFn,
  ScoringFnParams,
  ScoringFunctionListResponse,
  ScoringFunctionRegisterParams,
  ScoringFunctions,
} from './resources/scoring-functions';
import {
  ListShieldsResponse,
  Shield,
  ShieldListResponse,
  ShieldRegisterParams,
  Shields,
} from './resources/shields';
import {
  QueryChunksResponse,
  VectorIo,
  VectorIoInsertParams,
  VectorIoQueryParams,
} from './resources/vector-io';
import { Alpha } from './resources/alpha/alpha';
import { Beta } from './resources/beta/beta';
import { Chat, ChatCompletionChunk } from './resources/chat/chat';
import {
  ConversationCreateParams,
  ConversationDeleteResponse,
  ConversationObject,
  ConversationUpdateParams,
  Conversations,
} from './resources/conversations/conversations';
import {
  ListModelsResponse,
  Model,
  ModelListResponse,
  ModelRetrieveResponse,
  Models,
} from './resources/models/models';
import {
  ListPromptsResponse,
  Prompt,
  PromptCreateParams,
  PromptListResponse,
  PromptRetrieveParams,
  PromptSetDefaultVersionParams,
  PromptUpdateParams,
  Prompts,
} from './resources/prompts/prompts';
import {
  ResponseCreateParams,
  ResponseCreateParamsNonStreaming,
  ResponseCreateParamsStreaming,
  ResponseDeleteResponse,
  ResponseListParams,
  ResponseListResponse,
  ResponseListResponsesOpenAICursorPage,
  ResponseObject,
  ResponseObjectStream,
  Responses,
} from './resources/responses/responses';
import {
  ListVectorStoresResponse,
  VectorStore,
  VectorStoreCreateParams,
  VectorStoreDeleteResponse,
  VectorStoreListParams,
  VectorStoreSearchParams,
  VectorStoreSearchResponse,
  VectorStoreUpdateParams,
  VectorStores,
  VectorStoresOpenAICursorPage,
} from './resources/vector-stores/vector-stores';

export interface ClientOptions {
  /**
   * Defaults to process.env['LLAMA_STACK_CLIENT_API_KEY'].
   */
  apiKey?: string | null | undefined;

  /**
   * Override the default base URL for the API, e.g., "https://api.example.com/v2/"
   *
   * Defaults to process.env['LLAMA_STACK_CLIENT_BASE_URL'].
   */
  baseURL?: string | null | undefined;

  /**
   * The maximum amount of time (in milliseconds) that the client should wait for a response
   * from the server before timing out a single request.
   *
   * Note that request timeouts are retried by default, so in a worst-case scenario you may wait
   * much longer than this timeout before the promise succeeds or fails.
   *
   * @unit milliseconds
   */
  timeout?: number | undefined;

  /**
   * An HTTP agent used to manage HTTP(S) connections.
   *
   * If not provided, an agent will be constructed by default in the Node.js environment,
   * otherwise no agent is used.
   */
  httpAgent?: Agent | undefined;

  /**
   * Specify a custom `fetch` function implementation.
   *
   * If not provided, we use `node-fetch` on Node.js and otherwise expect that `fetch` is
   * defined globally.
   */
  fetch?: Core.Fetch | undefined;

  /**
   * The maximum number of times that the client will retry a request in case of a
   * temporary failure, like a network error or a 5XX error from the server.
   *
   * @default 2
   */
  maxRetries?: number | undefined;

  /**
   * Default headers to include with every request to the API.
   *
   * These can be removed in individual requests by explicitly setting the
   * header to `undefined` or `null` in request options.
   */
  defaultHeaders?: Core.Headers | undefined;

  /**
   * Default query parameters to include with every request to the API.
   *
   * These can be removed in individual requests by explicitly setting the
   * param to `undefined` in request options.
   */
  defaultQuery?: Core.DefaultQuery | undefined;
}

/**
 * API Client for interfacing with the Llama Stack Client API.
 */
export class LlamaStackClient extends Core.APIClient {
  apiKey: string | null;

  private _options: ClientOptions;

  /**
   * API Client for interfacing with the Llama Stack Client API.
   *
   * @param {string | null | undefined} [opts.apiKey=process.env['LLAMA_STACK_CLIENT_API_KEY'] ?? null]
   * @param {string} [opts.baseURL=process.env['LLAMA_STACK_CLIENT_BASE_URL'] ?? http://any-hosted-llama-stack.com] - Override the default base URL for the API.
   * @param {number} [opts.timeout=1 minute] - The maximum amount of time (in milliseconds) the client will wait for a response before timing out.
   * @param {number} [opts.httpAgent] - An HTTP agent used to manage HTTP(s) connections.
   * @param {Core.Fetch} [opts.fetch] - Specify a custom `fetch` function implementation.
   * @param {number} [opts.maxRetries=2] - The maximum number of times the client will retry a request.
   * @param {Core.Headers} opts.defaultHeaders - Default headers to include with every request to the API.
   * @param {Core.DefaultQuery} opts.defaultQuery - Default query parameters to include with every request to the API.
   */
  constructor({
    baseURL = Core.readEnv('LLAMA_STACK_CLIENT_BASE_URL'),
    apiKey = Core.readEnv('LLAMA_STACK_CLIENT_API_KEY') ?? null,
    ...opts
  }: ClientOptions = {}) {
    const options: ClientOptions = {
      apiKey,
      ...opts,
      baseURL: baseURL || `http://any-hosted-llama-stack.com`,
    };

    super({
      baseURL: options.baseURL!,
      baseURLOverridden: baseURL ? baseURL !== 'http://any-hosted-llama-stack.com' : false,
      timeout: options.timeout ?? 60000 /* 1 minute */,
      httpAgent: options.httpAgent,
      maxRetries: options.maxRetries,
      fetch: options.fetch,
    });

    this._options = options;

    this.apiKey = apiKey;
  }

  responses: API.Responses = new API.Responses(this);
  /**
   * Protocol for prompt management operations.
   */
  prompts: API.Prompts = new API.Prompts(this);
  /**
   * Protocol for conversation management operations.
   */
  conversations: API.Conversations = new API.Conversations(this);
  /**
   * APIs for inspecting the Llama Stack service, including health status, available API routes with methods and implementing providers.
   */
  inspect: API.Inspect = new API.Inspect(this);
  /**
   * Llama Stack Inference API for generating completions, chat completions, and embeddings.
   *
   * This API provides the raw interface to the underlying models. Three kinds of models are supported:
   * - LLM models: these models generate "raw" and "chat" (conversational) completions.
   * - Embedding models: these models generate embeddings to be used for semantic search.
   * - Rerank models: these models reorder the documents based on their relevance to a query.
   */
  embeddings: API.Embeddings = new API.Embeddings(this);
  chat: API.Chat = new API.Chat(this);
  /**
   * Llama Stack Inference API for generating completions, chat completions, and embeddings.
   *
   * This API provides the raw interface to the underlying models. Three kinds of models are supported:
   * - LLM models: these models generate "raw" and "chat" (conversational) completions.
   * - Embedding models: these models generate embeddings to be used for semantic search.
   * - Rerank models: these models reorder the documents based on their relevance to a query.
   */
  completions: API.Completions = new API.Completions(this);
  vectorIo: API.VectorIo = new API.VectorIo(this);
  vectorStores: API.VectorStores = new API.VectorStores(this);
  models: API.Models = new API.Models(this);
  /**
   * Providers API for inspecting, listing, and modifying providers and their configurations.
   */
  providers: API.Providers = new API.Providers(this);
  /**
   * APIs for inspecting the Llama Stack service, including health status, available API routes with methods and implementing providers.
   */
  routes: API.Routes = new API.Routes(this);
  /**
   * OpenAI-compatible Moderations API.
   */
  moderations: API.Moderations = new API.Moderations(this);
  /**
   * OpenAI-compatible Moderations API.
   */
  safety: API.Safety = new API.Safety(this);
  shields: API.Shields = new API.Shields(this);
  scoring: API.Scoring = new API.Scoring(this);
  scoringFunctions: API.ScoringFunctions = new API.ScoringFunctions(this);
  /**
   * This API is used to upload documents that can be used with other Llama Stack APIs.
   */
  files: API.Files = new API.Files(this);
  /**
   * The API is designed to allow use of openai client libraries for seamless integration.
   *
   * This API provides the following extensions:
   *  - idempotent batch creation
   *
   * Note: This API is currently under active development and may undergo changes.
   */
  batches: API.Batches = new API.Batches(this);
  alpha: API.Alpha = new API.Alpha(this);
  beta: API.Beta = new API.Beta(this);

  /**
   * Check whether the base URL is set to its default.
   */
  #baseURLOverridden(): boolean {
    return this.baseURL !== 'http://any-hosted-llama-stack.com';
  }

  protected override defaultQuery(): Core.DefaultQuery | undefined {
    return this._options.defaultQuery;
  }

  protected override defaultHeaders(opts: Core.FinalRequestOptions): Core.Headers {
    return {
      ...super.defaultHeaders(opts),
      ...this._options.defaultHeaders,
    };
  }

  protected override authHeaders(opts: Core.FinalRequestOptions): Core.Headers {
    if (this.apiKey == null) {
      return {};
    }
    return { Authorization: `Bearer ${this.apiKey}` };
  }

  protected override stringifyQuery(query: object | Record<string, unknown>): string {
    return stringifyQuery(query);
  }

  static LlamaStackClient = this;
  static DEFAULT_TIMEOUT = 60000; // 1 minute

  static LlamaStackClientError = Errors.LlamaStackClientError;
  static APIError = Errors.APIError;
  static APIConnectionError = Errors.APIConnectionError;
  static APIConnectionTimeoutError = Errors.APIConnectionTimeoutError;
  static APIUserAbortError = Errors.APIUserAbortError;
  static NotFoundError = Errors.NotFoundError;
  static ConflictError = Errors.ConflictError;
  static RateLimitError = Errors.RateLimitError;
  static BadRequestError = Errors.BadRequestError;
  static AuthenticationError = Errors.AuthenticationError;
  static InternalServerError = Errors.InternalServerError;
  static PermissionDeniedError = Errors.PermissionDeniedError;
  static UnprocessableEntityError = Errors.UnprocessableEntityError;

  static toFile = Uploads.toFile;
  static fileFromPath = Uploads.fileFromPath;
}

LlamaStackClient.Responses = Responses;
LlamaStackClient.ResponseListResponsesOpenAICursorPage = ResponseListResponsesOpenAICursorPage;
LlamaStackClient.Prompts = Prompts;
LlamaStackClient.Conversations = Conversations;
LlamaStackClient.Inspect = Inspect;
LlamaStackClient.Embeddings = Embeddings;
LlamaStackClient.Chat = Chat;
LlamaStackClient.Completions = Completions;
LlamaStackClient.VectorIo = VectorIo;
LlamaStackClient.VectorStores = VectorStores;
LlamaStackClient.VectorStoresOpenAICursorPage = VectorStoresOpenAICursorPage;
LlamaStackClient.Models = Models;
LlamaStackClient.Providers = Providers;
LlamaStackClient.Routes = Routes;
LlamaStackClient.Moderations = Moderations;
LlamaStackClient.Safety = Safety;
LlamaStackClient.Shields = Shields;
LlamaStackClient.Scoring = Scoring;
LlamaStackClient.ScoringFunctions = ScoringFunctions;
LlamaStackClient.Files = Files;
LlamaStackClient.FilesOpenAICursorPage = FilesOpenAICursorPage;
LlamaStackClient.Batches = Batches;
LlamaStackClient.BatchListResponsesOpenAICursorPage = BatchListResponsesOpenAICursorPage;
LlamaStackClient.Alpha = Alpha;
LlamaStackClient.Beta = Beta;

export declare namespace LlamaStackClient {
  export type RequestOptions = Core.RequestOptions;

  export import DatasetsIterrows = Pagination.DatasetsIterrows;
  export {
    type DatasetsIterrowsParams as DatasetsIterrowsParams,
    type DatasetsIterrowsResponse as DatasetsIterrowsResponse,
  };

  export import OpenAICursorPage = Pagination.OpenAICursorPage;
  export {
    type OpenAICursorPageParams as OpenAICursorPageParams,
    type OpenAICursorPageResponse as OpenAICursorPageResponse,
  };

  export {
    Responses as Responses,
    type ResponseObject as ResponseObject,
    type ResponseObjectStream as ResponseObjectStream,
    type ResponseListResponse as ResponseListResponse,
    type ResponseDeleteResponse as ResponseDeleteResponse,
    ResponseListResponsesOpenAICursorPage as ResponseListResponsesOpenAICursorPage,
    type ResponseCreateParams as ResponseCreateParams,
    type ResponseCreateParamsNonStreaming as ResponseCreateParamsNonStreaming,
    type ResponseCreateParamsStreaming as ResponseCreateParamsStreaming,
    type ResponseListParams as ResponseListParams,
  };

  export {
    Prompts as Prompts,
    type ListPromptsResponse as ListPromptsResponse,
    type Prompt as Prompt,
    type PromptListResponse as PromptListResponse,
    type PromptCreateParams as PromptCreateParams,
    type PromptRetrieveParams as PromptRetrieveParams,
    type PromptUpdateParams as PromptUpdateParams,
    type PromptSetDefaultVersionParams as PromptSetDefaultVersionParams,
  };

  export {
    Conversations as Conversations,
    type ConversationObject as ConversationObject,
    type ConversationDeleteResponse as ConversationDeleteResponse,
    type ConversationCreateParams as ConversationCreateParams,
    type ConversationUpdateParams as ConversationUpdateParams,
  };

  export { Inspect as Inspect };

  export {
    Embeddings as Embeddings,
    type CreateEmbeddingsResponse as CreateEmbeddingsResponse,
    type EmbeddingCreateParams as EmbeddingCreateParams,
  };

  export { Chat as Chat, type ChatCompletionChunk as ChatCompletionChunk };

  export {
    Completions as Completions,
    type CompletionCreateResponse as CompletionCreateResponse,
    type CompletionCreateParams as CompletionCreateParams,
    type CompletionCreateParamsNonStreaming as CompletionCreateParamsNonStreaming,
    type CompletionCreateParamsStreaming as CompletionCreateParamsStreaming,
  };

  export {
    VectorIo as VectorIo,
    type QueryChunksResponse as QueryChunksResponse,
    type VectorIoInsertParams as VectorIoInsertParams,
    type VectorIoQueryParams as VectorIoQueryParams,
  };

  export {
    VectorStores as VectorStores,
    type ListVectorStoresResponse as ListVectorStoresResponse,
    type VectorStore as VectorStore,
    type VectorStoreDeleteResponse as VectorStoreDeleteResponse,
    type VectorStoreSearchResponse as VectorStoreSearchResponse,
    VectorStoresOpenAICursorPage as VectorStoresOpenAICursorPage,
    type VectorStoreCreateParams as VectorStoreCreateParams,
    type VectorStoreUpdateParams as VectorStoreUpdateParams,
    type VectorStoreListParams as VectorStoreListParams,
    type VectorStoreSearchParams as VectorStoreSearchParams,
  };

  export {
    Models as Models,
    type ListModelsResponse as ListModelsResponse,
    type Model as Model,
    type ModelRetrieveResponse as ModelRetrieveResponse,
    type ModelListResponse as ModelListResponse,
  };

  export { Providers as Providers, type ProviderListResponse as ProviderListResponse };

  export {
    Routes as Routes,
    type RouteListResponse as RouteListResponse,
    type RouteListParams as RouteListParams,
  };

  export {
    Moderations as Moderations,
    type CreateResponse as CreateResponse,
    type ModerationCreateParams as ModerationCreateParams,
  };

  export {
    Safety as Safety,
    type RunShieldResponse as RunShieldResponse,
    type SafetyRunShieldParams as SafetyRunShieldParams,
  };

  export {
    Shields as Shields,
    type ListShieldsResponse as ListShieldsResponse,
    type Shield as Shield,
    type ShieldListResponse as ShieldListResponse,
    type ShieldRegisterParams as ShieldRegisterParams,
  };

  export {
    Scoring as Scoring,
    type ScoringScoreResponse as ScoringScoreResponse,
    type ScoringScoreBatchResponse as ScoringScoreBatchResponse,
    type ScoringScoreParams as ScoringScoreParams,
    type ScoringScoreBatchParams as ScoringScoreBatchParams,
  };

  export {
    ScoringFunctions as ScoringFunctions,
    type ListScoringFunctionsResponse as ListScoringFunctionsResponse,
    type ScoringFn as ScoringFn,
    type ScoringFnParams as ScoringFnParams,
    type ScoringFunctionListResponse as ScoringFunctionListResponse,
    type ScoringFunctionRegisterParams as ScoringFunctionRegisterParams,
  };

  export {
    Files as Files,
    type DeleteFileResponse as DeleteFileResponse,
    type File as File,
    type ListFilesResponse as ListFilesResponse,
    type FileContentResponse as FileContentResponse,
    FilesOpenAICursorPage as FilesOpenAICursorPage,
    type FileCreateParams as FileCreateParams,
    type FileListParams as FileListParams,
  };

  export {
    Batches as Batches,
    type BatchCreateResponse as BatchCreateResponse,
    type BatchRetrieveResponse as BatchRetrieveResponse,
    type BatchListResponse as BatchListResponse,
    type BatchCancelResponse as BatchCancelResponse,
    BatchListResponsesOpenAICursorPage as BatchListResponsesOpenAICursorPage,
    type BatchCreateParams as BatchCreateParams,
    type BatchListParams as BatchListParams,
  };

  export { Alpha as Alpha };

  export { Beta as Beta };

  export type HealthInfo = API.HealthInfo;
  export type InterleavedContent = API.InterleavedContent;
  export type InterleavedContentItem = API.InterleavedContentItem;
  export type ListProvidersResponse = API.ListProvidersResponse;
  export type ListRoutesResponse = API.ListRoutesResponse;
  export type ParamType = API.ParamType;
  export type ProviderInfo = API.ProviderInfo;
  export type RouteInfo = API.RouteInfo;
  export type SafetyViolation = API.SafetyViolation;
  export type SamplingParams = API.SamplingParams;
  export type ScoringResult = API.ScoringResult;
  export type SystemMessage = API.SystemMessage;
  export type VersionInfo = API.VersionInfo;
}

export { getResponseOutputText } from './lib/response-helpers';
export { toFile, fileFromPath } from './uploads';
export {
  LlamaStackClientError,
  APIError,
  APIConnectionError,
  APIConnectionTimeoutError,
  APIUserAbortError,
  NotFoundError,
  ConflictError,
  RateLimitError,
  BadRequestError,
  AuthenticationError,
  InternalServerError,
  PermissionDeniedError,
  UnprocessableEntityError,
} from './error';

export default LlamaStackClient;
