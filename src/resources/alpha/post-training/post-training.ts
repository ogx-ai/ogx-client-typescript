// Copyright (c) Meta Platforms, Inc. and affiliates.
// All rights reserved.
//
// This source code is licensed under the terms described in the LICENSE file in
// the root directory of this source tree.
//
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../resource';
import * as Core from '../../../core';
import * as JobAPI from './job';
import { Job, JobArtifactsResponse, JobListResponse, JobStatusResponse } from './job';

export class PostTraining extends APIResource {
  job: JobAPI.Job = new JobAPI.Job(this._client);

  /**
   * Run preference optimization of a model.
   */
  preferenceOptimize(
    body: PostTrainingPreferenceOptimizeParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<PostTrainingJob> {
    return this._client.post('/v1alpha/post-training/preference-optimize', { body, ...options });
  }

  /**
   * Run supervised fine-tuning of a model.
   */
  supervisedFineTune(
    body: PostTrainingSupervisedFineTuneParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<PostTrainingJob> {
    return this._client.post('/v1alpha/post-training/supervised-fine-tune', { body, ...options });
  }
}

/**
 * Configuration for Low-Rank Adaptation (LoRA) fine-tuning.
 */
export type AlgorithmConfig = AlgorithmConfig.LoraFinetuningConfig | AlgorithmConfig.QatFinetuningConfig;

export namespace AlgorithmConfig {
  /**
   * Configuration for Low-Rank Adaptation (LoRA) fine-tuning.
   */
  export interface LoraFinetuningConfig {
    alpha: number;

    apply_lora_to_mlp: boolean;

    apply_lora_to_output: boolean;

    lora_attn_modules: Array<string>;

    rank: number;

    quantize_base?: boolean | null;

    type?: 'LoRA';

    use_dora?: boolean | null;
  }

  /**
   * Configuration for Quantization-Aware Training (QAT) fine-tuning.
   */
  export interface QatFinetuningConfig {
    group_size: number;

    quantizer_name: string;

    type?: 'QAT';
  }
}

export interface ListPostTrainingJobsResponse {
  data: JobAPI.JobListResponse;
}

export interface PostTrainingJob {
  job_uuid: string;
}

export interface PostTrainingPreferenceOptimizeParams {
  /**
   * The algorithm configuration.
   */
  algorithm_config: PostTrainingPreferenceOptimizeParams.AlgorithmConfig;

  /**
   * The model to fine-tune.
   */
  finetuned_model: string;

  /**
   * The hyperparam search configuration.
   */
  hyperparam_search_config: { [key: string]: unknown };

  /**
   * The UUID of the job to create.
   */
  job_uuid: string;

  /**
   * The logger configuration.
   */
  logger_config: { [key: string]: unknown };

  /**
   * The training configuration.
   */
  training_config: PostTrainingPreferenceOptimizeParams.TrainingConfig;
}

export namespace PostTrainingPreferenceOptimizeParams {
  /**
   * The algorithm configuration.
   */
  export interface AlgorithmConfig {
    beta: number;

    loss_type?: 'sigmoid' | 'hinge' | 'ipo' | 'kto_pair';
  }

  /**
   * The training configuration.
   */
  export interface TrainingConfig {
    n_epochs: number;

    /**
     * Configuration for training data and data loading.
     */
    data_config?: TrainingConfig.DataConfig | null;

    dtype?: string | null;

    /**
     * Configuration for memory and compute efficiency optimizations.
     */
    efficiency_config?: TrainingConfig.EfficiencyConfig | null;

    gradient_accumulation_steps?: number;

    max_steps_per_epoch?: number;

    max_validation_steps?: number | null;

    /**
     * Configuration parameters for the optimization algorithm.
     */
    optimizer_config?: TrainingConfig.OptimizerConfig | null;
  }

  export namespace TrainingConfig {
    /**
     * Configuration for training data and data loading.
     */
    export interface DataConfig {
      batch_size: number;

      /**
       * Format of the training dataset.
       */
      data_format: 'instruct' | 'dialog';

      dataset_id: string;

      shuffle: boolean;

      packed?: boolean | null;

      train_on_input?: boolean | null;

      validation_dataset_id?: string | null;
    }

    /**
     * Configuration for memory and compute efficiency optimizations.
     */
    export interface EfficiencyConfig {
      enable_activation_checkpointing?: boolean | null;

      enable_activation_offloading?: boolean | null;

      fsdp_cpu_offload?: boolean | null;

      memory_efficient_fsdp_wrap?: boolean | null;
    }

    /**
     * Configuration parameters for the optimization algorithm.
     */
    export interface OptimizerConfig {
      lr: number;

      num_warmup_steps: number;

      /**
       * Available optimizer algorithms for training.
       */
      optimizer_type: 'adam' | 'adamw' | 'sgd';

      weight_decay: number;
    }
  }
}

export interface PostTrainingSupervisedFineTuneParams {
  /**
   * The hyperparam search configuration.
   */
  hyperparam_search_config: { [key: string]: unknown };

  /**
   * The UUID of the job to create.
   */
  job_uuid: string;

  /**
   * The logger configuration.
   */
  logger_config: { [key: string]: unknown };

  /**
   * The training configuration.
   */
  training_config: PostTrainingSupervisedFineTuneParams.TrainingConfig;

  /**
   * The algorithm configuration.
   */
  algorithm_config?:
    | PostTrainingSupervisedFineTuneParams.LoraFinetuningConfig
    | PostTrainingSupervisedFineTuneParams.QatFinetuningConfig
    | null;

  /**
   * The directory to save checkpoint(s) to.
   */
  checkpoint_dir?: string | null;

  /**
   * Model descriptor for training if not in provider config
   */
  model?: string | null;
}

export namespace PostTrainingSupervisedFineTuneParams {
  /**
   * The training configuration.
   */
  export interface TrainingConfig {
    n_epochs: number;

    /**
     * Configuration for training data and data loading.
     */
    data_config?: TrainingConfig.DataConfig | null;

    dtype?: string | null;

    /**
     * Configuration for memory and compute efficiency optimizations.
     */
    efficiency_config?: TrainingConfig.EfficiencyConfig | null;

    gradient_accumulation_steps?: number;

    max_steps_per_epoch?: number;

    max_validation_steps?: number | null;

    /**
     * Configuration parameters for the optimization algorithm.
     */
    optimizer_config?: TrainingConfig.OptimizerConfig | null;
  }

  export namespace TrainingConfig {
    /**
     * Configuration for training data and data loading.
     */
    export interface DataConfig {
      batch_size: number;

      /**
       * Format of the training dataset.
       */
      data_format: 'instruct' | 'dialog';

      dataset_id: string;

      shuffle: boolean;

      packed?: boolean | null;

      train_on_input?: boolean | null;

      validation_dataset_id?: string | null;
    }

    /**
     * Configuration for memory and compute efficiency optimizations.
     */
    export interface EfficiencyConfig {
      enable_activation_checkpointing?: boolean | null;

      enable_activation_offloading?: boolean | null;

      fsdp_cpu_offload?: boolean | null;

      memory_efficient_fsdp_wrap?: boolean | null;
    }

    /**
     * Configuration parameters for the optimization algorithm.
     */
    export interface OptimizerConfig {
      lr: number;

      num_warmup_steps: number;

      /**
       * Available optimizer algorithms for training.
       */
      optimizer_type: 'adam' | 'adamw' | 'sgd';

      weight_decay: number;
    }
  }

  /**
   * Configuration for Low-Rank Adaptation (LoRA) fine-tuning.
   */
  export interface LoraFinetuningConfig {
    alpha: number;

    apply_lora_to_mlp: boolean;

    apply_lora_to_output: boolean;

    lora_attn_modules: Array<string>;

    rank: number;

    quantize_base?: boolean | null;

    type?: 'LoRA';

    use_dora?: boolean | null;
  }

  /**
   * Configuration for Quantization-Aware Training (QAT) fine-tuning.
   */
  export interface QatFinetuningConfig {
    group_size: number;

    quantizer_name: string;

    type?: 'QAT';
  }
}

PostTraining.Job = Job;

export declare namespace PostTraining {
  export {
    type AlgorithmConfig as AlgorithmConfig,
    type ListPostTrainingJobsResponse as ListPostTrainingJobsResponse,
    type PostTrainingJob as PostTrainingJob,
    type PostTrainingPreferenceOptimizeParams as PostTrainingPreferenceOptimizeParams,
    type PostTrainingSupervisedFineTuneParams as PostTrainingSupervisedFineTuneParams,
  };

  export {
    Job as Job,
    type JobListResponse as JobListResponse,
    type JobArtifactsResponse as JobArtifactsResponse,
    type JobStatusResponse as JobStatusResponse,
  };
}
