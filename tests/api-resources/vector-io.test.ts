// Copyright (c) Meta Platforms, Inc. and affiliates.
// All rights reserved.
//
// This source code is licensed under the terms described in the LICENSE file in
// the root directory of this source tree.
//
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import LlamaStackClient from 'llama-stack-client';
import { Response } from 'node-fetch';

const client = new LlamaStackClient({ baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010' });

describe('resource vectorIo', () => {
  test('insert: only required params', async () => {
    const responsePromise = client.vectorIo.insert({
      chunks: [
        {
          chunk_id: 'chunk_id',
          chunk_metadata: {},
          content: 'string',
          embedding: [0],
          embedding_dimension: 0,
          embedding_model: 'embedding_model',
        },
      ],
      vector_store_id: 'vector_store_id',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('insert: required and optional params', async () => {
    const response = await client.vectorIo.insert({
      chunks: [
        {
          chunk_id: 'chunk_id',
          chunk_metadata: {
            chunk_id: 'chunk_id',
            chunk_tokenizer: 'chunk_tokenizer',
            chunk_window: 'chunk_window',
            content_token_count: 0,
            created_timestamp: 0,
            document_id: 'document_id',
            metadata_token_count: 0,
            source: 'source',
            updated_timestamp: 0,
          },
          content: 'string',
          embedding: [0],
          embedding_dimension: 0,
          embedding_model: 'embedding_model',
          metadata: { foo: 'bar' },
        },
      ],
      vector_store_id: 'vector_store_id',
      ttl_seconds: 0,
    });
  });

  test('query: only required params', async () => {
    const responsePromise = client.vectorIo.query({ query: 'string', vector_store_id: 'vector_store_id' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('query: required and optional params', async () => {
    const response = await client.vectorIo.query({
      query: 'string',
      vector_store_id: 'vector_store_id',
      params: { foo: 'bar' },
    });
  });
});
