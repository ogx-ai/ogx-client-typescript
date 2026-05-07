// Copyright (c) The OGX Contributors.
// All rights reserved.
//
// This source code is licensed under the terms described in the LICENSE file in
// the root directory of this source tree.
//
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import OgxClient from 'ogx-client';
import { Response } from 'node-fetch';

const client = new OgxClient({ baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010' });

describe('resource items', () => {
  test('create: only required params', async () => {
    const responsePromise = client.conversations.items.create('conversation_id', {
      items: [
        {
          content: 'string',
          role: 'system',
          type: 'message',
        },
      ],
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('create: required and optional params', async () => {
    const response = await client.conversations.items.create('conversation_id', {
      items: [
        {
          content: 'string',
          role: 'system',
          id: 'id',
          status: 'status',
          type: 'message',
        },
      ],
    });
  });

  test('list', async () => {
    const responsePromise = client.conversations.items.list('conversation_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('list: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.conversations.items.list('conversation_id', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(OgxClient.NotFoundError);
  });

  test('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.conversations.items.list(
        'conversation_id',
        {
          after: 'after',
          include: ['web_search_call.action.sources'],
          limit: 0,
          order: 'asc',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(OgxClient.NotFoundError);
  });

  test('delete', async () => {
    const responsePromise = client.conversations.items.delete('conversation_id', 'item_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('delete: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.conversations.items.delete('conversation_id', 'item_id', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(OgxClient.NotFoundError);
  });

  test('get', async () => {
    const responsePromise = client.conversations.items.get('conversation_id', 'item_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('get: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.conversations.items.get('conversation_id', 'item_id', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(OgxClient.NotFoundError);
  });

  test('get: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.conversations.items.get(
        'conversation_id',
        'item_id',
        { include: ['web_search_call.action.sources'] },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(OgxClient.NotFoundError);
  });
});
