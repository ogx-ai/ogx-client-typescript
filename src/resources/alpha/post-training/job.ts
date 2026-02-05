// Copyright (c) Meta Platforms, Inc. and affiliates.
// All rights reserved.
//
// This source code is licensed under the terms described in the LICENSE file in
// the root directory of this source tree.
//
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../resource';
import * as Core from '../../../core';
import * as PostTrainingAPI from './post-training';

export class Job extends APIResource {
  /**
   * Get all training jobs.
   */
  list(options?: Core.RequestOptions): Core.APIPromise<JobListResponse> {
    return (
      this._client.get('/v1alpha/post-training/jobs', options) as Core.APIPromise<{ data: JobListResponse }>
    )._thenUnwrap((obj) => obj.data);
  }

  /**
   * Get the artifacts of a training job.
   */
  artifacts(options?: Core.RequestOptions): Core.APIPromise<JobArtifactsResponse> {
    return this._client.get('/v1alpha/post-training/job/artifacts', options);
  }

  /**
   * Cancel a training job.
   */
  cancel(options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.post('/v1alpha/post-training/job/cancel', {
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
  }

  /**
   * Get the status of a training job.
   */
  status(options?: Core.RequestOptions): Core.APIPromise<JobStatusResponse> {
    return this._client.get('/v1alpha/post-training/job/status', options);
  }
}

export type JobListResponse = Array<PostTrainingAPI.PostTrainingJob>;

/**
 * Artifacts of a finetuning job.
 */
export interface JobArtifactsResponse {
  job_uuid: string;

  checkpoints?: Array<JobArtifactsResponse.Checkpoint>;
}

export namespace JobArtifactsResponse {
  /**
   * Checkpoint created during training runs.
   */
  export interface Checkpoint {
    created_at: string;

    epoch: number;

    identifier: string;

    path: string;

    post_training_job_id: string;

    /**
     * Training metrics captured during post-training jobs.
     */
    training_metrics?: Checkpoint.TrainingMetrics | null;
  }

  export namespace Checkpoint {
    /**
     * Training metrics captured during post-training jobs.
     */
    export interface TrainingMetrics {
      epoch: number;

      perplexity: number;

      train_loss: number;

      validation_loss: number;
    }
  }
}

/**
 * Status of a finetuning job.
 */
export interface JobStatusResponse {
  job_uuid: string;

  /**
   * Status of a job execution.
   */
  status: 'completed' | 'in_progress' | 'failed' | 'scheduled' | 'cancelled';

  checkpoints?: Array<JobStatusResponse.Checkpoint>;

  completed_at?: string | null;

  resources_allocated?: { [key: string]: unknown } | null;

  scheduled_at?: string | null;

  started_at?: string | null;
}

export namespace JobStatusResponse {
  /**
   * Checkpoint created during training runs.
   */
  export interface Checkpoint {
    created_at: string;

    epoch: number;

    identifier: string;

    path: string;

    post_training_job_id: string;

    /**
     * Training metrics captured during post-training jobs.
     */
    training_metrics?: Checkpoint.TrainingMetrics | null;
  }

  export namespace Checkpoint {
    /**
     * Training metrics captured during post-training jobs.
     */
    export interface TrainingMetrics {
      epoch: number;

      perplexity: number;

      train_loss: number;

      validation_loss: number;
    }
  }
}

export declare namespace Job {
  export {
    type JobListResponse as JobListResponse,
    type JobArtifactsResponse as JobArtifactsResponse,
    type JobStatusResponse as JobStatusResponse,
  };
}
