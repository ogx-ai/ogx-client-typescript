// Copyright (c) Meta Platforms, Inc. and affiliates.
// All rights reserved.
//
// This source code is licensed under the terms described in the LICENSE file in
// the root directory of this source tree.

import { getResponseOutputText } from 'ogx-client';
import { createResponseHeaders } from 'ogx-client/core';
import { Headers } from 'ogx-client/_shims/index';

describe('response parsing', () => {
  // TODO: test unicode characters
  test('headers are case agnostic', async () => {
    const headers = createResponseHeaders(new Headers({ 'Content-Type': 'foo', Accept: 'text/plain' }));
    expect(headers['content-type']).toEqual('foo');
    expect(headers['Content-type']).toEqual('foo');
    expect(headers['Content-Type']).toEqual('foo');
    expect(headers['accept']).toEqual('text/plain');
    expect(headers['Accept']).toEqual('text/plain');
    expect(headers['Hello-World']).toBeUndefined();
  });

  test('duplicate headers are concatenated', () => {
    const headers = createResponseHeaders(
      new Headers([
        ['Content-Type', 'text/xml'],
        ['Content-Type', 'application/json'],
      ]),
    );
    expect(headers['content-type']).toBe('text/xml, application/json');
  });
});

describe('getResponseOutputText helper', () => {
  test('can be imported from package entry point and concatenates text', () => {
    const response = {
      id: 'resp_123',
      created_at: 0,
      model: 'llama-example',
      status: 'completed',
      output: [
        {
          type: 'message',
          role: 'assistant',
          content: [
            { type: 'output_text', text: 'Hello ' },
            { type: 'output_text', text: 'world' },
          ],
        },
        {
          type: 'message',
          role: 'assistant',
          content: '!',
        },
      ],
    };

    expect(getResponseOutputText(response as any)).toBe('Hello world!');
  });
});

describe('getResponseOutputText package export', () => {
  test('allows streaming responses to be flattened when imported from llama-stack-client', () => {
    const response = {
      id: 'resp_stream',
      created_at: 0,
      model: 'llama-example',
      status: 'completed',
      output: [
        {
          type: 'message',
          role: 'assistant',
          content: [
            'Streaming ',
            { type: 'output_text', text: 'chunks ' },
            { type: 'output_text', text: 'are ' },
            { type: 'output_text', text: 'supported.' },
          ],
        },
        {
          type: 'message',
          role: 'assistant',
          content: ' Enjoy!',
        },
      ],
    };

    expect(typeof getResponseOutputText).toBe('function');
    expect(getResponseOutputText(response as any)).toBe('Streaming chunks are supported. Enjoy!');
  });
});
