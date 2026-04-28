// Copyright (c) The OGX Contributors.
// All rights reserved.
//
// This source code is licensed under the terms described in the LICENSE file in
// the root directory of this source tree.
//
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as AdminAPI from './admin';
import { Admin, AdminListRoutesParams } from './admin';
import * as InferenceAPI from './inference';
import { Inference, InferenceRerankParams, InferenceRerankResponse } from './inference';

export class Alpha extends APIResource {
  admin: AdminAPI.Admin = new AdminAPI.Admin(this._client);
  inference: InferenceAPI.Inference = new InferenceAPI.Inference(this._client);
}

Alpha.Admin = Admin;
Alpha.Inference = Inference;

export declare namespace Alpha {
  export { Admin as Admin, type AdminListRoutesParams as AdminListRoutesParams };

  export {
    Inference as Inference,
    type InferenceRerankResponse as InferenceRerankResponse,
    type InferenceRerankParams as InferenceRerankParams,
  };
}
