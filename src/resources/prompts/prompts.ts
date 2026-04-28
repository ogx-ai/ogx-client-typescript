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
import * as VersionsAPI from './versions';
import { Versions } from './versions';

/**
 * Protocol for prompt management operations.
 */
export class Prompts extends APIResource {
  versions: VersionsAPI.Versions = new VersionsAPI.Versions(this._client);

  /**
   * Create a new prompt.
   */
  create(body: PromptCreateParams, options?: Core.RequestOptions): Core.APIPromise<Prompt> {
    return this._client.post('/v1/prompts', { body, ...options });
  }

  /**
   * Get a prompt by its identifier and optional version.
   */
  retrieve(
    promptId: string,
    query?: PromptRetrieveParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<Prompt>;
  retrieve(promptId: string, options?: Core.RequestOptions): Core.APIPromise<Prompt>;
  retrieve(
    promptId: string,
    query: PromptRetrieveParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<Prompt> {
    if (isRequestOptions(query)) {
      return this.retrieve(promptId, {}, query);
    }
    return this._client.get(`/v1/prompts/${promptId}`, { query, ...options });
  }

  /**
   * Update an existing prompt (increments version).
   */
  update(promptId: string, body: PromptUpdateParams, options?: Core.RequestOptions): Core.APIPromise<Prompt> {
    return this._client.put(`/v1/prompts/${promptId}`, { body, ...options });
  }

  /**
   * List all prompts.
   */
  list(options?: Core.RequestOptions): Core.APIPromise<PromptListResponse> {
    return (
      this._client.get('/v1/prompts', options) as Core.APIPromise<{ data: PromptListResponse }>
    )._thenUnwrap((obj) => obj.data);
  }

  /**
   * Delete a prompt.
   */
  delete(promptId: string, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.delete(`/v1/prompts/${promptId}`, {
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
  }

  /**
   * Set which version of a prompt should be the default in get_prompt (latest).
   */
  setDefaultVersion(
    promptId: string,
    body: PromptSetDefaultVersionParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<Prompt> {
    return this._client.put(`/v1/prompts/${promptId}/set-default-version`, { body, ...options });
  }
}

/**
 * Response model to list prompts.
 */
export interface ListPromptsResponse {
  data: PromptListResponse;
}

/**
 * A prompt resource representing a stored OpenAI Compatible prompt template in
 * OGX.
 */
export interface Prompt {
  /**
   * Unique identifier in format 'pmpt\_<48-digit-hash>'
   */
  prompt_id: string;

  /**
   * Version (integer starting at 1, incremented on save)
   */
  version: number;

  /**
   * Boolean indicating whether this version is the default version
   */
  is_default?: boolean;

  /**
   * The system prompt with variable placeholders
   */
  prompt?: string | null;

  /**
   * List of variable names that can be used in the prompt template
   */
  variables?: Array<string>;
}

export type PromptListResponse = Array<Prompt>;

export interface PromptCreateParams {
  /**
   * The prompt text content with variable placeholders.
   */
  prompt: string;

  /**
   * List of variable names that can be used in the prompt template.
   */
  variables?: Array<string> | null;
}

export interface PromptRetrieveParams {
  /**
   * The version of the prompt to get (defaults to latest).
   */
  version?: number | null;
}

export interface PromptUpdateParams {
  /**
   * The updated prompt text content.
   */
  prompt: string;

  /**
   * The current version of the prompt being updated.
   */
  version: number;

  /**
   * Set the new version as the default (default=True).
   */
  set_as_default?: boolean;

  /**
   * Updated list of variable names that can be used in the prompt template.
   */
  variables?: Array<string> | null;
}

export interface PromptSetDefaultVersionParams {
  /**
   * The version to set as default.
   */
  version: number;
}

Prompts.Versions = Versions;

export declare namespace Prompts {
  export {
    type ListPromptsResponse as ListPromptsResponse,
    type Prompt as Prompt,
    type PromptListResponse as PromptListResponse,
    type PromptCreateParams as PromptCreateParams,
    type PromptRetrieveParams as PromptRetrieveParams,
    type PromptUpdateParams as PromptUpdateParams,
    type PromptSetDefaultVersionParams as PromptSetDefaultVersionParams,
  };

  export { Versions as Versions };
}
