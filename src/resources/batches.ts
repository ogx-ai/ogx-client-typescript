// Copyright (c) The OGX Contributors.
// All rights reserved.
//
// This source code is licensed under the terms described in the LICENSE file in
// the root directory of this source tree.
//
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as Core from '../core';
import { OpenAICursorPage, type OpenAICursorPageParams } from '../pagination';

/**
 * The API is designed to allow use of openai client libraries for seamless integration.
 *
 * This API provides the following extensions:
 *  - idempotent batch creation
 *
 * Note: This API is currently under active development and may undergo changes.
 */
export class Batches extends APIResource {
  /**
   * Create a new batch for processing multiple API requests.
   */
  create(body: BatchCreateParams, options?: Core.RequestOptions): Core.APIPromise<BatchCreateResponse> {
    return this._client.post('/v1/batches', { body, ...options });
  }

  /**
   * Retrieve information about a specific batch.
   */
  retrieve(batchId: string, options?: Core.RequestOptions): Core.APIPromise<BatchRetrieveResponse> {
    return this._client.get(`/v1/batches/${batchId}`, options);
  }

  /**
   * List all batches for the current user.
   */
  list(
    query?: BatchListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<BatchListResponsesOpenAICursorPage, BatchListResponse>;
  list(
    options?: Core.RequestOptions,
  ): Core.PagePromise<BatchListResponsesOpenAICursorPage, BatchListResponse>;
  list(
    query: BatchListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<BatchListResponsesOpenAICursorPage, BatchListResponse> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.getAPIList('/v1/batches', BatchListResponsesOpenAICursorPage, { query, ...options });
  }

  /**
   * Cancel a batch that is in progress.
   */
  cancel(batchId: string, options?: Core.RequestOptions): Core.APIPromise<BatchCancelResponse> {
    return this._client.post(`/v1/batches/${batchId}/cancel`, options);
  }
}

export class BatchListResponsesOpenAICursorPage extends OpenAICursorPage<BatchListResponse> {}

export interface BatchCreateResponse {
  id: string;

  completion_window: string;

  created_at: number;

  endpoint: string;

  input_file_id: string;

  object: 'batch';

  status:
    | 'validating'
    | 'failed'
    | 'in_progress'
    | 'finalizing'
    | 'completed'
    | 'expired'
    | 'cancelling'
    | 'cancelled';

  cancelled_at?: number | null;

  cancelling_at?: number | null;

  completed_at?: number | null;

  error_file_id?: string | null;

  errors?: BatchCreateResponse.Errors | null;

  expired_at?: number | null;

  expires_at?: number | null;

  failed_at?: number | null;

  finalizing_at?: number | null;

  in_progress_at?: number | null;

  metadata?: { [key: string]: string } | null;

  model?: string | null;

  output_file_id?: string | null;

  /**
   * The request counts for different statuses within the batch.
   */
  request_counts?: BatchCreateResponse.RequestCounts | null;

  /**
   * Represents token usage details including input tokens, output tokens, a
   * breakdown of output tokens, and the total tokens used. Only populated on batches
   * created after September 7, 2025.
   */
  usage?: BatchCreateResponse.Usage | null;

  [k: string]: unknown;
}

export namespace BatchCreateResponse {
  export interface Errors {
    data?: Array<Errors.Data> | null;

    object?: string | null;

    [k: string]: unknown;
  }

  export namespace Errors {
    export interface Data {
      code?: string | null;

      line?: number | null;

      message?: string | null;

      param?: string | null;

      [k: string]: unknown;
    }
  }

  /**
   * The request counts for different statuses within the batch.
   */
  export interface RequestCounts {
    completed: number;

    failed: number;

    total: number;

    [k: string]: unknown;
  }

  /**
   * Represents token usage details including input tokens, output tokens, a
   * breakdown of output tokens, and the total tokens used. Only populated on batches
   * created after September 7, 2025.
   */
  export interface Usage {
    input_tokens: number;

    /**
     * A detailed breakdown of the input tokens.
     */
    input_tokens_details: Usage.InputTokensDetails;

    output_tokens: number;

    /**
     * A detailed breakdown of the output tokens.
     */
    output_tokens_details: Usage.OutputTokensDetails;

    total_tokens: number;

    [k: string]: unknown;
  }

  export namespace Usage {
    /**
     * A detailed breakdown of the input tokens.
     */
    export interface InputTokensDetails {
      cached_tokens: number;

      [k: string]: unknown;
    }

    /**
     * A detailed breakdown of the output tokens.
     */
    export interface OutputTokensDetails {
      reasoning_tokens: number;

      [k: string]: unknown;
    }
  }
}

export interface BatchRetrieveResponse {
  id: string;

  completion_window: string;

  created_at: number;

  endpoint: string;

  input_file_id: string;

  object: 'batch';

  status:
    | 'validating'
    | 'failed'
    | 'in_progress'
    | 'finalizing'
    | 'completed'
    | 'expired'
    | 'cancelling'
    | 'cancelled';

  cancelled_at?: number | null;

  cancelling_at?: number | null;

  completed_at?: number | null;

  error_file_id?: string | null;

  errors?: BatchRetrieveResponse.Errors | null;

  expired_at?: number | null;

  expires_at?: number | null;

  failed_at?: number | null;

  finalizing_at?: number | null;

  in_progress_at?: number | null;

  metadata?: { [key: string]: string } | null;

  model?: string | null;

  output_file_id?: string | null;

  /**
   * The request counts for different statuses within the batch.
   */
  request_counts?: BatchRetrieveResponse.RequestCounts | null;

  /**
   * Represents token usage details including input tokens, output tokens, a
   * breakdown of output tokens, and the total tokens used. Only populated on batches
   * created after September 7, 2025.
   */
  usage?: BatchRetrieveResponse.Usage | null;

  [k: string]: unknown;
}

export namespace BatchRetrieveResponse {
  export interface Errors {
    data?: Array<Errors.Data> | null;

    object?: string | null;

    [k: string]: unknown;
  }

  export namespace Errors {
    export interface Data {
      code?: string | null;

      line?: number | null;

      message?: string | null;

      param?: string | null;

      [k: string]: unknown;
    }
  }

  /**
   * The request counts for different statuses within the batch.
   */
  export interface RequestCounts {
    completed: number;

    failed: number;

    total: number;

    [k: string]: unknown;
  }

  /**
   * Represents token usage details including input tokens, output tokens, a
   * breakdown of output tokens, and the total tokens used. Only populated on batches
   * created after September 7, 2025.
   */
  export interface Usage {
    input_tokens: number;

    /**
     * A detailed breakdown of the input tokens.
     */
    input_tokens_details: Usage.InputTokensDetails;

    output_tokens: number;

    /**
     * A detailed breakdown of the output tokens.
     */
    output_tokens_details: Usage.OutputTokensDetails;

    total_tokens: number;

    [k: string]: unknown;
  }

  export namespace Usage {
    /**
     * A detailed breakdown of the input tokens.
     */
    export interface InputTokensDetails {
      cached_tokens: number;

      [k: string]: unknown;
    }

    /**
     * A detailed breakdown of the output tokens.
     */
    export interface OutputTokensDetails {
      reasoning_tokens: number;

      [k: string]: unknown;
    }
  }
}

export interface BatchListResponse {
  id: string;

  completion_window: string;

  created_at: number;

  endpoint: string;

  input_file_id: string;

  object: 'batch';

  status:
    | 'validating'
    | 'failed'
    | 'in_progress'
    | 'finalizing'
    | 'completed'
    | 'expired'
    | 'cancelling'
    | 'cancelled';

  cancelled_at?: number | null;

  cancelling_at?: number | null;

  completed_at?: number | null;

  error_file_id?: string | null;

  errors?: BatchListResponse.Errors | null;

  expired_at?: number | null;

  expires_at?: number | null;

  failed_at?: number | null;

  finalizing_at?: number | null;

  in_progress_at?: number | null;

  metadata?: { [key: string]: string } | null;

  model?: string | null;

  output_file_id?: string | null;

  /**
   * The request counts for different statuses within the batch.
   */
  request_counts?: BatchListResponse.RequestCounts | null;

  /**
   * Represents token usage details including input tokens, output tokens, a
   * breakdown of output tokens, and the total tokens used. Only populated on batches
   * created after September 7, 2025.
   */
  usage?: BatchListResponse.Usage | null;

  [k: string]: unknown;
}

export namespace BatchListResponse {
  export interface Errors {
    data?: Array<Errors.Data> | null;

    object?: string | null;

    [k: string]: unknown;
  }

  export namespace Errors {
    export interface Data {
      code?: string | null;

      line?: number | null;

      message?: string | null;

      param?: string | null;

      [k: string]: unknown;
    }
  }

  /**
   * The request counts for different statuses within the batch.
   */
  export interface RequestCounts {
    completed: number;

    failed: number;

    total: number;

    [k: string]: unknown;
  }

  /**
   * Represents token usage details including input tokens, output tokens, a
   * breakdown of output tokens, and the total tokens used. Only populated on batches
   * created after September 7, 2025.
   */
  export interface Usage {
    input_tokens: number;

    /**
     * A detailed breakdown of the input tokens.
     */
    input_tokens_details: Usage.InputTokensDetails;

    output_tokens: number;

    /**
     * A detailed breakdown of the output tokens.
     */
    output_tokens_details: Usage.OutputTokensDetails;

    total_tokens: number;

    [k: string]: unknown;
  }

  export namespace Usage {
    /**
     * A detailed breakdown of the input tokens.
     */
    export interface InputTokensDetails {
      cached_tokens: number;

      [k: string]: unknown;
    }

    /**
     * A detailed breakdown of the output tokens.
     */
    export interface OutputTokensDetails {
      reasoning_tokens: number;

      [k: string]: unknown;
    }
  }
}

export interface BatchCancelResponse {
  id: string;

  completion_window: string;

  created_at: number;

  endpoint: string;

  input_file_id: string;

  object: 'batch';

  status:
    | 'validating'
    | 'failed'
    | 'in_progress'
    | 'finalizing'
    | 'completed'
    | 'expired'
    | 'cancelling'
    | 'cancelled';

  cancelled_at?: number | null;

  cancelling_at?: number | null;

  completed_at?: number | null;

  error_file_id?: string | null;

  errors?: BatchCancelResponse.Errors | null;

  expired_at?: number | null;

  expires_at?: number | null;

  failed_at?: number | null;

  finalizing_at?: number | null;

  in_progress_at?: number | null;

  metadata?: { [key: string]: string } | null;

  model?: string | null;

  output_file_id?: string | null;

  /**
   * The request counts for different statuses within the batch.
   */
  request_counts?: BatchCancelResponse.RequestCounts | null;

  /**
   * Represents token usage details including input tokens, output tokens, a
   * breakdown of output tokens, and the total tokens used. Only populated on batches
   * created after September 7, 2025.
   */
  usage?: BatchCancelResponse.Usage | null;

  [k: string]: unknown;
}

export namespace BatchCancelResponse {
  export interface Errors {
    data?: Array<Errors.Data> | null;

    object?: string | null;

    [k: string]: unknown;
  }

  export namespace Errors {
    export interface Data {
      code?: string | null;

      line?: number | null;

      message?: string | null;

      param?: string | null;

      [k: string]: unknown;
    }
  }

  /**
   * The request counts for different statuses within the batch.
   */
  export interface RequestCounts {
    completed: number;

    failed: number;

    total: number;

    [k: string]: unknown;
  }

  /**
   * Represents token usage details including input tokens, output tokens, a
   * breakdown of output tokens, and the total tokens used. Only populated on batches
   * created after September 7, 2025.
   */
  export interface Usage {
    input_tokens: number;

    /**
     * A detailed breakdown of the input tokens.
     */
    input_tokens_details: Usage.InputTokensDetails;

    output_tokens: number;

    /**
     * A detailed breakdown of the output tokens.
     */
    output_tokens_details: Usage.OutputTokensDetails;

    total_tokens: number;

    [k: string]: unknown;
  }

  export namespace Usage {
    /**
     * A detailed breakdown of the input tokens.
     */
    export interface InputTokensDetails {
      cached_tokens: number;

      [k: string]: unknown;
    }

    /**
     * A detailed breakdown of the output tokens.
     */
    export interface OutputTokensDetails {
      reasoning_tokens: number;

      [k: string]: unknown;
    }
  }
}

export interface BatchCreateParams {
  /**
   * The time window within which the batch should be processed.
   */
  completion_window: '24h';

  /**
   * The endpoint to be used for all requests in the batch.
   */
  endpoint: string;

  /**
   * The ID of an uploaded file containing requests for the batch.
   */
  input_file_id: string;

  /**
   * Optional idempotency key. When provided, enables idempotent behavior.
   */
  idempotency_key?: string | null;

  /**
   * Optional metadata for the batch.
   */
  metadata?: { [key: string]: string } | null;
}

export interface BatchListParams extends OpenAICursorPageParams {}

Batches.BatchListResponsesOpenAICursorPage = BatchListResponsesOpenAICursorPage;

export declare namespace Batches {
  export {
    type BatchCreateResponse as BatchCreateResponse,
    type BatchRetrieveResponse as BatchRetrieveResponse,
    type BatchListResponse as BatchListResponse,
    type BatchCancelResponse as BatchCancelResponse,
    BatchListResponsesOpenAICursorPage as BatchListResponsesOpenAICursorPage,
    type BatchCreateParams as BatchCreateParams,
    type BatchListParams as BatchListParams,
  };
}
