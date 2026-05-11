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
 * This API is used to upload documents that can be used with other OGX APIs.
 */
export class Files extends APIResource {
  /**
   * Upload a file.
   */
  create(body: FileCreateParams, options?: Core.RequestOptions): Core.APIPromise<File> {
    return this._client.post('/v1/files', Core.multipartFormRequestOptions({ body, ...options }));
  }

  /**
   * Get file
   */
  retrieve(fileId: string, options?: Core.RequestOptions): Core.APIPromise<File> {
    return this._client.get(`/v1/files/${fileId}`, options);
  }

  /**
   * List files
   */
  list(query?: FileListParams, options?: Core.RequestOptions): Core.PagePromise<FilesOpenAICursorPage, File>;
  list(options?: Core.RequestOptions): Core.PagePromise<FilesOpenAICursorPage, File>;
  list(
    query: FileListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<FilesOpenAICursorPage, File> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.getAPIList('/v1/files', FilesOpenAICursorPage, { query, ...options });
  }

  /**
   * Delete file
   */
  delete(fileId: string, options?: Core.RequestOptions): Core.APIPromise<DeleteFileResponse> {
    return this._client.delete(`/v1/files/${fileId}`, options);
  }

  /**
   * Retrieve file content
   */
  content(fileId: string, options?: Core.RequestOptions): Core.APIPromise<string> {
    return this._client.get(`/v1/files/${fileId}/content`, options);
  }
}

export class FilesOpenAICursorPage extends OpenAICursorPage<File> {}

/**
 * Response for deleting a file in OpenAI Files API.
 */
export interface DeleteFileResponse {
  /**
   * The file identifier that was deleted.
   */
  id: string;

  /**
   * Whether the file was successfully deleted.
   */
  deleted: boolean;

  /**
   * The object type, which is always 'file'.
   */
  object?: 'file';
}

/**
 * OpenAI File object as defined in the OpenAI Files API.
 */
export interface File {
  /**
   * The file identifier, which can be referenced in the API endpoints.
   */
  id: string;

  /**
   * The size of the file, in bytes.
   */
  bytes: number;

  /**
   * The Unix timestamp (in seconds) for when the file was created.
   */
  created_at: number;

  /**
   * The name of the file.
   */
  filename: string;

  /**
   * The intended purpose of the file.
   */
  purpose:
    | 'assistants'
    | 'assistants_output'
    | 'batch'
    | 'batch_output'
    | 'evals'
    | 'fine-tune'
    | 'fine-tune-results'
    | 'vision'
    | 'user_data';

  /**
   * @deprecated Deprecated. The current status of the file.
   */
  status: 'uploaded' | 'processed' | 'error';

  /**
   * The Unix timestamp (in seconds) for when the file will expire.
   */
  expires_at?: number;

  /**
   * The object type, which is always 'file'.
   */
  object?: 'file';

  /**
   * @deprecated Deprecated. For details on why a fine-tuning training file failed
   * validation, see the error field on fine_tuning.job.
   */
  status_details?: string;
}

/**
 * Response for listing files in OpenAI Files API.
 */
export interface ListFilesResponse {
  /**
   * The list of files.
   */
  data: Array<File>;

  /**
   * The ID of the first file in the list for pagination.
   */
  first_id: string;

  /**
   * Whether there are more files available beyond this page.
   */
  has_more: boolean;

  /**
   * The ID of the last file in the list for pagination.
   */
  last_id: string;

  /**
   * The object type, which is always 'list'.
   */
  object?: 'list';
}

export type FileContentResponse = string;

export interface FileCreateParams {
  /**
   * The file to upload.
   */
  file: Core.Uploadable;

  /**
   * The intended purpose of the uploaded file.
   */
  purpose: 'assistants' | 'batch' | 'fine-tune' | 'vision' | 'user_data' | 'evals';

  /**
   * Control expiration of uploaded files.
   */
  expires_after?: FileCreateParams.ExpiresAfter | null;
}

export namespace FileCreateParams {
  /**
   * Control expiration of uploaded files.
   */
  export interface ExpiresAfter {
    /**
     * The anchor point for expiration, must be 'created_at'.
     */
    anchor: 'created_at';

    /**
     * Seconds until expiration, between 3600 (1 hour) and 2592000 (30 days).
     */
    seconds: number;
  }
}

export interface FileListParams extends OpenAICursorPageParams {
  /**
   * Sort order by created_at timestamp ('asc' or 'desc').
   */
  order?: 'asc' | 'desc' | null;

  /**
   * Filter files by purpose.
   */
  purpose?:
    | 'assistants'
    | 'assistants_output'
    | 'batch'
    | 'batch_output'
    | 'evals'
    | 'fine-tune'
    | 'fine-tune-results'
    | 'vision'
    | 'user_data'
    | null;
}

Files.FilesOpenAICursorPage = FilesOpenAICursorPage;

export declare namespace Files {
  export {
    type DeleteFileResponse as DeleteFileResponse,
    type File as File,
    type ListFilesResponse as ListFilesResponse,
    type FileContentResponse as FileContentResponse,
    FilesOpenAICursorPage as FilesOpenAICursorPage,
    type FileCreateParams as FileCreateParams,
    type FileListParams as FileListParams,
  };
}
