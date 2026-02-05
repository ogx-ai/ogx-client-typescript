// Copyright (c) Meta Platforms, Inc. and affiliates.
// All rights reserved.
//
// This source code is licensed under the terms described in the LICENSE file in
// the root directory of this source tree.
//
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';

export class VectorIo extends APIResource {
  /**
   * Insert embedded chunks into a vector database.
   */
  insert(body: VectorIoInsertParams, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.post('/v1/vector-io/insert', {
      body,
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
  }

  /**
   * Query chunks from a vector database.
   */
  query(body: VectorIoQueryParams, options?: Core.RequestOptions): Core.APIPromise<QueryChunksResponse> {
    return this._client.post('/v1/vector-io/query', { body, ...options });
  }
}

/**
 * Response from querying chunks in a vector database.
 */
export interface QueryChunksResponse {
  chunks: Array<QueryChunksResponse.Chunk>;

  scores: Array<number>;
}

export namespace QueryChunksResponse {
  /**
   * A chunk of content with its embedding vector for vector database operations.
   * Inherits all fields from Chunk and adds embedding-related fields.
   */
  export interface Chunk {
    chunk_id: string;

    /**
     * `ChunkMetadata` is backend metadata for a `Chunk` that is used to store
     * additional information about the chunk that will not be used in the context
     * during inference, but is required for backend functionality. The `ChunkMetadata`
     * is set during chunk creation in `MemoryToolRuntimeImpl().insert()`and is not
     * expected to change after. Use `Chunk.metadata` for metadata that will be used in
     * the context during inference.
     */
    chunk_metadata: Chunk.ChunkMetadata;

    /**
     * A image content item
     */
    content:
      | string
      | Chunk.ImageContentItemOutput
      | Chunk.TextContentItem
      | Array<Chunk.ImageContentItemOutput | Chunk.TextContentItem>;

    embedding: Array<number>;

    embedding_dimension: number;

    embedding_model: string;

    metadata?: { [key: string]: unknown };
  }

  export namespace Chunk {
    /**
     * `ChunkMetadata` is backend metadata for a `Chunk` that is used to store
     * additional information about the chunk that will not be used in the context
     * during inference, but is required for backend functionality. The `ChunkMetadata`
     * is set during chunk creation in `MemoryToolRuntimeImpl().insert()`and is not
     * expected to change after. Use `Chunk.metadata` for metadata that will be used in
     * the context during inference.
     */
    export interface ChunkMetadata {
      chunk_id?: string | null;

      chunk_tokenizer?: string | null;

      chunk_window?: string | null;

      content_token_count?: number | null;

      created_timestamp?: number | null;

      document_id?: string | null;

      metadata_token_count?: number | null;

      source?: string | null;

      updated_timestamp?: number | null;
    }

    /**
     * A image content item
     */
    export interface ImageContentItemOutput {
      /**
       * A URL or a base64 encoded string
       */
      image: ImageContentItemOutput.Image;

      type?: 'image';
    }

    export namespace ImageContentItemOutput {
      /**
       * A URL or a base64 encoded string
       */
      export interface Image {
        data?: string | null;

        /**
         * A URL reference to external content.
         */
        url?: Image.URL | null;
      }

      export namespace Image {
        /**
         * A URL reference to external content.
         */
        export interface URL {
          uri: string;
        }
      }
    }

    /**
     * A text content item
     */
    export interface TextContentItem {
      text: string;

      type?: 'text';
    }

    /**
     * A image content item
     */
    export interface ImageContentItemOutput {
      /**
       * A URL or a base64 encoded string
       */
      image: ImageContentItemOutput.Image;

      type?: 'image';
    }

    export namespace ImageContentItemOutput {
      /**
       * A URL or a base64 encoded string
       */
      export interface Image {
        data?: string | null;

        /**
         * A URL reference to external content.
         */
        url?: Image.URL | null;
      }

      export namespace Image {
        /**
         * A URL reference to external content.
         */
        export interface URL {
          uri: string;
        }
      }
    }

    /**
     * A text content item
     */
    export interface TextContentItem {
      text: string;

      type?: 'text';
    }
  }
}

export interface VectorIoInsertParams {
  /**
   * The list of embedded chunks to insert.
   */
  chunks: Array<VectorIoInsertParams.Chunk>;

  /**
   * The ID of the vector store to insert chunks into.
   */
  vector_store_id: string;

  /**
   * Time-to-live in seconds for the inserted chunks.
   */
  ttl_seconds?: number | null;
}

export namespace VectorIoInsertParams {
  /**
   * A chunk of content with its embedding vector for vector database operations.
   * Inherits all fields from Chunk and adds embedding-related fields.
   */
  export interface Chunk {
    chunk_id: string;

    /**
     * `ChunkMetadata` is backend metadata for a `Chunk` that is used to store
     * additional information about the chunk that will not be used in the context
     * during inference, but is required for backend functionality. The `ChunkMetadata`
     * is set during chunk creation in `MemoryToolRuntimeImpl().insert()`and is not
     * expected to change after. Use `Chunk.metadata` for metadata that will be used in
     * the context during inference.
     */
    chunk_metadata: Chunk.ChunkMetadata;

    /**
     * A image content item
     */
    content:
      | string
      | Chunk.ImageContentItemInput
      | Chunk.TextContentItem
      | Array<Chunk.ImageContentItemInput | Chunk.TextContentItem>;

    embedding: Array<number>;

    embedding_dimension: number;

    embedding_model: string;

    metadata?: { [key: string]: unknown };
  }

  export namespace Chunk {
    /**
     * `ChunkMetadata` is backend metadata for a `Chunk` that is used to store
     * additional information about the chunk that will not be used in the context
     * during inference, but is required for backend functionality. The `ChunkMetadata`
     * is set during chunk creation in `MemoryToolRuntimeImpl().insert()`and is not
     * expected to change after. Use `Chunk.metadata` for metadata that will be used in
     * the context during inference.
     */
    export interface ChunkMetadata {
      chunk_id?: string | null;

      chunk_tokenizer?: string | null;

      chunk_window?: string | null;

      content_token_count?: number | null;

      created_timestamp?: number | null;

      document_id?: string | null;

      metadata_token_count?: number | null;

      source?: string | null;

      updated_timestamp?: number | null;
    }

    /**
     * A image content item
     */
    export interface ImageContentItemInput {
      /**
       * A URL or a base64 encoded string
       */
      image: ImageContentItemInput.Image;

      type?: 'image';
    }

    export namespace ImageContentItemInput {
      /**
       * A URL or a base64 encoded string
       */
      export interface Image {
        data?: string | null;

        /**
         * A URL reference to external content.
         */
        url?: Image.URL | null;
      }

      export namespace Image {
        /**
         * A URL reference to external content.
         */
        export interface URL {
          uri: string;
        }
      }
    }

    /**
     * A text content item
     */
    export interface TextContentItem {
      text: string;

      type?: 'text';
    }

    /**
     * A image content item
     */
    export interface ImageContentItemInput {
      /**
       * A URL or a base64 encoded string
       */
      image: ImageContentItemInput.Image;

      type?: 'image';
    }

    export namespace ImageContentItemInput {
      /**
       * A URL or a base64 encoded string
       */
      export interface Image {
        data?: string | null;

        /**
         * A URL reference to external content.
         */
        url?: Image.URL | null;
      }

      export namespace Image {
        /**
         * A URL reference to external content.
         */
        export interface URL {
          uri: string;
        }
      }
    }

    /**
     * A text content item
     */
    export interface TextContentItem {
      text: string;

      type?: 'text';
    }
  }
}

export interface VectorIoQueryParams {
  /**
   * The query content to search for.
   */
  query:
    | string
    | VectorIoQueryParams.ImageContentItemInput
    | VectorIoQueryParams.TextContentItem
    | Array<VectorIoQueryParams.ImageContentItemInput | VectorIoQueryParams.TextContentItem>;

  /**
   * The ID of the vector store to query.
   */
  vector_store_id: string;

  /**
   * Additional query parameters.
   */
  params?: { [key: string]: unknown } | null;
}

export namespace VectorIoQueryParams {
  /**
   * A image content item
   */
  export interface ImageContentItemInput {
    /**
     * A URL or a base64 encoded string
     */
    image: ImageContentItemInput.Image;

    type?: 'image';
  }

  export namespace ImageContentItemInput {
    /**
     * A URL or a base64 encoded string
     */
    export interface Image {
      data?: string | null;

      /**
       * A URL reference to external content.
       */
      url?: Image.URL | null;
    }

    export namespace Image {
      /**
       * A URL reference to external content.
       */
      export interface URL {
        uri: string;
      }
    }
  }

  /**
   * A text content item
   */
  export interface TextContentItem {
    text: string;

    type?: 'text';
  }

  /**
   * A image content item
   */
  export interface ImageContentItemInput {
    /**
     * A URL or a base64 encoded string
     */
    image: ImageContentItemInput.Image;

    type?: 'image';
  }

  export namespace ImageContentItemInput {
    /**
     * A URL or a base64 encoded string
     */
    export interface Image {
      data?: string | null;

      /**
       * A URL reference to external content.
       */
      url?: Image.URL | null;
    }

    export namespace Image {
      /**
       * A URL reference to external content.
       */
      export interface URL {
        uri: string;
      }
    }
  }

  /**
   * A text content item
   */
  export interface TextContentItem {
    text: string;

    type?: 'text';
  }
}

export declare namespace VectorIo {
  export {
    type QueryChunksResponse as QueryChunksResponse,
    type VectorIoInsertParams as VectorIoInsertParams,
    type VectorIoQueryParams as VectorIoQueryParams,
  };
}
