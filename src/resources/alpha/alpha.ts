// Copyright (c) Meta Platforms, Inc. and affiliates.
// All rights reserved.
//
// This source code is licensed under the terms described in the LICENSE file in
// the root directory of this source tree.
//
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as AdminAPI from './admin';
import { Admin, AdminListRoutesParams } from './admin';
import * as BenchmarksAPI from './benchmarks';
import {
  Benchmark,
  BenchmarkListResponse,
  BenchmarkRegisterParams,
  Benchmarks,
  ListBenchmarksResponse,
} from './benchmarks';
import * as InferenceAPI from './inference';
import { Inference, InferenceRerankParams, InferenceRerankResponse } from './inference';
import * as EvalAPI from './eval/eval';
import {
  BenchmarkConfig,
  Eval,
  EvalEvaluateRowsAlphaParams,
  EvalEvaluateRowsParams,
  EvalRunEvalAlphaParams,
  EvalRunEvalParams,
  EvaluateResponse,
  Job,
} from './eval/eval';

export class Alpha extends APIResource {
  benchmarks: BenchmarksAPI.Benchmarks = new BenchmarksAPI.Benchmarks(this._client);
  eval: EvalAPI.Eval = new EvalAPI.Eval(this._client);
  admin: AdminAPI.Admin = new AdminAPI.Admin(this._client);
  inference: InferenceAPI.Inference = new InferenceAPI.Inference(this._client);
}

Alpha.Benchmarks = Benchmarks;
Alpha.Eval = Eval;
Alpha.Admin = Admin;
Alpha.Inference = Inference;

export declare namespace Alpha {
  export {
    Benchmarks as Benchmarks,
    type Benchmark as Benchmark,
    type ListBenchmarksResponse as ListBenchmarksResponse,
    type BenchmarkListResponse as BenchmarkListResponse,
    type BenchmarkRegisterParams as BenchmarkRegisterParams,
  };

  export {
    Eval as Eval,
    type BenchmarkConfig as BenchmarkConfig,
    type EvaluateResponse as EvaluateResponse,
    type Job as Job,
    type EvalEvaluateRowsParams as EvalEvaluateRowsParams,
    type EvalEvaluateRowsAlphaParams as EvalEvaluateRowsAlphaParams,
    type EvalRunEvalParams as EvalRunEvalParams,
    type EvalRunEvalAlphaParams as EvalRunEvalAlphaParams,
  };

  export { Admin as Admin, type AdminListRoutesParams as AdminListRoutesParams };

  export {
    Inference as Inference,
    type InferenceRerankResponse as InferenceRerankResponse,
    type InferenceRerankParams as InferenceRerankParams,
  };
}
