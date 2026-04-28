// Copyright (c) The OGX Contributors.
// All rights reserved.
//
// This source code is licensed under the terms described in the LICENSE file in
// the root directory of this source tree.

//
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { AbstractPage, Response, APIClient, FinalRequestOptions, PageInfo } from './core';

export interface OpenAICursorPageResponse<Item> {
  data: Array<Item>;

  has_more: boolean;

  last_id: string;
}

export interface OpenAICursorPageParams {
  limit?: number;

  after?: string;
}

export class OpenAICursorPage<Item> extends AbstractPage<Item> implements OpenAICursorPageResponse<Item> {
  data: Array<Item>;

  has_more: boolean;

  last_id: string;

  constructor(
    client: APIClient,
    response: Response,
    body: OpenAICursorPageResponse<Item>,
    options: FinalRequestOptions,
  ) {
    super(client, response, body, options);

    this.data = body.data || [];
    this.has_more = body.has_more || false;
    this.last_id = body.last_id || '';
  }

  getPaginatedItems(): Item[] {
    return this.data ?? [];
  }

  override hasNextPage(): boolean {
    if (this.has_more === false) {
      return false;
    }

    return super.hasNextPage();
  }

  // @deprecated Please use `nextPageInfo()` instead
  nextPageParams(): Partial<OpenAICursorPageParams> | null {
    const info = this.nextPageInfo();
    if (!info) return null;
    if ('params' in info) return info.params;
    const params = Object.fromEntries(info.url.searchParams);
    if (!Object.keys(params).length) return null;
    return params;
  }

  nextPageInfo(): PageInfo | null {
    const cursor = this.last_id;
    if (!cursor) {
      return null;
    }

    return {
      params: {
        after: cursor,
      },
    };
  }
}
