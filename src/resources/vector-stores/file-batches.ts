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
import * as FilesAPI from './files';
import { VectorStoreFilesOpenAICursorPage } from './files';
import { type OpenAICursorPageParams } from '../../pagination';

export class FileBatches extends APIResource {
  /**
   * Create a vector store file batch (OpenAI-compatible).
   */
  create(
    vectorStoreId: string,
    body: FileBatchCreateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<VectorStoreFileBatches> {
    return this._client.post(`/v1/vector_stores/${vectorStoreId}/file_batches`, { body, ...options });
  }

  /**
   * Retrieve a vector store file batch (OpenAI-compatible).
   */
  retrieve(
    vectorStoreId: string,
    batchId: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<VectorStoreFileBatches> {
    return this._client.get(`/v1/vector_stores/${vectorStoreId}/file_batches/${batchId}`, options);
  }

  /**
   * Cancel a vector store file batch (OpenAI-compatible).
   */
  cancel(
    vectorStoreId: string,
    batchId: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<VectorStoreFileBatches> {
    return this._client.post(`/v1/vector_stores/${vectorStoreId}/file_batches/${batchId}/cancel`, options);
  }

  /**
   * List files in a vector store file batch (OpenAI-compatible).
   */
  listFiles(
    vectorStoreId: string,
    batchId: string,
    query?: FileBatchListFilesParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<VectorStoreFilesOpenAICursorPage, FilesAPI.VectorStoreFile>;
  listFiles(
    vectorStoreId: string,
    batchId: string,
    options?: Core.RequestOptions,
  ): Core.PagePromise<VectorStoreFilesOpenAICursorPage, FilesAPI.VectorStoreFile>;
  listFiles(
    vectorStoreId: string,
    batchId: string,
    query: FileBatchListFilesParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<VectorStoreFilesOpenAICursorPage, FilesAPI.VectorStoreFile> {
    if (isRequestOptions(query)) {
      return this.listFiles(vectorStoreId, batchId, {}, query);
    }
    return this._client.getAPIList(
      `/v1/vector_stores/${vectorStoreId}/file_batches/${batchId}/files`,
      VectorStoreFilesOpenAICursorPage,
      { query, ...options },
    );
  }
}

/**
 * Response from listing files in a vector store file batch.
 */
export interface ListVectorStoreFilesInBatchResponse {
  data: Array<FilesAPI.VectorStoreFile>;

  first_id?: string | null;

  has_more?: boolean;

  last_id?: string | null;

  object?: string;
}

/**
 * OpenAI Vector Store File Batch object.
 */
export interface VectorStoreFileBatches {
  id: string;

  created_at: number;

  /**
   * File processing status counts for a vector store.
   */
  file_counts: VectorStoreFileBatches.FileCounts;

  status: 'completed' | 'in_progress' | 'cancelled' | 'failed';

  vector_store_id: string;

  object?: string;
}

export namespace VectorStoreFileBatches {
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

export interface FileBatchCreateParams {
  file_ids: Array<string>;

  attributes?: { [key: string]: unknown } | null;

  /**
   * Automatic chunking strategy for vector store files.
   */
  chunking_strategy?:
    | FileBatchCreateParams.VectorStoreChunkingStrategyAuto
    | FileBatchCreateParams.VectorStoreChunkingStrategyStatic
    | null;

  [k: string]: unknown;
}

export namespace FileBatchCreateParams {
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

export interface FileBatchListFilesParams extends OpenAICursorPageParams {
  /**
   * Pagination cursor (before).
   */
  before?: string | null;

  /**
   * Filter by file status.
   */
  filter?: string | null;

  /**
   * Sort order by created_at: asc or desc.
   */
  order?: string | null;
}

export declare namespace FileBatches {
  export {
    type ListVectorStoreFilesInBatchResponse as ListVectorStoreFilesInBatchResponse,
    type VectorStoreFileBatches as VectorStoreFileBatches,
    type FileBatchCreateParams as FileBatchCreateParams,
    type FileBatchListFilesParams as FileBatchListFilesParams,
  };
}

export { VectorStoreFilesOpenAICursorPage };
