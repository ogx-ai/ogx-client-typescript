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

export class Datasets extends APIResource {
  /**
   * Get a dataset by its ID.
   */
  retrieve(datasetId: string, options?: Core.RequestOptions): Core.APIPromise<DatasetRetrieveResponse> {
    return this._client.get(`/v1beta/datasets/${datasetId}`, options);
  }

  /**
   * List all datasets.
   */
  list(options?: Core.RequestOptions): Core.APIPromise<DatasetListResponse> {
    return (
      this._client.get('/v1beta/datasets', options) as Core.APIPromise<{ data: DatasetListResponse }>
    )._thenUnwrap((obj) => obj.data);
  }

  /**
   * Append rows to a dataset.
   */
  appendrows(
    datasetId: string,
    body: DatasetAppendrowsParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<void> {
    return this._client.post(`/v1beta/datasetio/append-rows/${datasetId}`, {
      body,
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
  }

  /**
   * Get a paginated list of rows from a dataset.
   *
   * Uses offset-based pagination where:
   *
   * - start_index: The starting index (0-based). If None, starts from beginning.
   * - limit: Number of items to return. If None or -1, returns all items.
   *
   * The response includes:
   *
   * - data: List of items for the current page.
   * - has_more: Whether there are more items available after this set.
   */
  iterrows(
    datasetId: string,
    query?: DatasetIterrowsParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<DatasetIterrowsResponse>;
  iterrows(datasetId: string, options?: Core.RequestOptions): Core.APIPromise<DatasetIterrowsResponse>;
  iterrows(
    datasetId: string,
    query: DatasetIterrowsParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<DatasetIterrowsResponse> {
    if (isRequestOptions(query)) {
      return this.iterrows(datasetId, {}, query);
    }
    return this._client.get(`/v1beta/datasetio/iterrows/${datasetId}`, { query, ...options });
  }

  /**
   * Register a new dataset.
   *
   * @deprecated
   */
  register(
    body: DatasetRegisterParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<DatasetRegisterResponse> {
    return this._client.post('/v1beta/datasets', { body, ...options });
  }

  /**
   * Unregister a dataset by its ID.
   *
   * @deprecated
   */
  unregister(datasetId: string, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.delete(`/v1beta/datasets/${datasetId}`, {
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
  }
}

/**
 * Response from listing datasets.
 */
export interface ListDatasetsResponse {
  /**
   * List of datasets
   */
  data: DatasetListResponse;
}

/**
 * Dataset resource for storing and accessing training or evaluation data.
 */
export interface DatasetRetrieveResponse {
  /**
   * Unique identifier for this resource in llama stack
   */
  identifier: string;

  /**
   * ID of the provider that owns this resource
   */
  provider_id: string;

  /**
   * Purpose of the dataset indicating its intended use
   */
  purpose: 'eval/question-answer' | 'eval/messages-answer';

  /**
   * Data source configuration for the dataset
   */
  source: DatasetRetrieveResponse.UriDataSource | DatasetRetrieveResponse.RowsDataSource;

  /**
   * Any additional metadata for this dataset
   */
  metadata?: { [key: string]: unknown };

  /**
   * Unique identifier for this resource in the provider
   */
  provider_resource_id?: string | null;

  /**
   * Type of resource, always 'dataset' for datasets
   */
  type?: 'dataset';
}

export namespace DatasetRetrieveResponse {
  /**
   * A dataset that can be obtained from a URI.
   */
  export interface UriDataSource {
    /**
     * The dataset can be obtained from a URI. E.g.
     * "https://mywebsite.com/mydata.jsonl", "lsfs://mydata.jsonl",
     * "data:csv;base64,{base64_content}"
     */
    uri: string;

    /**
     * The type of data source.
     */
    type?: 'uri';
  }

  /**
   * A dataset stored in rows.
   */
  export interface RowsDataSource {
    /**
     * The dataset is stored in rows. E.g. [{"messages": [{"role": "user", "content":
     * "Hello, world!"}, {"role": "assistant", "content": "Hello, world!"}]}]
     */
    rows: Array<{ [key: string]: unknown }>;

    /**
     * The type of data source.
     */
    type?: 'rows';
  }
}

/**
 * List of datasets
 */
export type DatasetListResponse = Array<DatasetListResponse.DatasetListResponseItem>;

export namespace DatasetListResponse {
  /**
   * Dataset resource for storing and accessing training or evaluation data.
   */
  export interface DatasetListResponseItem {
    /**
     * Unique identifier for this resource in llama stack
     */
    identifier: string;

    /**
     * ID of the provider that owns this resource
     */
    provider_id: string;

    /**
     * Purpose of the dataset indicating its intended use
     */
    purpose: 'eval/question-answer' | 'eval/messages-answer';

    /**
     * Data source configuration for the dataset
     */
    source: DatasetListResponseItem.UriDataSource | DatasetListResponseItem.RowsDataSource;

    /**
     * Any additional metadata for this dataset
     */
    metadata?: { [key: string]: unknown };

    /**
     * Unique identifier for this resource in the provider
     */
    provider_resource_id?: string | null;

    /**
     * Type of resource, always 'dataset' for datasets
     */
    type?: 'dataset';
  }

  export namespace DatasetListResponseItem {
    /**
     * A dataset that can be obtained from a URI.
     */
    export interface UriDataSource {
      /**
       * The dataset can be obtained from a URI. E.g.
       * "https://mywebsite.com/mydata.jsonl", "lsfs://mydata.jsonl",
       * "data:csv;base64,{base64_content}"
       */
      uri: string;

      /**
       * The type of data source.
       */
      type?: 'uri';
    }

    /**
     * A dataset stored in rows.
     */
    export interface RowsDataSource {
      /**
       * The dataset is stored in rows. E.g. [{"messages": [{"role": "user", "content":
       * "Hello, world!"}, {"role": "assistant", "content": "Hello, world!"}]}]
       */
      rows: Array<{ [key: string]: unknown }>;

      /**
       * The type of data source.
       */
      type?: 'rows';
    }
  }
}

/**
 * A generic paginated response that follows a simple format.
 */
export interface DatasetIterrowsResponse {
  data: Array<{ [key: string]: unknown }>;

  has_more: boolean;

  url?: string | null;
}

/**
 * Dataset resource for storing and accessing training or evaluation data.
 */
export interface DatasetRegisterResponse {
  /**
   * Unique identifier for this resource in llama stack
   */
  identifier: string;

  /**
   * ID of the provider that owns this resource
   */
  provider_id: string;

  /**
   * Purpose of the dataset indicating its intended use
   */
  purpose: 'eval/question-answer' | 'eval/messages-answer';

  /**
   * Data source configuration for the dataset
   */
  source: DatasetRegisterResponse.UriDataSource | DatasetRegisterResponse.RowsDataSource;

  /**
   * Any additional metadata for this dataset
   */
  metadata?: { [key: string]: unknown };

  /**
   * Unique identifier for this resource in the provider
   */
  provider_resource_id?: string | null;

  /**
   * Type of resource, always 'dataset' for datasets
   */
  type?: 'dataset';
}

export namespace DatasetRegisterResponse {
  /**
   * A dataset that can be obtained from a URI.
   */
  export interface UriDataSource {
    /**
     * The dataset can be obtained from a URI. E.g.
     * "https://mywebsite.com/mydata.jsonl", "lsfs://mydata.jsonl",
     * "data:csv;base64,{base64_content}"
     */
    uri: string;

    /**
     * The type of data source.
     */
    type?: 'uri';
  }

  /**
   * A dataset stored in rows.
   */
  export interface RowsDataSource {
    /**
     * The dataset is stored in rows. E.g. [{"messages": [{"role": "user", "content":
     * "Hello, world!"}, {"role": "assistant", "content": "Hello, world!"}]}]
     */
    rows: Array<{ [key: string]: unknown }>;

    /**
     * The type of data source.
     */
    type?: 'rows';
  }
}

export interface DatasetAppendrowsParams {
  /**
   * The rows to append to the dataset.
   */
  rows: Array<{ [key: string]: unknown }>;
}

export interface DatasetIterrowsParams {
  /**
   * The number of rows to get.
   */
  limit?: number | null;

  /**
   * Index into dataset for the first row to get. Get all rows if None.
   */
  start_index?: number | null;
}

export interface DatasetRegisterParams {
  /**
   * The purpose of the dataset.
   */
  purpose: 'eval/question-answer' | 'eval/messages-answer';

  /**
   * The data source of the dataset.
   */
  source: DatasetRegisterParams.UriDataSource | DatasetRegisterParams.RowsDataSource;

  /**
   * The ID of the dataset. If not provided, an ID will be generated.
   */
  dataset_id?: string | null;

  /**
   * The metadata for the dataset.
   */
  metadata?: { [key: string]: unknown } | null;
}

export namespace DatasetRegisterParams {
  /**
   * A dataset that can be obtained from a URI.
   */
  export interface UriDataSource {
    /**
     * The dataset can be obtained from a URI. E.g.
     * "https://mywebsite.com/mydata.jsonl", "lsfs://mydata.jsonl",
     * "data:csv;base64,{base64_content}"
     */
    uri: string;

    /**
     * The type of data source.
     */
    type?: 'uri';
  }

  /**
   * A dataset stored in rows.
   */
  export interface RowsDataSource {
    /**
     * The dataset is stored in rows. E.g. [{"messages": [{"role": "user", "content":
     * "Hello, world!"}, {"role": "assistant", "content": "Hello, world!"}]}]
     */
    rows: Array<{ [key: string]: unknown }>;

    /**
     * The type of data source.
     */
    type?: 'rows';
  }
}

export declare namespace Datasets {
  export {
    type ListDatasetsResponse as ListDatasetsResponse,
    type DatasetRetrieveResponse as DatasetRetrieveResponse,
    type DatasetListResponse as DatasetListResponse,
    type DatasetIterrowsResponse as DatasetIterrowsResponse,
    type DatasetRegisterResponse as DatasetRegisterResponse,
    type DatasetAppendrowsParams as DatasetAppendrowsParams,
    type DatasetIterrowsParams as DatasetIterrowsParams,
    type DatasetRegisterParams as DatasetRegisterParams,
  };
}
