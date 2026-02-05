# Changelog

## 0.5.0-alpha.2 (2026-02-05)

Full Changelog: [v0.4.0-alpha.7...v0.5.0-alpha.2](https://github.com/llamastack/llama-stack-client-typescript/compare/v0.4.0-alpha.7...v0.5.0-alpha.2)

### Features

* add support for tool_choice to repsponses api ([8170d7f](https://github.com/llamastack/llama-stack-client-typescript/commit/8170d7f453cdc6263fe19ddf8e6cddc097b61780))
* Adds support for the `safety_identifier` parameter ([db2ebc6](https://github.com/llamastack/llama-stack-client-typescript/commit/db2ebc6f214bebe06e329bbfa6509f93dbc47b69))
* **api:** add readonly connectors API ([c810c19](https://github.com/llamastack/llama-stack-client-typescript/commit/c810c19d824604b34dab48d453bf1f19ac1ff66d))
* convert Benchmarks API to use FastAPI router ([bcc19bb](https://github.com/llamastack/llama-stack-client-typescript/commit/bcc19bb3640fffce18a128c042f11b695c8f7a6d))
* convert Datasets API to use FastAPI router ([a52b7ee](https://github.com/llamastack/llama-stack-client-typescript/commit/a52b7ee0bd64a843134b2354e95502da2fe55f66))
* Implement include parameter specifically for adding logprobs in the output message ([01f0ba8](https://github.com/llamastack/llama-stack-client-typescript/commit/01f0ba8970e6c1a729dd872cf228376fddd5f3fe))
* introduce /admin API for stack administration and operations ([2c9e2ab](https://github.com/llamastack/llama-stack-client-typescript/commit/2c9e2ab11a42bb2192370880781e2faee633c17c))
* migrate Inspect API to FastAPI router ([79f8d87](https://github.com/llamastack/llama-stack-client-typescript/commit/79f8d87b64a243c782c5a9eb5b62d31378781f36))
* migrate Providers API to FastAPI router pattern ([22f7cf6](https://github.com/llamastack/llama-stack-client-typescript/commit/22f7cf60f463db6091bf213a630ac48bb1f12e49))


### Bug Fixes

* **mcp:** correct code tool API endpoint ([6006307](https://github.com/llamastack/llama-stack-client-typescript/commit/60063077b65f31a31dabf254dbcfae50909cd692))
* **mcp:** return correct lines on typescript errors ([368f4b5](https://github.com/llamastack/llama-stack-client-typescript/commit/368f4b50eb87213ab27f43a161df688d3cba4f62))


### Chores

* break long lines in snippets into multiline ([a3f9a49](https://github.com/llamastack/llama-stack-client-typescript/commit/a3f9a49ec9ae6ce575a355888d0332643b314fff))
* **ci:** upgrade `actions/github-script` ([8d32768](https://github.com/llamastack/llama-stack-client-typescript/commit/8d327684ea36362d0b06b297d8a7355353800298))
* clarify use of yarn for development and npm/yarn/pnpm for users ([#51](https://github.com/llamastack/llama-stack-client-typescript/issues/51)) ([b413eed](https://github.com/llamastack/llama-stack-client-typescript/commit/b413eedc57a6666df5aa98af4c8726a468cb77ec))
* **internal:** codegen related update ([c12b19b](https://github.com/llamastack/llama-stack-client-typescript/commit/c12b19b37e47e9982a99ea1f4ba7d0a92ff61f1f))
* **internal:** codegen related update ([db8b76f](https://github.com/llamastack/llama-stack-client-typescript/commit/db8b76f2ca7761bf0b71fcf548d24e93b83014e0))
* **internal:** codegen related update ([9d4ee0f](https://github.com/llamastack/llama-stack-client-typescript/commit/9d4ee0f21db979f28ac2008f37b02a70e72094ff))
* **internal:** codegen related update ([b5ea21d](https://github.com/llamastack/llama-stack-client-typescript/commit/b5ea21d0dcf0a71a49420efdf721f21254b9a0ce))
* **internal:** codegen related update ([d199aff](https://github.com/llamastack/llama-stack-client-typescript/commit/d199aff3d638854e58ae5575979d2c7f57eebc10))
* **internal:** update `actions/checkout` version ([fe86770](https://github.com/llamastack/llama-stack-client-typescript/commit/fe867703d0446b015c6c59a62ae9e9b29161aca3))
* **internal:** upgrade babel, qs, js-yaml ([d318482](https://github.com/llamastack/llama-stack-client-typescript/commit/d318482504fd85a956d3a382ba8113fedfb8416c))


### Documentation

* add more examples ([cc58d0d](https://github.com/llamastack/llama-stack-client-typescript/commit/cc58d0d59eda97e5fbad6b6daea0272dcbb189cb))

## 0.4.0-alpha.7 (2025-12-03)

Full Changelog: [v0.4.0-alpha.6...v0.4.0-alpha.7](https://github.com/llamastack/llama-stack-client-typescript/compare/v0.4.0-alpha.6...v0.4.0-alpha.7)

### ⚠ BREAKING CHANGES

* replace output_text property with getResponseOutputText helper ([#48](https://github.com/llamastack/llama-stack-client-typescript/issues/48))

### Features

* add `output_text` property on Response object ([#42](https://github.com/llamastack/llama-stack-client-typescript/issues/42)) ([bced728](https://github.com/llamastack/llama-stack-client-typescript/commit/bced72805f3314f41d03f5d60502204a4e41ee07))
* add integration tests CI workflow ([#49](https://github.com/llamastack/llama-stack-client-typescript/issues/49)) ([5675ef1](https://github.com/llamastack/llama-stack-client-typescript/commit/5675ef11021ac703ce4fc967544c812030d05361))
* Add metadata field to request and response ([fdf65b2](https://github.com/llamastack/llama-stack-client-typescript/commit/fdf65b2cd70b350cf3f821ca01e3bf6190440565))
* **api:** deprecate `toolgroup` and `tool_runtime` apis ([3f75ac5](https://github.com/llamastack/llama-stack-client-typescript/commit/3f75ac506692b7706c978f11b5d4d6e012fd7357))
* Implement FastAPI router system ([ea26c3e](https://github.com/llamastack/llama-stack-client-typescript/commit/ea26c3e2a340985f2dacf6df86070dbf71d93749))
* replace output_text property with getResponseOutputText helper ([#48](https://github.com/llamastack/llama-stack-client-typescript/issues/48)) ([53e799e](https://github.com/llamastack/llama-stack-client-typescript/commit/53e799edd1da5fa1566610f83a3f4e5722e46d2c))


### Bug Fixes

* add test for the exported symbol ([e78b187](https://github.com/llamastack/llama-stack-client-typescript/commit/e78b18756b539acf37a37402c3afb44f97460545))
* **client:** fix issue with duplicate definitions in Go ([48d4f16](https://github.com/llamastack/llama-stack-client-typescript/commit/48d4f166d3ba438a2b4a9fec3e98d958ea8f035b))
* Pydantic validation error with list-type metadata in vector search ([#3797](https://github.com/llamastack/llama-stack-client-typescript/issues/3797)) ([e1c40d2](https://github.com/llamastack/llama-stack-client-typescript/commit/e1c40d2a3d6a3abb52f38108f231a9e6bec074ce))

## 0.4.0-alpha.6 (2025-11-18)

Full Changelog: [v0.4.0-alpha.5...v0.4.0-alpha.6](https://github.com/llamastack/llama-stack-client-typescript/compare/v0.4.0-alpha.5...v0.4.0-alpha.6)

### Features

* Wire through parallel_tool_calls to Responses API ([3b91f14](https://github.com/llamastack/llama-stack-client-typescript/commit/3b91f14e0d40ecffd5f7b0bd55600995f934c616))

## 0.4.0-alpha.5 (2025-11-17)

Full Changelog: [v0.4.0-alpha.4...v0.4.0-alpha.5](https://github.com/llamastack/llama-stack-client-typescript/compare/v0.4.0-alpha.4...v0.4.0-alpha.5)

### Bug Fixes

* **openapi:** restore embedded request wrappers ([b5604d7](https://github.com/llamastack/llama-stack-client-typescript/commit/b5604d767ace04d82c60c600401d72fa497e68b0))

## 0.4.0-alpha.4 (2025-11-14)

Full Changelog: [v0.4.0-alpha.3...v0.4.0-alpha.4](https://github.com/llamastack/llama-stack-client-typescript/compare/v0.4.0-alpha.3...v0.4.0-alpha.4)

### Bug Fixes

* **ci:** release doctor workflow had a typo ([c2417e3](https://github.com/llamastack/llama-stack-client-typescript/commit/c2417e399a0c8f14dc3f29c2682d7889d6149069))


### Chores

* use Pydantic to generate OpenAPI schema ([264cd8d](https://github.com/llamastack/llama-stack-client-typescript/commit/264cd8dd9dbba40fb55ef07462c664eb1de7f526))

## 0.4.0-alpha.3 (2025-11-14)

Full Changelog: [v0.4.0-alpha.2...v0.4.0-alpha.3](https://github.com/llamastack/llama-stack-client-typescript/compare/v0.4.0-alpha.2...v0.4.0-alpha.3)

### Bug Fixes

* MCP authorization parameter implementation ([a5dd454](https://github.com/llamastack/llama-stack-client-typescript/commit/a5dd454c5f2cb64532e642c415ef40eb1001dcd8))

## 0.4.0-alpha.2 (2025-11-13)

Full Changelog: [v0.4.0-alpha.1...v0.4.0-alpha.2](https://github.com/llamastack/llama-stack-client-typescript/compare/v0.4.0-alpha.1...v0.4.0-alpha.2)

### Features

* add new API filter for all non-deprecated APIs ([b6aeeaf](https://github.com/llamastack/llama-stack-client-typescript/commit/b6aeeaf8de2ec76928f2b52b027b563924cae7af))
* Adding option to return embeddings and metadata from `/vector_stores/*/files/*/content` and UI updates ([f599d5e](https://github.com/llamastack/llama-stack-client-typescript/commit/f599d5e0cb24af85afaf698ab132e35980094b30))
* **api:** point models.list() to /v1/openai/v1/models ([bb35776](https://github.com/llamastack/llama-stack-client-typescript/commit/bb35776ec613b3045cf3b3f62e5361d9403fa2a8))
* **api:** remove agents types ([69aff21](https://github.com/llamastack/llama-stack-client-typescript/commit/69aff218b3c3765a1a6beab4ade48a7096a9082b))
* **api:** remove openai/v1 endpoints ([96b206c](https://github.com/llamastack/llama-stack-client-typescript/commit/96b206cd531391fe3d0323a276eb342b70a568de))
* Implement the 'max_tool_calls' parameter for the Responses API ([a9ec6fb](https://github.com/llamastack/llama-stack-client-typescript/commit/a9ec6fb8fea3b839f30a03d2fb61efbfe4c6b007))


### Bug Fixes

* **api:** ensure openapi spec has deprecated routes ([8cd1f46](https://github.com/llamastack/llama-stack-client-typescript/commit/8cd1f4632c395241bddefd19a23abd52eefe2ca3))


### Chores

* **stainless:** add config for file header ([1bc1a46](https://github.com/llamastack/llama-stack-client-typescript/commit/1bc1a460f884257ece4da5d12a3a7a0847bf725a))
* **stainless:** add config for file header ([61a0e70](https://github.com/llamastack/llama-stack-client-typescript/commit/61a0e705c79716318f88d5f4bec385d20f6a5e3e))

## 0.4.0-alpha.1 (2025-10-31)

Full Changelog: [v0.2.23-alpha.1...v0.4.0-alpha.1](https://github.com/llamastack/llama-stack-client-typescript/compare/v0.2.23-alpha.1...v0.4.0-alpha.1)

### ⚠ BREAKING CHANGES

* **api:** /v1/inspect only lists v1 apis by default
* **api:** /v1/inspect only lists v1 apis by default
* **api:** use input_schema instead of parameters for tools
* **api:** fixes to remove deprecated inference resources

### Features

* **api:** Adding prompts API to stainless config ([5ab8d74](https://github.com/llamastack/llama-stack-client-typescript/commit/5ab8d7423f6a9c26453b36c9daee99d343993d4b))
* **api:** expires_after changes for /files ([a0b0fb7](https://github.com/llamastack/llama-stack-client-typescript/commit/a0b0fb7aa74668f3f6996c178f9654723b8b0f22))
* **api:** fix file batches SDK to list_files ([25a0f10](https://github.com/llamastack/llama-stack-client-typescript/commit/25a0f10cffa7de7f1457d65c97259911bc70ab0a))
* **api:** fixes to remove deprecated inference resources ([367d775](https://github.com/llamastack/llama-stack-client-typescript/commit/367d775c3d5a2fd85bf138d2b175e91b7c185913))
* **api:** fixes to URLs ([e4f7840](https://github.com/llamastack/llama-stack-client-typescript/commit/e4f78407f74f3ba7597de355c314e1932dd94761))
* **api:** manual updates ([7d2e375](https://github.com/llamastack/llama-stack-client-typescript/commit/7d2e375bde7bd04ae58cc49fcd5ab7b134b25640))
* **api:** manual updates ([0302d54](https://github.com/llamastack/llama-stack-client-typescript/commit/0302d54398d87127ab0e9221a8a92760123d235b))
* **api:** manual updates ([98a596f](https://github.com/llamastack/llama-stack-client-typescript/commit/98a596f677fe2790e4b4765362aa19b6cff8b97e))
* **api:** manual updates ([c6fb0b6](https://github.com/llamastack/llama-stack-client-typescript/commit/c6fb0b67d8f2e641c13836a17400e51df0b029f1))
* **api:** manual updates??! ([4dda064](https://github.com/llamastack/llama-stack-client-typescript/commit/4dda06489f003860e138f396c253b40de01103b6))
* **api:** move datasets to beta, vector_db -&gt; vector_store ([f32c0be](https://github.com/llamastack/llama-stack-client-typescript/commit/f32c0becb1ec0d66129b7fcaa06de3323ee703da))
* **api:** move post_training and eval under alpha namespace ([aec1d5f](https://github.com/llamastack/llama-stack-client-typescript/commit/aec1d5ff198473ba736bf543ad00c6626cab9b81))
* **api:** moving { rerank, agents } to `client.alpha.` ([793e069](https://github.com/llamastack/llama-stack-client-typescript/commit/793e0694d75c2af4535bf991d5858cd1f21300b4))
* **api:** removing openai/v1 ([b5432de](https://github.com/llamastack/llama-stack-client-typescript/commit/b5432de2ad56ff0d2fd5a5b8e1755b5237616b60))
* **api:** SDKs for vector store file batches ([b0676c8](https://github.com/llamastack/llama-stack-client-typescript/commit/b0676c837bbd835276fea3fe12f435afdbb75ef7))
* **api:** SDKs for vector store file batches apis ([88731bf](https://github.com/llamastack/llama-stack-client-typescript/commit/88731bfecd6f548ae79cbe2a1125620e488c42a3))
* **api:** several updates including Conversations, Responses changes, etc. ([e0728d5](https://github.com/llamastack/llama-stack-client-typescript/commit/e0728d5dd59be8723d9f967d6164351eb05528d1))
* **api:** sync ([7d85013](https://github.com/llamastack/llama-stack-client-typescript/commit/7d850139d1327a215312a82c98b3428ebc7e5f68))
* **api:** tool api (input_schema, etc.) changes ([06f2bca](https://github.com/llamastack/llama-stack-client-typescript/commit/06f2bcaf0df2e5d462cbe2d9ef3704ab0cfe9248))
* **api:** updates to vector_store, etc. ([19535c2](https://github.com/llamastack/llama-stack-client-typescript/commit/19535c27147bf6f6861b807d9eeee471b5625148))
* **api:** updating post /v1/files to have correct multipart/form-data ([f1cf9d6](https://github.com/llamastack/llama-stack-client-typescript/commit/f1cf9d68b6b2569dfb5ea3e2d2c33eff1a832e47))
* **api:** use input_schema instead of parameters for tools ([8910a12](https://github.com/llamastack/llama-stack-client-typescript/commit/8910a121146aeddcb8f400101e6a2232245097e0))
* **api:** vector_db_id -&gt; vector_store_id ([079d89d](https://github.com/llamastack/llama-stack-client-typescript/commit/079d89d6522cb4f2eed5e5a09962d94ad800e883))


### Bug Fixes

* **api:** another fix to capture correct responses.create() params ([6acae91](https://github.com/llamastack/llama-stack-client-typescript/commit/6acae910db289080e8f52864f1bdf6d7951d1c3b))
* **api:** fix the ToolDefParam updates ([5cee3d6](https://github.com/llamastack/llama-stack-client-typescript/commit/5cee3d69650a4c827e12fc046c1d2ec3b2fa9126))
* **client:** incorrect offset pagination check ([257285f](https://github.com/llamastack/llama-stack-client-typescript/commit/257285f33bb989c9040580dd24251d05f9657bb0))
* fix stream event model reference ([a71b421](https://github.com/llamastack/llama-stack-client-typescript/commit/a71b421152a609e49e76d01c6e4dd46eb3dbfae0))


### Chores

* **api:** /v1/inspect only lists v1 apis by default ([ae3dc95](https://github.com/llamastack/llama-stack-client-typescript/commit/ae3dc95964c908d219b23d7166780eaab6003ef5))
* **api:** /v1/inspect only lists v1 apis by default ([e30f51c](https://github.com/llamastack/llama-stack-client-typescript/commit/e30f51c704c39129092255c040bbf5ad90ed0b07))
* extract some types in mcp docs ([dcc7bb8](https://github.com/llamastack/llama-stack-client-typescript/commit/dcc7bb8b4d940982c2e9c6d1a541636e99fdc5ff))
* fix readme example ([402f930](https://github.com/llamastack/llama-stack-client-typescript/commit/402f9301d033bb230c9714104fbfa554f3f7cd8f))
* fix readme examples ([4d5517c](https://github.com/llamastack/llama-stack-client-typescript/commit/4d5517c2b9af2eb6994f5e4b2c033c95d268fb5c))
* **internal:** codegen related update ([252e0a2](https://github.com/llamastack/llama-stack-client-typescript/commit/252e0a2a38bd8aedab91b401c440a9b10c056cec))
* **internal:** codegen related update ([34da720](https://github.com/llamastack/llama-stack-client-typescript/commit/34da720c34c35dafb38775243d28dfbdce2497db))
* **internal:** fix incremental formatting in some cases ([c5c8292](https://github.com/llamastack/llama-stack-client-typescript/commit/c5c8292b631c678efff5498bbab9f5a43bee50b6))
* **internal:** use npm pack for build uploads ([a246793](https://github.com/llamastack/llama-stack-client-typescript/commit/a24679300cff93fea8ad4bc85e549ecc88198d58))


### Documentation

* update examples ([17b9eb3](https://github.com/llamastack/llama-stack-client-typescript/commit/17b9eb3c40957b63d2a71f7fc21944abcc720d80))


### Build System

* Bump version to 0.2.23 ([16e05ed](https://github.com/llamastack/llama-stack-client-typescript/commit/16e05ed9798233375e19098992632d223c3f5d8d))

## 0.2.23-alpha.1 (2025-09-26)

Full Changelog: [v0.2.19-alpha.1...v0.2.23-alpha.1](https://github.com/llamastack/llama-stack-client-typescript/compare/v0.2.19-alpha.1...v0.2.23-alpha.1)

### Features

* **api:** manual updates ([2fa1a33](https://github.com/llamastack/llama-stack-client-typescript/commit/2fa1a330cc6dce3f8057ba1f7c276a636ee043f5))


### Bug Fixes

* **client:** fix circular dependencies and offset pagination ([c6badf8](https://github.com/llamastack/llama-stack-client-typescript/commit/c6badf8b6f9fa2fea0721eca5618705f93120d66))
* coerce nullable values to undefined ([baa0d06](https://github.com/llamastack/llama-stack-client-typescript/commit/baa0d060f7ed3d7819e9db923d177d3d4bd15cba))


### Performance Improvements

* faster formatting ([1903f1f](https://github.com/llamastack/llama-stack-client-typescript/commit/1903f1fe85cca1880b0cec165260ed68b5ba3075))


### Chores

* ci build action ([a0be0f5](https://github.com/llamastack/llama-stack-client-typescript/commit/a0be0f57c6a99d06b580d62dbbf8d8b6f1447718))
* do not install brew dependencies in ./scripts/bootstrap by default ([b1d5c7d](https://github.com/llamastack/llama-stack-client-typescript/commit/b1d5c7da386eb2135a25c05d9a73f4d47fbd81b6))
* **internal:** remove deprecated `compilerOptions.baseUrl` from tsconfig.json ([463774e](https://github.com/llamastack/llama-stack-client-typescript/commit/463774e5208ff5d7fbff14d39954e024662c1b16))


### Build System

* Bump version to 0.2.19 ([6756504](https://github.com/llamastack/llama-stack-client-typescript/commit/6756504abce9c5751634436e9a88be03b11b2baa))
* Bump version to 0.2.20 ([7e953c7](https://github.com/llamastack/llama-stack-client-typescript/commit/7e953c741922ad3b5bb02d00279dac8cb82760dc))
* Bump version to 0.2.21 ([50f7e6e](https://github.com/llamastack/llama-stack-client-typescript/commit/50f7e6e8784fe7ac99018dfdee23c0f5171b0c5b))
* Bump version to 0.2.22 ([86089a1](https://github.com/llamastack/llama-stack-client-typescript/commit/86089a11b721427bcbcd2bf9d6b1c33407d7ce9c))

## 0.2.19-alpha.1 (2025-08-26)

Full Changelog: [v0.2.18-alpha.3...v0.2.19-alpha.1](https://github.com/llamastack/llama-stack-client-typescript/compare/v0.2.18-alpha.3...v0.2.19-alpha.1)

### Features

* **api:** fix completion response breakage perhaps? ([8afb71e](https://github.com/llamastack/llama-stack-client-typescript/commit/8afb71e178fc6d76549cfb24a3ef93915f8bb402))
* **api:** manual updates ([6124969](https://github.com/llamastack/llama-stack-client-typescript/commit/61249693bae9649d586cf6aab3fbebd9529c7f2b))
* **api:** manual updates ([58379c6](https://github.com/llamastack/llama-stack-client-typescript/commit/58379c6961ac0af1296f016fe05a9713c799f623))
* **api:** query_metrics, batches, changes ([8d3d366](https://github.com/llamastack/llama-stack-client-typescript/commit/8d3d366c7ed4bab6936f15668851d9ec9db77a2b))
* **api:** some updates to query metrics ([2434aea](https://github.com/llamastack/llama-stack-client-typescript/commit/2434aeaf2386f934b01491dfdc96463e2bb07bdd))


### Chores

* **deps:** update dependency node-fetch to v2.6.13 ([4d1ef8f](https://github.com/llamastack/llama-stack-client-typescript/commit/4d1ef8fb5e58927d2c2b80d21a95e6b53153ba6d))
* **internal:** formatting change ([6ea2c4e](https://github.com/llamastack/llama-stack-client-typescript/commit/6ea2c4e31d861f23aa5b2cc36664a6d48623e881))
* **internal:** formatting change ([2221870](https://github.com/llamastack/llama-stack-client-typescript/commit/2221870d728ed08ddf10c2f037784ab67005df43))
* update ([3a17e19](https://github.com/llamastack/llama-stack-client-typescript/commit/3a17e196b631a62ac1642b67a6dbd8ada0bb5244))
* update CI script ([bff686d](https://github.com/llamastack/llama-stack-client-typescript/commit/bff686d2311e714ab5f082304c0d8e865990f29e))


### Build System

* Bump version to 0.2.18 ([7549391](https://github.com/llamastack/llama-stack-client-typescript/commit/754939187da2726e54d902241747351d120f5174))

## 0.2.18-alpha.3 (2025-08-14)

Full Changelog: [v0.2.17...v0.2.18-alpha.3](https://github.com/llamastack/llama-stack-client-typescript/compare/v0.2.17...v0.2.18-alpha.3)

### Features

* **api:** update via SDK Studio ([cda87f0](https://github.com/llamastack/llama-stack-client-typescript/commit/cda87f0a9c62078aadd380069502f689051db420))
* include tavily secret if available in requests ([#18](https://github.com/llamastack/llama-stack-client-typescript/issues/18)) ([b86d1da](https://github.com/llamastack/llama-stack-client-typescript/commit/b86d1da2d249b555079e02c849e39b231632b0b1))


### Bug Fixes

* update inference/agent example scripts to be more robust ([#14](https://github.com/llamastack/llama-stack-client-typescript/issues/14)) ([697e755](https://github.com/llamastack/llama-stack-client-typescript/commit/697e755902e2b3b7c471ea33ed387e542e622eda))


### Chores

* **copy:** Copy changes over from llamastack/ org repository ([#28](https://github.com/llamastack/llama-stack-client-typescript/issues/28)) ([26105c4](https://github.com/llamastack/llama-stack-client-typescript/commit/26105c463b2d73c52d3bb989baa5282d5923c8a3))
* sync repo ([6416e59](https://github.com/llamastack/llama-stack-client-typescript/commit/6416e59b0803e074c3be862b46b84d55fc0045f8))
* Update CODEOWNERS ([#26](https://github.com/llamastack/llama-stack-client-typescript/issues/26)) ([3d9d160](https://github.com/llamastack/llama-stack-client-typescript/commit/3d9d160f0a141344c5230c2b96bb4dd1c01f91e6))


### Build System

* Bump version to 0.2.10 ([8f251cb](https://github.com/llamastack/llama-stack-client-typescript/commit/8f251cb192739b65e0f9b6943f919494aff6bc28))
* Bump version to 0.2.11 ([ddf1578](https://github.com/llamastack/llama-stack-client-typescript/commit/ddf1578c4e66754afbe209b01807e666da67f545))
* Bump version to 0.2.12 ([5f5f0cc](https://github.com/llamastack/llama-stack-client-typescript/commit/5f5f0cc2ee15f4771180cff83d3cfdf0ddfa99d0))
* Bump version to 0.2.13 ([55e639a](https://github.com/llamastack/llama-stack-client-typescript/commit/55e639a13e2efa091ddfd0304181380882840371))
* Bump version to 0.2.4 ([8ee7dd6](https://github.com/llamastack/llama-stack-client-typescript/commit/8ee7dd698f2175dc76028f3af042ad0f5d7e3ae0))
* Bump version to 0.2.5 ([1508978](https://github.com/llamastack/llama-stack-client-typescript/commit/1508978dba176b8423e2837820ce5143fa1e999a))
* Bump version to 0.2.6 ([59edd92](https://github.com/llamastack/llama-stack-client-typescript/commit/59edd92329118c3beef87ad4018db5488a3133f1))
* Bump version to 0.2.7 ([de56089](https://github.com/llamastack/llama-stack-client-typescript/commit/de56089dd0b08b289b5bcaf9d876000403045546))
* Bump version to 0.2.8 ([6067307](https://github.com/llamastack/llama-stack-client-typescript/commit/6067307289b2ef32fa9bf72cfbf694967746e264))
* Bump version to 0.2.9 ([9d38ef8](https://github.com/llamastack/llama-stack-client-typescript/commit/9d38ef8aa6c3e7201a9e16094df9d5df27770a5c))

## 0.2.17 (2025-08-06)

Full Changelog: [v0.2.15...v0.2.17](https://github.com/llamastack/llama-stack-client-typescript/compare/v0.2.15...v0.2.17)

### Features

* **api:** update via SDK Studio ([9803419](https://github.com/llamastack/llama-stack-client-typescript/commit/98034195897ff31be9164761450bcab933e381cc))
* **api:** update via SDK Studio ([57bb86c](https://github.com/llamastack/llama-stack-client-typescript/commit/57bb86c95fa5925661f243fb9c9e953ac451a392))
* **api:** update via SDK Studio ([40c2189](https://github.com/llamastack/llama-stack-client-typescript/commit/40c218958db8991a7483ed9ace4242d171770d42))
* **api:** update via SDK Studio ([26b572d](https://github.com/llamastack/llama-stack-client-typescript/commit/26b572d92a150ef1ee25ec6efd0e9bd38f321072))
* **api:** update via SDK Studio ([8a48a6f](https://github.com/llamastack/llama-stack-client-typescript/commit/8a48a6fe63d13817953c2acb4fbf5b4ab6136f4a))
* **api:** update via SDK Studio ([3ea8a73](https://github.com/llamastack/llama-stack-client-typescript/commit/3ea8a73c9d8e66bbc3650aa7e6a19a4ce07f30c5))
* **api:** update via SDK Studio ([cddd18f](https://github.com/llamastack/llama-stack-client-typescript/commit/cddd18fb70e3830d7062d12aab4754c3e598bbd2))
* **api:** update via SDK Studio ([fc4fbf9](https://github.com/llamastack/llama-stack-client-typescript/commit/fc4fbf94810db7f89288cc36780d2616c8fc715a))
* **api:** update via SDK Studio ([2a981d4](https://github.com/llamastack/llama-stack-client-typescript/commit/2a981d45f801bdf82e43c6d7d7c6674cc03cadc3))
* **api:** update via SDK Studio ([14544ce](https://github.com/llamastack/llama-stack-client-typescript/commit/14544ce36d7a33509af85783a421d9c1995e22d1))
* **api:** update via SDK Studio ([57c0764](https://github.com/llamastack/llama-stack-client-typescript/commit/57c07641906fc04eb9eadfd12f672e28a3a2efbc))
* **api:** update via SDK Studio ([426728c](https://github.com/llamastack/llama-stack-client-typescript/commit/426728c7f86ce3385eb8c116f41a5b192abd5d0c))


### Bug Fixes

* **ci:** update version, skip a failing test ([#4](https://github.com/llamastack/llama-stack-client-typescript/issues/4)) ([7a5dbe7](https://github.com/llamastack/llama-stack-client-typescript/commit/7a5dbe7ed59b24feda5d73df8808fde2d337fc2a))
* **client:** don't send `Content-Type` for bodyless methods ([6806e8e](https://github.com/llamastack/llama-stack-client-typescript/commit/6806e8ef31302a0f2ca0ab9ae36e4781e5f0adf7))


### Chores

* **internal:** codegen related update ([267a378](https://github.com/llamastack/llama-stack-client-typescript/commit/267a378b1999abd5f17f08b5792ee99d9c405439))
* **internal:** codegen related update ([79e7896](https://github.com/llamastack/llama-stack-client-typescript/commit/79e78969a31df16ef35901c3ce4c003f70d59778))
* **internal:** remove redundant imports config ([f19eb25](https://github.com/llamastack/llama-stack-client-typescript/commit/f19eb258d836c7de4fb719c62dabcbfb502ecc6c))
* make some internal functions async ([e2797ae](https://github.com/llamastack/llama-stack-client-typescript/commit/e2797ae1e88960ffa5b13a89103d4ee9972803f9))
* **mcp:** rework imports in tools ([9486e73](https://github.com/llamastack/llama-stack-client-typescript/commit/9486e7319d36cb8efe86568884057c65e91d84b2))
* mention unit type in timeout docs ([c2b9867](https://github.com/llamastack/llama-stack-client-typescript/commit/c2b986793dd9f2fa55e8f4ce9c463a4d99635ab4))


### Build System

* Bump version to 0.2.14 ([4d2c696](https://github.com/llamastack/llama-stack-client-typescript/commit/4d2c696b916c9868be61fff31f008442cb346eca))
* Bump version to 0.2.15 ([6645f62](https://github.com/llamastack/llama-stack-client-typescript/commit/6645f629844fd24b7e8b8fab9089cf1ba7cb9352))
* Bump version to 0.2.16 ([fe9ab2e](https://github.com/llamastack/llama-stack-client-typescript/commit/fe9ab2e081df8f9f254b74e3bc42ac880dda765f))
* Bump version to 0.2.17 ([7da4cca](https://github.com/llamastack/llama-stack-client-typescript/commit/7da4cca39c982d6f3f07fa09a9428983d233bc5e))

## 0.1.0-alpha.3 (2025-06-28)

Full Changelog: [v0.1.0-alpha.2...v0.1.0-alpha.3](https://github.com/llamastack/llama-stack-client-typescript/compare/v0.1.0-alpha.2...v0.1.0-alpha.3)

### Chores

* **ci:** only run for pushes and fork pull requests ([70cf3b4](https://github.com/llamastack/llama-stack-client-typescript/commit/70cf3b4cfe81f5d4757f05ea0372342c9c8ce08b))

## 0.1.0-alpha.2 (2025-06-27)

Full Changelog: [v0.1.0-alpha.1...v0.1.0-alpha.2](https://github.com/llamastack/llama-stack-client-typescript/compare/v0.1.0-alpha.1...v0.1.0-alpha.2)

### Features

* **api:** update via SDK Studio ([a00f961](https://github.com/llamastack/llama-stack-client-typescript/commit/a00f961a3a4a8961cd54ad6a92a52aa34cb0d041))
* **api:** update via SDK Studio ([bef1e47](https://github.com/llamastack/llama-stack-client-typescript/commit/bef1e47ad9fe9a03e8ffdaa632981c0666919b73))
* **api:** update via SDK Studio ([7fb44fa](https://github.com/llamastack/llama-stack-client-typescript/commit/7fb44fab41cd95410115d12a7855fd12fbd3b34c))

## 0.1.0-alpha.1 (2025-06-27)

Full Changelog: [v0.0.1-alpha.0...v0.1.0-alpha.1](https://github.com/llamastack/llama-stack-client-typescript/compare/v0.0.1-alpha.0...v0.1.0-alpha.1)

### Features

* **client:** add support for endpoint-specific base URLs ([4c942da](https://github.com/llamastack/llama-stack-client-typescript/commit/4c942da59c2e3d40b9dacd8198e52ee60b403849))


### Bug Fixes

* **client:** always overwrite when merging headers ([31ec06d](https://github.com/llamastack/llama-stack-client-typescript/commit/31ec06d09d5143cb2b545114a9436059e06e78d4))
* **client:** explicitly copy fetch in withOptions ([aa0e2a6](https://github.com/llamastack/llama-stack-client-typescript/commit/aa0e2a685e75c31678dbef7be8381ce55ff01800))
* **client:** get fetchOptions type more reliably ([5e30a99](https://github.com/llamastack/llama-stack-client-typescript/commit/5e30a9916c22bfb4d00bfaafa27449fb07fd8f68))
* compat with more runtimes ([625a6db](https://github.com/llamastack/llama-stack-client-typescript/commit/625a6db4c7d07936c854cbddc17b859290f9f2c4))
* publish script — handle NPM errors correctly ([39a151f](https://github.com/llamastack/llama-stack-client-typescript/commit/39a151fe741ebce64d96ee80c6abe954a4b7f92d))


### Chores

* adjust eslint.config.mjs ignore pattern ([f0198eb](https://github.com/llamastack/llama-stack-client-typescript/commit/f0198ebf4d831ecc7089b382e1ab8317d7caec34))
* avoid type error in certain environments ([c120307](https://github.com/llamastack/llama-stack-client-typescript/commit/c12030797aeb66958347d1c29d47e6bde73c6d19))
* change publish docs url ([8165807](https://github.com/llamastack/llama-stack-client-typescript/commit/8165807d5c54cd91549ec66e127e0c5afd2d595d))
* **ci:** enable for pull requests ([85ff8d9](https://github.com/llamastack/llama-stack-client-typescript/commit/85ff8d9c3b928405c85f682b1c56c22340efabc8))
* **client:** refactor imports ([b2ab744](https://github.com/llamastack/llama-stack-client-typescript/commit/b2ab74493d3d528f3db9bf84a7af3ffe291efa54))
* **deps:** bump eslint-plugin-prettier ([1041139](https://github.com/llamastack/llama-stack-client-typescript/commit/104113998e2c3412112a49d75596c4496d58fd43))
* **docs:** grammar improvements ([461216e](https://github.com/llamastack/llama-stack-client-typescript/commit/461216eaac75ed802adb8cda21d5f88498fbadcc))
* **docs:** use top-level-await in example snippets ([74b5549](https://github.com/llamastack/llama-stack-client-typescript/commit/74b5549f48e82f05e5b507393026542d939a6b27))
* improve publish-npm script --latest tag logic ([5dd9d90](https://github.com/llamastack/llama-stack-client-typescript/commit/5dd9d9031ded40d4d20ef3fb2aa101f743f7b593))
* **internal:** add pure annotations, make base APIResource abstract ([c239e7d](https://github.com/llamastack/llama-stack-client-typescript/commit/c239e7dad3fa8254cb90ea78a93d8aad5e3b90be))
* **internal:** fix readablestream types in node 20 ([287f657](https://github.com/llamastack/llama-stack-client-typescript/commit/287f657d36d0548502f12802b8ea17f627da1f20))
* **internal:** update jest config ([a36fe70](https://github.com/llamastack/llama-stack-client-typescript/commit/a36fe70319c6a033a9deedee714102bee04c97e1))
* **package:** remove engines ([6066770](https://github.com/llamastack/llama-stack-client-typescript/commit/6066770fb1c17521dcdc2237156ba88b42beed94))
* **readme:** update badges ([5239745](https://github.com/llamastack/llama-stack-client-typescript/commit/5239745b18dded8a88500cac31138bd170470fc9))
* **readme:** use better example snippet for undocumented params ([e035b8f](https://github.com/llamastack/llama-stack-client-typescript/commit/e035b8f9ac69949d6cc897be9f3bd221d8afed7e))
* update SDK settings ([e7d2cfc](https://github.com/llamastack/llama-stack-client-typescript/commit/e7d2cfcc355eb5990ef5e750cb18ace391e75b5b))


### Refactors

* **types:** replace Record with mapped types ([ef71453](https://github.com/llamastack/llama-stack-client-typescript/commit/ef7145362e215ac5dffbeb59ca3fdc944edfe183))
