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
import * as FileBatchesAPI from './file-batches';
import {
  FileBatchCreateParams,
  FileBatchListFilesParams,
  FileBatches,
  ListVectorStoreFilesInBatchResponse,
  VectorStoreFileBatches,
} from './file-batches';
import * as FilesAPI from './files';
import {
  FileContentParams,
  FileContentResponse,
  FileCreateParams,
  FileDeleteResponse,
  FileListParams,
  FileUpdateParams,
  Files,
  VectorStoreFile,
  VectorStoreFilesOpenAICursorPage,
} from './files';
import { OpenAICursorPage, type OpenAICursorPageParams } from '../../pagination';

export class VectorStores extends APIResource {
  files: FilesAPI.Files = new FilesAPI.Files(this._client);
  fileBatches: FileBatchesAPI.FileBatches = new FileBatchesAPI.FileBatches(this._client);

  /**
   * Create a vector store (OpenAI-compatible).
   */
  create(body: VectorStoreCreateParams, options?: Core.RequestOptions): Core.APIPromise<VectorStore> {
    return this._client.post('/v1/vector_stores', { body, ...options });
  }

  /**
   * Retrieve a vector store (OpenAI-compatible).
   */
  retrieve(vectorStoreId: string, options?: Core.RequestOptions): Core.APIPromise<VectorStore> {
    return this._client.get(`/v1/vector_stores/${vectorStoreId}`, options);
  }

  /**
   * Update a vector store (OpenAI-compatible).
   */
  update(
    vectorStoreId: string,
    body: VectorStoreUpdateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<VectorStore> {
    return this._client.post(`/v1/vector_stores/${vectorStoreId}`, { body, ...options });
  }

  /**
   * List vector stores (OpenAI-compatible).
   */
  list(
    query?: VectorStoreListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<VectorStoresOpenAICursorPage, VectorStore>;
  list(options?: Core.RequestOptions): Core.PagePromise<VectorStoresOpenAICursorPage, VectorStore>;
  list(
    query: VectorStoreListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<VectorStoresOpenAICursorPage, VectorStore> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.getAPIList('/v1/vector_stores', VectorStoresOpenAICursorPage, { query, ...options });
  }

  /**
   * Delete a vector store (OpenAI-compatible).
   */
  delete(vectorStoreId: string, options?: Core.RequestOptions): Core.APIPromise<VectorStoreDeleteResponse> {
    return this._client.delete(`/v1/vector_stores/${vectorStoreId}`, options);
  }

  /**
   * Search a vector store (OpenAI-compatible).
   */
  search(
    vectorStoreId: string,
    body: VectorStoreSearchParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<VectorStoreSearchResponse> {
    return this._client.post(`/v1/vector_stores/${vectorStoreId}/search`, { body, ...options });
  }
}

export class VectorStoresOpenAICursorPage extends OpenAICursorPage<VectorStore> {}

/**
 * Response from listing vector stores.
 */
export interface ListVectorStoresResponse {
  data: Array<VectorStore>;

  first_id?: string | null;

  has_more?: boolean;

  last_id?: string | null;

  object?: string;
}

/**
 * OpenAI Vector Store object.
 */
export interface VectorStore {
  id: string;

  created_at: number;

  /**
   * File processing status counts for a vector store.
   */
  file_counts: VectorStore.FileCounts;

  expires_after?: { [key: string]: unknown } | null;

  expires_at?: number | null;

  last_active_at?: number | null;

  metadata?: { [key: string]: unknown };

  name?: string | null;

  object?: string;

  status?: string;

  usage_bytes?: number;
}

export namespace VectorStore {
  /**
   * File processing status counts for a vector store.
   */
  export interface FileCounts {
    cancelled: number;

    completed: number;

    failed: number;

    in_progress: number;

    total: number;
  }
}

/**
 * Response from deleting a vector store.
 */
export interface VectorStoreDeleteResponse {
  id: string;

  deleted?: boolean;

  object?: string;
}

/**
 * Paginated response from searching a vector store.
 */
export interface VectorStoreSearchResponse {
  data: Array<VectorStoreSearchResponse.Data>;

  search_query: Array<string>;

  has_more?: boolean;

  next_page?: string | null;

  object?: string;
}

export namespace VectorStoreSearchResponse {
  /**
   * Response from searching a vector store.
   */
  export interface Data {
    content: Array<Data.Content>;

    file_id: string;

    filename: string;

    score: number;

    attributes?: { [key: string]: string | number | boolean } | null;
  }

  export namespace Data {
    /**
     * Content item from a vector store file or search result.
     */
    export interface Content {
      text: string;

      type: 'text';

      /**
       * `ChunkMetadata` is backend metadata for a `Chunk` that is used to store
       * additional information about the chunk that will not be used in the context
       * during inference, but is required for backend functionality. The `ChunkMetadata`
       * is set during chunk creation in `MemoryToolRuntimeImpl().insert()`and is not
       * expected to change after. Use `Chunk.metadata` for metadata that will be used in
       * the context during inference.
       */
      chunk_metadata?: Content.ChunkMetadata | null;

      embedding?: Array<number> | null;

      metadata?: { [key: string]: unknown } | null;
    }

    export namespace Content {
      /**
       * `ChunkMetadata` is backend metadata for a `Chunk` that is used to store
       * additional information about the chunk that will not be used in the context
       * during inference, but is required for backend functionality. The `ChunkMetadata`
       * is set during chunk creation in `MemoryToolRuntimeImpl().insert()`and is not
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
}

export interface VectorStoreCreateParams {
  /**
   * Automatic chunking strategy for vector store files.
   */
  chunking_strategy?:
    | VectorStoreCreateParams.VectorStoreChunkingStrategyAuto
    | VectorStoreCreateParams.VectorStoreChunkingStrategyStatic
    | null;

  expires_after?: { [key: string]: unknown } | null;

  file_ids?: Array<string> | null;

  metadata?: { [key: string]: unknown } | null;

  name?: string | null;

  [k: string]: unknown;
}

export namespace VectorStoreCreateParams {
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
}

export interface VectorStoreUpdateParams {
  /**
   * Expiration policy for the vector store.
   */
  expires_after?: { [key: string]: unknown } | null;

  /**
   * Metadata to associate with the vector store.
   */
  metadata?: { [key: string]: unknown } | null;

  /**
   * The new name for the vector store.
   */
  name?: string | null;
}

export interface VectorStoreListParams extends OpenAICursorPageParams {
  /**
   * Pagination cursor (before).
   */
  before?: string | null;

  /**
   * Sort order by created_at: asc or desc.
   */
  order?: string | null;
}

export interface VectorStoreSearchParams {
  /**
   * The search query string or list of query strings.
   */
  query: string | Array<string>;

  /**
   * Filters to apply to the search.
   */
  filters?: { [key: string]: unknown } | null;

  /**
   * Maximum number of results to return.
   */
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
  ranking_options?: VectorStoreSearchParams.RankingOptions | null;

  /**
   * Whether to rewrite the query for better results.
   */
  rewrite_query?: boolean | null;

  /**
   * The search mode to use (e.g., 'vector', 'keyword').
   */
  search_mode?: string | null;
}

export namespace VectorStoreSearchParams {
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

VectorStores.VectorStoresOpenAICursorPage = VectorStoresOpenAICursorPage;
VectorStores.Files = Files;
VectorStores.VectorStoreFilesOpenAICursorPage = VectorStoreFilesOpenAICursorPage;
VectorStores.FileBatches = FileBatches;

export declare namespace VectorStores {
  export {
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
    Files as Files,
    type VectorStoreFile as VectorStoreFile,
    type FileDeleteResponse as FileDeleteResponse,
    type FileContentResponse as FileContentResponse,
    VectorStoreFilesOpenAICursorPage as VectorStoreFilesOpenAICursorPage,
    type FileCreateParams as FileCreateParams,
    type FileUpdateParams as FileUpdateParams,
    type FileListParams as FileListParams,
    type FileContentParams as FileContentParams,
  };

  export {
    FileBatches as FileBatches,
    type ListVectorStoreFilesInBatchResponse as ListVectorStoreFilesInBatchResponse,
    type VectorStoreFileBatches as VectorStoreFileBatches,
    type FileBatchCreateParams as FileBatchCreateParams,
    type FileBatchListFilesParams as FileBatchListFilesParams,
  };
}
