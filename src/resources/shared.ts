// Copyright (c) The OGX Contributors.
// All rights reserved.
//
// This source code is licensed under the terms described in the LICENSE file in
// the root directory of this source tree.
//
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import * as ProvidersAPI from './providers';
import * as RoutesAPI from './routes';

/**
 * Health status information for the service.
 */
export interface HealthInfo {
  /**
   * The health status of the service
   */
  status: 'OK' | 'Error' | 'Not Implemented';
}

/**
 * A image content item
 */
export type InterleavedContent =
  | string
  | InterleavedContent.ImageContentItem
  | InterleavedContent.TextContentItem
  | Array<InterleavedContent.ImageContentItem | InterleavedContent.TextContentItem>;

export namespace InterleavedContent {
  /**
   * A image content item
   */
  export interface ImageContentItem {
    /**
     * A URL or a base64 encoded string
     */
    image: ImageContentItem.Image;

    type?: 'image';
  }

  export namespace ImageContentItem {
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
  export interface ImageContentItem {
    /**
     * A URL or a base64 encoded string
     */
    image: ImageContentItem.Image;

    type?: 'image';
  }

  export namespace ImageContentItem {
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

/**
 * A image content item
 */
export type InterleavedContentItem =
  | InterleavedContentItem.ImageContentItem
  | InterleavedContentItem.TextContentItem;

export namespace InterleavedContentItem {
  /**
   * A image content item
   */
  export interface ImageContentItem {
    /**
     * A URL or a base64 encoded string
     */
    image: ImageContentItem.Image;

    type?: 'image';
  }

  export namespace ImageContentItem {
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

/**
 * Response containing a list of all available providers.
 */
export interface ListProvidersResponse {
  /**
   * List of provider information objects
   */
  data: ProvidersAPI.ProviderListResponse;
}

/**
 * Response containing a list of all available API routes.
 */
export interface ListRoutesResponse {
  /**
   * List of available API routes
   */
  data: RoutesAPI.RouteListResponse;
}

/**
 * Parameter type for string values.
 */
export type ParamType =
  | ParamType.StringType
  | ParamType.NumberType
  | ParamType.BooleanType
  | ParamType.ArrayType
  | ParamType.ObjectType
  | ParamType.JsonType
  | ParamType.UnionType
  | ParamType.ChatCompletionInputType
  | ParamType.CompletionInputType;

export namespace ParamType {
  /**
   * Parameter type for string values.
   */
  export interface StringType {
    type?: 'string';
  }

  /**
   * Parameter type for numeric values.
   */
  export interface NumberType {
    type?: 'number';
  }

  /**
   * Parameter type for boolean values.
   */
  export interface BooleanType {
    type?: 'boolean';
  }

  /**
   * Parameter type for array values.
   */
  export interface ArrayType {
    type?: 'array';
  }

  /**
   * Parameter type for object values.
   */
  export interface ObjectType {
    type?: 'object';
  }

  /**
   * Parameter type for JSON values.
   */
  export interface JsonType {
    type?: 'json';
  }

  /**
   * Parameter type for union values.
   */
  export interface UnionType {
    type?: 'union';
  }

  /**
   * Parameter type for chat completion input.
   */
  export interface ChatCompletionInputType {
    type?: 'chat_completion_input';
  }

  /**
   * Parameter type for completion input.
   */
  export interface CompletionInputType {
    type?: 'completion_input';
  }
}

/**
 * Information about a registered provider including its configuration and health
 * status.
 */
export interface ProviderInfo {
  /**
   * The API name this provider implements
   */
  api: string;

  /**
   * Configuration parameters for the provider
   */
  config: { [key: string]: unknown };

  /**
   * Current health status of the provider
   */
  health: { [key: string]: unknown };

  /**
   * Unique identifier for the provider
   */
  provider_id: string;

  /**
   * The type of provider implementation
   */
  provider_type: string;
}

/**
 * Information about an API route including its path, method, and implementing
 * providers.
 */
export interface RouteInfo {
  /**
   * The HTTP method for the route
   */
  method: string;

  /**
   * List of provider types implementing this route
   */
  provider_types: Array<string>;

  /**
   * The API route path
   */
  route: string;
}

/**
 * Details of a safety violation detected by content moderation.
 */
export interface SafetyViolation {
  /**
   * Severity level of the violation
   */
  violation_level: 'info' | 'warn' | 'error';

  /**
   * Additional metadata including specific violation codes
   */
  metadata?: { [key: string]: unknown };

  /**
   * Message to convey to the user about the violation
   */
  user_message?: string | null;
}

/**
 * Sampling parameters for text generation.
 */
export interface SamplingParams {
  /**
   * The maximum number of tokens that can be generated in the completion. The token
   * count of your prompt plus max_tokens cannot exceed the model's context length.
   */
  max_tokens?: number | null;

  /**
   * Number between -2.0 and 2.0. Positive values penalize new tokens based on
   * whether they appear in the text so far.
   */
  repetition_penalty?: number | null;

  /**
   * Up to 4 sequences where the API will stop generating further tokens. The
   * returned text will not contain the stop sequence.
   */
  stop?: Array<string> | null;

  /**
   * The sampling strategy to use.
   */
  strategy?:
    | SamplingParams.GreedySamplingStrategy
    | SamplingParams.TopPSamplingStrategy
    | SamplingParams.TopKSamplingStrategy;
}

export namespace SamplingParams {
  /**
   * Greedy sampling strategy that selects the highest probability token at each
   * step.
   */
  export interface GreedySamplingStrategy {
    /**
     * Must be 'greedy' to identify this sampling strategy.
     */
    type?: 'greedy';
  }

  /**
   * Top-p (nucleus) sampling strategy that samples from the smallest set of tokens
   * with cumulative probability >= p.
   */
  export interface TopPSamplingStrategy {
    /**
     * Controls randomness in sampling. Higher values increase randomness.
     */
    temperature: number;

    /**
     * Cumulative probability threshold for nucleus sampling.
     */
    top_p?: number;

    /**
     * Must be 'top_p' to identify this sampling strategy.
     */
    type?: 'top_p';
  }

  /**
   * Top-k sampling strategy that restricts sampling to the k most likely tokens.
   */
  export interface TopKSamplingStrategy {
    /**
     * Number of top tokens to consider for sampling. Must be at least 1.
     */
    top_k: number;

    /**
     * Must be 'top_k' to identify this sampling strategy.
     */
    type?: 'top_k';
  }
}

/**
 * A system message providing instructions or context to the model.
 */
export interface SystemMessage {
  /**
   * The content of the 'system prompt'. If multiple system messages are provided,
   * they are concatenated. The underlying OGX code may also add other system
   * messages.
   */
  content:
    | string
    | SystemMessage.ImageContentItem
    | SystemMessage.TextContentItem
    | Array<SystemMessage.ImageContentItem | SystemMessage.TextContentItem>;

  /**
   * Must be 'system' to identify this as a system message.
   */
  role?: 'system';
}

export namespace SystemMessage {
  /**
   * A image content item
   */
  export interface ImageContentItem {
    /**
     * A URL or a base64 encoded string
     */
    image: ImageContentItem.Image;

    type?: 'image';
  }

  export namespace ImageContentItem {
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
  export interface ImageContentItem {
    /**
     * A URL or a base64 encoded string
     */
    image: ImageContentItem.Image;

    type?: 'image';
  }

  export namespace ImageContentItem {
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

/**
 * Version information for the service.
 */
export interface VersionInfo {
  /**
   * The version string of the service
   */
  version: string;
}
