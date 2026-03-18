// Copyright (c) Meta Platforms, Inc. and affiliates.
// All rights reserved.
//
// This source code is licensed under the terms described in the LICENSE file in
// the root directory of this source tree.
//
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import { isRequestOptions } from '../../core';
import * as Core from '../../core';
import { OpenAICursorPage, type OpenAICursorPageParams } from '../../pagination';

export class Files extends APIResource {
  /**
   * Attach a file to a vector store (OpenAI-compatible).
   */
  create(
    vectorStoreId: string,
    body: FileCreateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<VectorStoreFile> {
    return this._client.post(`/v1/vector_stores/${vectorStoreId}/files`, { body, ...options });
  }

  /**
   * Retrieve a vector store file (OpenAI-compatible).
   */
  retrieve(
    vectorStoreId: string,
    fileId: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<VectorStoreFile> {
    return this._client.get(`/v1/vector_stores/${vectorStoreId}/files/${fileId}`, options);
  }

  /**
   * Update a vector store file (OpenAI-compatible).
   */
  update(
    vectorStoreId: string,
    fileId: string,
    body: FileUpdateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<VectorStoreFile> {
    return this._client.post(`/v1/vector_stores/${vectorStoreId}/files/${fileId}`, { body, ...options });
  }

  /**
   * List files in a vector store (OpenAI-compatible).
   */
  list(
    vectorStoreId: string,
    query?: FileListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<VectorStoreFilesOpenAICursorPage, VectorStoreFile>;
  list(
    vectorStoreId: string,
    options?: Core.RequestOptions,
  ): Core.PagePromise<VectorStoreFilesOpenAICursorPage, VectorStoreFile>;
  list(
    vectorStoreId: string,
    query: FileListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<VectorStoreFilesOpenAICursorPage, VectorStoreFile> {
    if (isRequestOptions(query)) {
      return this.list(vectorStoreId, {}, query);
    }
    return this._client.getAPIList(
      `/v1/vector_stores/${vectorStoreId}/files`,
      VectorStoreFilesOpenAICursorPage,
      { query, ...options },
    );
  }

  /**
   * Delete a vector store file (OpenAI-compatible).
   */
  delete(
    vectorStoreId: string,
    fileId: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<FileDeleteResponse> {
    return this._client.delete(`/v1/vector_stores/${vectorStoreId}/files/${fileId}`, options);
  }

  /**
   * Retrieve vector store file contents (OpenAI-compatible).
   */
  content(
    vectorStoreId: string,
    fileId: string,
    query?: FileContentParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<FileContentResponse>;
  content(
    vectorStoreId: string,
    fileId: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<FileContentResponse>;
  content(
    vectorStoreId: string,
    fileId: string,
    query: FileContentParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<FileContentResponse> {
    if (isRequestOptions(query)) {
      return this.content(vectorStoreId, fileId, {}, query);
    }
    return this._client.get(`/v1/vector_stores/${vectorStoreId}/files/${fileId}/content`, {
      query,
      ...options,
    });
  }
}

export class VectorStoreFilesOpenAICursorPage extends OpenAICursorPage<VectorStoreFile> {}

/**
 * OpenAI Vector Store File object.
 */
export interface VectorStoreFile {
  id: string;

  /**
   * Automatic chunking strategy for vector store files.
   */
  chunking_strategy:
    | VectorStoreFile.VectorStoreChunkingStrategyAuto
    | VectorStoreFile.VectorStoreChunkingStrategyStatic
    | VectorStoreFile.VectorStoreChunkingStrategyContextual;

  created_at: number;

  status: 'completed' | 'in_progress' | 'cancelled' | 'failed';

  vector_store_id: string;

  /**
   * Set of 16 key-value pairs that can be attached to an object. This can be useful
   * for storing additional information about the object in a structured format, and
   * querying for objects via API or the dashboard. Keys are strings with a maximum
   * length of 64 characters. Values are strings with a maximum length of 512
   * characters, booleans, or numbers.
   */
  attributes?: { [key: string]: string | number | boolean };

  /**
   * Error information for failed vector store file processing.
   */
  last_error?: VectorStoreFile.LastError | null;

  object?: string;

  usage_bytes?: number;
}

export namespace VectorStoreFile {
  /**
   * Automatic chunking strategy for vector store files.
   */
  export interface VectorStoreChunkingStrategyAuto {
    type?: 'auto';
  }

  /**
   * Static chunking strategy with configurable parameters.
   */
  export interface VectorStoreChunkingStrategyStatic {
    /**
     * Configuration for static chunking strategy.
     */
    static: VectorStoreChunkingStrategyStatic.Static;

    type?: 'static';
  }

  export namespace VectorStoreChunkingStrategyStatic {
    /**
     * Configuration for static chunking strategy.
     */
    export interface Static {
      chunk_overlap_tokens?: number;

      max_chunk_size_tokens?: number;
    }
  }

  /**
   * Contextual chunking strategy that uses an LLM to situate chunks within the
   * document.
   */
  export interface VectorStoreChunkingStrategyContextual {
    /**
     * Configuration for contextual chunking.
     */
    contextual: VectorStoreChunkingStrategyContextual.Contextual;

    /**
     * Strategy type identifier.
     */
    type?: 'contextual';
  }

  export namespace VectorStoreChunkingStrategyContextual {
    /**
     * Configuration for contextual chunking.
     */
    export interface Contextual {
      /**
       * Tokens to overlap between adjacent chunks. Must be less than
       * max_chunk_size_tokens.
       */
      chunk_overlap_tokens?: number;

      /**
       * Prompt template for contextual retrieval. Uses WHOLE_DOCUMENT and CHUNK_CONTENT
       * placeholders wrapped in double curly braces.
       */
      context_prompt?: string;

      /**
       * Maximum tokens per chunk. Suggested ~700 to allow room for prepended context.
       */
      max_chunk_size_tokens?: number;

      /**
       * Maximum concurrent LLM calls. Falls back to config default if not provided.
       */
      max_concurrency?: number | null;

      /**
       * LLM model for generating context. Falls back to
       * VectorStoresConfig.contextual_retrieval_params.model if not provided.
       */
      model_id?: string | null;

      /**
       * Timeout per LLM call in seconds. Falls back to config default if not provided.
       */
      timeout_seconds?: number | null;
    }
  }

  /**
   * Error information for failed vector store file processing.
   */
  export interface LastError {
    code: 'server_error' | 'rate_limit_exceeded';

    message: string;
  }
}

/**
 * Response from deleting a vector store file.
 */
export interface FileDeleteResponse {
  id: string;

  deleted?: boolean;

  object?: string;
}

/**
 * Represents the parsed content of a vector store file.
 */
export interface FileContentResponse {
  data: Array<FileContentResponse.Data>;

  has_more?: boolean;

  next_page?: string | null;

  object?: 'vector_store.file_content.page';
}

export namespace FileContentResponse {
  /**
   * Content item from a vector store file or search result.
   */
  export interface Data {
    text: string;

    type: 'text';

    /**
     * `ChunkMetadata` is backend metadata for a `Chunk` that is used to store
     * additional information about the chunk that will not be used in the context
     * during inference, but is required for backend functionality. The `ChunkMetadata`
     * is set during chunk creation in `FileSearchToolRuntimeImpl().insert()`and is not
     * expected to change after. Use `Chunk.metadata` for metadata that will be used in
     * the context during inference.
     */
    chunk_metadata?: Data.ChunkMetadata | null;

    embedding?: Array<number> | null;

    metadata?: { [key: string]: unknown } | null;
  }

  export namespace Data {
    /**
     * `ChunkMetadata` is backend metadata for a `Chunk` that is used to store
     * additional information about the chunk that will not be used in the context
     * during inference, but is required for backend functionality. The `ChunkMetadata`
     * is set during chunk creation in `FileSearchToolRuntimeImpl().insert()`and is not
     * expected to change after. Use `Chunk.metadata` for metadata that will be used in
     * the context during inference.
     */
    export interface ChunkMetadata {
      chunk_id?: string | null;

      chunk_tokenizer?: string | null;

      chunk_window?: string | null;

      content_token_count?: number | null;

      created_timestamp?: number | null;

      document_id?: string | null;

      metadata_token_count?: number | null;

      source?: string | null;

      updated_timestamp?: number | null;
    }
  }
}

export interface FileCreateParams {
  /**
   * The ID of the file to attach.
   */
  file_id: string;

  /**
   * Attributes to associate with the file.
   */
  attributes?: { [key: string]: unknown } | null;

  /**
   * Strategy for chunking the file content.
   */
  chunking_strategy?:
    | FileCreateParams.VectorStoreChunkingStrategyAuto
    | FileCreateParams.VectorStoreChunkingStrategyStatic
    | FileCreateParams.VectorStoreChunkingStrategyContextual
    | null;
}

export namespace FileCreateParams {
  /**
   * Automatic chunking strategy for vector store files.
   */
  export interface VectorStoreChunkingStrategyAuto {
    type?: 'auto';
  }

  /**
   * Static chunking strategy with configurable parameters.
   */
  export interface VectorStoreChunkingStrategyStatic {
    /**
     * Configuration for static chunking strategy.
     */
    static: VectorStoreChunkingStrategyStatic.Static;

    type?: 'static';
  }

  export namespace VectorStoreChunkingStrategyStatic {
    /**
     * Configuration for static chunking strategy.
     */
    export interface Static {
      chunk_overlap_tokens?: number;

      max_chunk_size_tokens?: number;
    }
  }

  /**
   * Contextual chunking strategy that uses an LLM to situate chunks within the
   * document.
   */
  export interface VectorStoreChunkingStrategyContextual {
    /**
     * Configuration for contextual chunking.
     */
    contextual: VectorStoreChunkingStrategyContextual.Contextual;

    /**
     * Strategy type identifier.
     */
    type?: 'contextual';
  }

  export namespace VectorStoreChunkingStrategyContextual {
    /**
     * Configuration for contextual chunking.
     */
    export interface Contextual {
      /**
       * Tokens to overlap between adjacent chunks. Must be less than
       * max_chunk_size_tokens.
       */
      chunk_overlap_tokens?: number;

      /**
       * Prompt template for contextual retrieval. Uses WHOLE_DOCUMENT and CHUNK_CONTENT
       * placeholders wrapped in double curly braces.
       */
      context_prompt?: string;

      /**
       * Maximum tokens per chunk. Suggested ~700 to allow room for prepended context.
       */
      max_chunk_size_tokens?: number;

      /**
       * Maximum concurrent LLM calls. Falls back to config default if not provided.
       */
      max_concurrency?: number | null;

      /**
       * LLM model for generating context. Falls back to
       * VectorStoresConfig.contextual_retrieval_params.model if not provided.
       */
      model_id?: string | null;

      /**
       * Timeout per LLM call in seconds. Falls back to config default if not provided.
       */
      timeout_seconds?: number | null;
    }
  }
}

export interface FileUpdateParams {
  /**
   * The new attributes for the file.
   */
  attributes: { [key: string]: unknown };
}

export interface FileListParams extends OpenAICursorPageParams {
  /**
   * Pagination cursor (before).
   */
  before?: string | null;

  /**
   * Filter by file status.
   */
  filter?: 'completed' | 'in_progress' | 'cancelled' | 'failed' | null;

  /**
   * Sort order by created_at: asc or desc.
   */
  order?: string | null;
}

export interface FileContentParams {
  /**
   * Include embedding vectors.
   */
  include_embeddings?: boolean | null;

  /**
   * Include chunk metadata.
   */
  include_metadata?: boolean | null;
}

Files.VectorStoreFilesOpenAICursorPage = VectorStoreFilesOpenAICursorPage;

export declare namespace Files {
  export {
    type VectorStoreFile as VectorStoreFile,
    type FileDeleteResponse as FileDeleteResponse,
    type FileContentResponse as FileContentResponse,
    VectorStoreFilesOpenAICursorPage as VectorStoreFilesOpenAICursorPage,
    type FileCreateParams as FileCreateParams,
    type FileUpdateParams as FileUpdateParams,
    type FileListParams as FileListParams,
    type FileContentParams as FileContentParams,
  };
}
