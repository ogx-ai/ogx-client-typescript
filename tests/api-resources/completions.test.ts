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

describe('resource completions', () => {
  test('create: only required params', async () => {
    const responsePromise = client.completions.create({ model: 'model', prompt: 'string' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('create: required and optional params', async () => {
    const response = await client.completions.create({
      model: 'model',
      prompt: 'string',
      best_of: 1,
      echo: true,
      frequency_penalty: -2,
      logit_bias: { foo: 0 },
      logprobs: 0,
      max_tokens: 1,
      n: 1,
      presence_penalty: -2,
      seed: 0,
      stop: 'string',
      stream: false,
      stream_options: { foo: 'bar' },
      suffix: 'suffix',
      temperature: 0,
      top_p: 0,
      user: 'user',
    });
  });
});
