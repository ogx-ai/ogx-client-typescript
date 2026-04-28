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

describe('resource responses', () => {
  test('create: only required params', async () => {
    const responsePromise = client.responses.create({ input: 'string', model: 'model' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('create: required and optional params', async () => {
    const response = await client.responses.create({
      input: 'string',
      model: 'model',
      background: true,
      context_management: [{ type: 'compaction', compact_threshold: 0 }],
      conversation: 'conversation',
      frequency_penalty: -2,
      guardrails: ['string'],
      include: ['web_search_call.action.sources'],
      instructions: 'instructions',
      max_infer_iters: 1,
      max_output_tokens: 16,
      max_tool_calls: 1,
      metadata: { foo: 'string' },
      parallel_tool_calls: true,
      presence_penalty: -2,
      previous_response_id: 'previous_response_id',
      prompt: {
        id: 'id',
        variables: { foo: { text: 'text', type: 'input_text' } },
        version: 'version',
      },
      prompt_cache_key: 'prompt_cache_key',
      reasoning: { effort: 'none', summary: 'auto' },
      safety_identifier: 'safety_identifier',
      service_tier: 'auto',
      store: true,
      stream: false,
      stream_options: { include_obfuscation: true },
      temperature: 0,
      text: {
        format: {
          description: 'description',
          name: 'name',
          schema: { foo: 'bar' },
          strict: true,
          type: 'text',
        },
        verbosity: 'low',
      },
      tool_choice: 'auto',
      tools: [{ search_context_size: 'S?oC"high', type: 'web_search' }],
      top_logprobs: 0,
      top_p: 0,
      truncation: 'auto',
    });
  });

  test('retrieve', async () => {
    const responsePromise = client.responses.retrieve('response_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('retrieve: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.responses.retrieve('response_id', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(OgxClient.NotFoundError);
  });

  test('list', async () => {
    const responsePromise = client.responses.list();
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
    await expect(client.responses.list({ path: '/_stainless_unknown_path' })).rejects.toThrow(
      OgxClient.NotFoundError,
    );
  });

  test('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.responses.list(
        {
          after: 'after',
          limit: 0,
          model: 'model',
          order: 'asc',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(OgxClient.NotFoundError);
  });

  test('delete', async () => {
    const responsePromise = client.responses.delete('response_id');
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
      client.responses.delete('response_id', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(OgxClient.NotFoundError);
  });

  test('compact: only required params', async () => {
    const responsePromise = client.responses.compact({ model: 'model' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('compact: required and optional params', async () => {
    const response = await client.responses.compact({
      model: 'model',
      input: 'string',
      instructions: 'instructions',
      parallel_tool_calls: true,
      previous_response_id: 'previous_response_id',
      prompt_cache_key: 'prompt_cache_key',
      reasoning: { effort: 'none', summary: 'auto' },
      text: {
        format: {
          description: 'description',
          name: 'name',
          schema: { foo: 'bar' },
          strict: true,
          type: 'text',
        },
        verbosity: 'low',
      },
      tools: [{ search_context_size: 'S?oC"high', type: 'web_search' }],
    });
  });
});
