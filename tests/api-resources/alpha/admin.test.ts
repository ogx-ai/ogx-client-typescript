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

describe('resource admin', () => {
  test('health', async () => {
    const responsePromise = client.alpha.admin.health();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('health: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(client.alpha.admin.health({ path: '/_stainless_unknown_path' })).rejects.toThrow(
      OgxClient.NotFoundError,
    );
  });

  test('inspectProvider', async () => {
    const responsePromise = client.alpha.admin.inspectProvider('provider_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('inspectProvider: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.alpha.admin.inspectProvider('provider_id', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(OgxClient.NotFoundError);
  });

  test('listProviders', async () => {
    const responsePromise = client.alpha.admin.listProviders();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('listProviders: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(client.alpha.admin.listProviders({ path: '/_stainless_unknown_path' })).rejects.toThrow(
      OgxClient.NotFoundError,
    );
  });

  test('listRoutes', async () => {
    const responsePromise = client.alpha.admin.listRoutes();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('listRoutes: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(client.alpha.admin.listRoutes({ path: '/_stainless_unknown_path' })).rejects.toThrow(
      OgxClient.NotFoundError,
    );
  });

  test('listRoutes: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.alpha.admin.listRoutes({ api_filter: 'v1' }, { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(OgxClient.NotFoundError);
  });

  test('version', async () => {
    const responsePromise = client.alpha.admin.version();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('version: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(client.alpha.admin.version({ path: '/_stainless_unknown_path' })).rejects.toThrow(
      OgxClient.NotFoundError,
    );
  });
});
