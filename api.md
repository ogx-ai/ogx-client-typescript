# Shared

Types:

- <code><a href="./src/resources/shared.ts">HealthInfo</a></code>
- <code><a href="./src/resources/shared.ts">InterleavedContent</a></code>
- <code><a href="./src/resources/shared.ts">InterleavedContentItem</a></code>
- <code><a href="./src/resources/shared.ts">ListProvidersResponse</a></code>
- <code><a href="./src/resources/shared.ts">ListRoutesResponse</a></code>
- <code><a href="./src/resources/shared.ts">ParamType</a></code>
- <code><a href="./src/resources/shared.ts">ProviderInfo</a></code>
- <code><a href="./src/resources/shared.ts">RouteInfo</a></code>
- <code><a href="./src/resources/shared.ts">SafetyViolation</a></code>
- <code><a href="./src/resources/shared.ts">SamplingParams</a></code>
- <code><a href="./src/resources/shared.ts">ScoringResult</a></code>
- <code><a href="./src/resources/shared.ts">SystemMessage</a></code>
- <code><a href="./src/resources/shared.ts">VersionInfo</a></code>

# Toolgroups

Types:

- <code><a href="./src/resources/toolgroups.ts">ListToolGroupsResponse</a></code>
- <code><a href="./src/resources/toolgroups.ts">ToolGroup</a></code>
- <code><a href="./src/resources/toolgroups.ts">ToolgroupListResponse</a></code>

Methods:

- <code title="get /v1/toolgroups">client.toolgroups.<a href="./src/resources/toolgroups.ts">list</a>() -> ToolgroupListResponse</code>
- <code title="get /v1/toolgroups/{toolgroup_id}">client.toolgroups.<a href="./src/resources/toolgroups.ts">get</a>(toolgroupId) -> ToolGroup</code>
- <code title="post /v1/toolgroups">client.toolgroups.<a href="./src/resources/toolgroups.ts">register</a>({ ...params }) -> void</code>
- <code title="delete /v1/toolgroups/{toolgroup_id}">client.toolgroups.<a href="./src/resources/toolgroups.ts">unregister</a>(toolgroupId) -> void</code>

# Tools

Types:

- <code><a href="./src/resources/tools.ts">ToolListResponse</a></code>

Methods:

- <code title="get /v1/tools">client.tools.<a href="./src/resources/tools.ts">list</a>({ ...params }) -> ToolListResponse</code>
- <code title="get /v1/tools/{tool_name}">client.tools.<a href="./src/resources/tools.ts">get</a>(toolName) -> ToolDef</code>

# ToolRuntime

Types:

- <code><a href="./src/resources/tool-runtime.ts">ToolDef</a></code>
- <code><a href="./src/resources/tool-runtime.ts">ToolInvocationResult</a></code>
- <code><a href="./src/resources/tool-runtime.ts">ToolRuntimeListToolsResponse</a></code>

Methods:

- <code title="post /v1/tool-runtime/invoke">client.toolRuntime.<a href="./src/resources/tool-runtime.ts">invokeTool</a>({ ...params }) -> ToolInvocationResult</code>
- <code title="get /v1/tool-runtime/list-tools">client.toolRuntime.<a href="./src/resources/tool-runtime.ts">listTools</a>({ ...params }) -> ToolRuntimeListToolsResponse</code>

# Responses

Types:

- <code><a href="./src/resources/responses/responses.ts">ResponseObject</a></code>
- <code><a href="./src/resources/responses/responses.ts">ResponseObjectStream</a></code>
- <code><a href="./src/resources/responses/responses.ts">ResponseListResponse</a></code>
- <code><a href="./src/resources/responses/responses.ts">ResponseDeleteResponse</a></code>

Methods:

- <code title="post /v1/responses">client.responses.<a href="./src/resources/responses/responses.ts">create</a>({ ...params }) -> ResponseObject</code>
- <code title="get /v1/responses/{response_id}">client.responses.<a href="./src/resources/responses/responses.ts">retrieve</a>(responseId) -> ResponseObject</code>
- <code title="get /v1/responses">client.responses.<a href="./src/resources/responses/responses.ts">list</a>({ ...params }) -> ResponseListResponsesOpenAICursorPage</code>
- <code title="delete /v1/responses/{response_id}">client.responses.<a href="./src/resources/responses/responses.ts">delete</a>(responseId) -> ResponseDeleteResponse</code>

## InputItems

Types:

- <code><a href="./src/resources/responses/input-items.ts">InputItemListResponse</a></code>

Methods:

- <code title="get /v1/responses/{response_id}/input_items">client.responses.inputItems.<a href="./src/resources/responses/input-items.ts">list</a>(responseId, { ...params }) -> InputItemListResponse</code>

# Prompts

Types:

- <code><a href="./src/resources/prompts/prompts.ts">ListPromptsResponse</a></code>
- <code><a href="./src/resources/prompts/prompts.ts">Prompt</a></code>
- <code><a href="./src/resources/prompts/prompts.ts">PromptListResponse</a></code>

Methods:

- <code title="post /v1/prompts">client.prompts.<a href="./src/resources/prompts/prompts.ts">create</a>({ ...params }) -> Prompt</code>
- <code title="get /v1/prompts/{prompt_id}">client.prompts.<a href="./src/resources/prompts/prompts.ts">retrieve</a>(promptId, { ...params }) -> Prompt</code>
- <code title="put /v1/prompts/{prompt_id}">client.prompts.<a href="./src/resources/prompts/prompts.ts">update</a>(promptId, { ...params }) -> Prompt</code>
- <code title="get /v1/prompts">client.prompts.<a href="./src/resources/prompts/prompts.ts">list</a>() -> PromptListResponse</code>
- <code title="delete /v1/prompts/{prompt_id}">client.prompts.<a href="./src/resources/prompts/prompts.ts">delete</a>(promptId) -> void</code>
- <code title="put /v1/prompts/{prompt_id}/set-default-version">client.prompts.<a href="./src/resources/prompts/prompts.ts">setDefaultVersion</a>(promptId, { ...params }) -> Prompt</code>

## Versions

Methods:

- <code title="get /v1/prompts/{prompt_id}/versions">client.prompts.versions.<a href="./src/resources/prompts/versions.ts">list</a>(promptId) -> PromptListResponse</code>

# Conversations

Types:

- <code><a href="./src/resources/conversations/conversations.ts">ConversationObject</a></code>
- <code><a href="./src/resources/conversations/conversations.ts">ConversationDeleteResponse</a></code>

Methods:

- <code title="post /v1/conversations">client.conversations.<a href="./src/resources/conversations/conversations.ts">create</a>({ ...params }) -> ConversationObject</code>
- <code title="get /v1/conversations/{conversation_id}">client.conversations.<a href="./src/resources/conversations/conversations.ts">retrieve</a>(conversationId) -> ConversationObject</code>
- <code title="post /v1/conversations/{conversation_id}">client.conversations.<a href="./src/resources/conversations/conversations.ts">update</a>(conversationId, { ...params }) -> ConversationObject</code>
- <code title="delete /v1/conversations/{conversation_id}">client.conversations.<a href="./src/resources/conversations/conversations.ts">delete</a>(conversationId) -> ConversationDeleteResponse</code>

## Items

Types:

- <code><a href="./src/resources/conversations/items.ts">ItemCreateResponse</a></code>
- <code><a href="./src/resources/conversations/items.ts">ItemListResponse</a></code>
- <code><a href="./src/resources/conversations/items.ts">ItemDeleteResponse</a></code>
- <code><a href="./src/resources/conversations/items.ts">ItemGetResponse</a></code>

Methods:

- <code title="post /v1/conversations/{conversation_id}/items">client.conversations.items.<a href="./src/resources/conversations/items.ts">create</a>(conversationId, { ...params }) -> ItemCreateResponse</code>
- <code title="get /v1/conversations/{conversation_id}/items">client.conversations.items.<a href="./src/resources/conversations/items.ts">list</a>(conversationId, { ...params }) -> ItemListResponsesOpenAICursorPage</code>
- <code title="delete /v1/conversations/{conversation_id}/items/{item_id}">client.conversations.items.<a href="./src/resources/conversations/items.ts">delete</a>(conversationId, itemId) -> ItemDeleteResponse</code>
- <code title="get /v1/conversations/{conversation_id}/items/{item_id}">client.conversations.items.<a href="./src/resources/conversations/items.ts">get</a>(conversationId, itemId) -> ItemGetResponse</code>

# Inspect

Methods:

- <code title="get /v1/health">client.inspect.<a href="./src/resources/inspect.ts">health</a>() -> HealthInfo</code>
- <code title="get /v1/version">client.inspect.<a href="./src/resources/inspect.ts">version</a>() -> VersionInfo</code>

# Embeddings

Types:

- <code><a href="./src/resources/embeddings.ts">CreateEmbeddingsResponse</a></code>

Methods:

- <code title="post /v1/embeddings">client.embeddings.<a href="./src/resources/embeddings.ts">create</a>({ ...params }) -> CreateEmbeddingsResponse</code>

# Chat

Types:

- <code><a href="./src/resources/chat/chat.ts">ChatCompletionChunk</a></code>

## Completions

Types:

- <code><a href="./src/resources/chat/completions.ts">CompletionCreateResponse</a></code>
- <code><a href="./src/resources/chat/completions.ts">CompletionRetrieveResponse</a></code>
- <code><a href="./src/resources/chat/completions.ts">CompletionListResponse</a></code>

Methods:

- <code title="post /v1/chat/completions">client.chat.completions.<a href="./src/resources/chat/completions.ts">create</a>({ ...params }) -> CompletionCreateResponse</code>
- <code title="get /v1/chat/completions/{completion_id}">client.chat.completions.<a href="./src/resources/chat/completions.ts">retrieve</a>(completionId) -> CompletionRetrieveResponse</code>
- <code title="get /v1/chat/completions">client.chat.completions.<a href="./src/resources/chat/completions.ts">list</a>({ ...params }) -> CompletionListResponse</code>

# Completions

Types:

- <code><a href="./src/resources/completions.ts">CompletionCreateResponse</a></code>

Methods:

- <code title="post /v1/completions">client.completions.<a href="./src/resources/completions.ts">create</a>({ ...params }) -> CompletionCreateResponse</code>

# VectorIo

Types:

- <code><a href="./src/resources/vector-io.ts">QueryChunksResponse</a></code>

Methods:

- <code title="post /v1/vector-io/insert">client.vectorIo.<a href="./src/resources/vector-io.ts">insert</a>({ ...params }) -> void</code>
- <code title="post /v1/vector-io/query">client.vectorIo.<a href="./src/resources/vector-io.ts">query</a>({ ...params }) -> QueryChunksResponse</code>

# VectorStores

Types:

- <code><a href="./src/resources/vector-stores/vector-stores.ts">ListVectorStoresResponse</a></code>
- <code><a href="./src/resources/vector-stores/vector-stores.ts">VectorStore</a></code>
- <code><a href="./src/resources/vector-stores/vector-stores.ts">VectorStoreDeleteResponse</a></code>
- <code><a href="./src/resources/vector-stores/vector-stores.ts">VectorStoreSearchResponse</a></code>

Methods:

- <code title="post /v1/vector_stores">client.vectorStores.<a href="./src/resources/vector-stores/vector-stores.ts">create</a>({ ...params }) -> VectorStore</code>
- <code title="get /v1/vector_stores/{vector_store_id}">client.vectorStores.<a href="./src/resources/vector-stores/vector-stores.ts">retrieve</a>(vectorStoreId) -> VectorStore</code>
- <code title="post /v1/vector_stores/{vector_store_id}">client.vectorStores.<a href="./src/resources/vector-stores/vector-stores.ts">update</a>(vectorStoreId, { ...params }) -> VectorStore</code>
- <code title="get /v1/vector_stores">client.vectorStores.<a href="./src/resources/vector-stores/vector-stores.ts">list</a>({ ...params }) -> VectorStoresOpenAICursorPage</code>
- <code title="delete /v1/vector_stores/{vector_store_id}">client.vectorStores.<a href="./src/resources/vector-stores/vector-stores.ts">delete</a>(vectorStoreId) -> VectorStoreDeleteResponse</code>
- <code title="post /v1/vector_stores/{vector_store_id}/search">client.vectorStores.<a href="./src/resources/vector-stores/vector-stores.ts">search</a>(vectorStoreId, { ...params }) -> VectorStoreSearchResponse</code>

## Files

Types:

- <code><a href="./src/resources/vector-stores/files.ts">VectorStoreFile</a></code>
- <code><a href="./src/resources/vector-stores/files.ts">FileDeleteResponse</a></code>
- <code><a href="./src/resources/vector-stores/files.ts">FileContentResponse</a></code>

Methods:

- <code title="post /v1/vector_stores/{vector_store_id}/files">client.vectorStores.files.<a href="./src/resources/vector-stores/files.ts">create</a>(vectorStoreId, { ...params }) -> VectorStoreFile</code>
- <code title="get /v1/vector_stores/{vector_store_id}/files/{file_id}">client.vectorStores.files.<a href="./src/resources/vector-stores/files.ts">retrieve</a>(vectorStoreId, fileId) -> VectorStoreFile</code>
- <code title="post /v1/vector_stores/{vector_store_id}/files/{file_id}">client.vectorStores.files.<a href="./src/resources/vector-stores/files.ts">update</a>(vectorStoreId, fileId, { ...params }) -> VectorStoreFile</code>
- <code title="get /v1/vector_stores/{vector_store_id}/files">client.vectorStores.files.<a href="./src/resources/vector-stores/files.ts">list</a>(vectorStoreId, { ...params }) -> VectorStoreFilesOpenAICursorPage</code>
- <code title="delete /v1/vector_stores/{vector_store_id}/files/{file_id}">client.vectorStores.files.<a href="./src/resources/vector-stores/files.ts">delete</a>(vectorStoreId, fileId) -> FileDeleteResponse</code>
- <code title="get /v1/vector_stores/{vector_store_id}/files/{file_id}/content">client.vectorStores.files.<a href="./src/resources/vector-stores/files.ts">content</a>(vectorStoreId, fileId, { ...params }) -> FileContentResponse</code>

## FileBatches

Types:

- <code><a href="./src/resources/vector-stores/file-batches.ts">ListVectorStoreFilesInBatchResponse</a></code>
- <code><a href="./src/resources/vector-stores/file-batches.ts">VectorStoreFileBatches</a></code>

Methods:

- <code title="post /v1/vector_stores/{vector_store_id}/file_batches">client.vectorStores.fileBatches.<a href="./src/resources/vector-stores/file-batches.ts">create</a>(vectorStoreId, { ...params }) -> VectorStoreFileBatches</code>
- <code title="get /v1/vector_stores/{vector_store_id}/file_batches/{batch_id}">client.vectorStores.fileBatches.<a href="./src/resources/vector-stores/file-batches.ts">retrieve</a>(vectorStoreId, batchId) -> VectorStoreFileBatches</code>
- <code title="post /v1/vector_stores/{vector_store_id}/file_batches/{batch_id}/cancel">client.vectorStores.fileBatches.<a href="./src/resources/vector-stores/file-batches.ts">cancel</a>(vectorStoreId, batchId) -> VectorStoreFileBatches</code>
- <code title="get /v1/vector_stores/{vector_store_id}/file_batches/{batch_id}/files">client.vectorStores.fileBatches.<a href="./src/resources/vector-stores/file-batches.ts">listFiles</a>(vectorStoreId, batchId, { ...params }) -> VectorStoreFilesOpenAICursorPage</code>

# Models

Types:

- <code><a href="./src/resources/models/models.ts">ListModelsResponse</a></code>
- <code><a href="./src/resources/models/models.ts">Model</a></code>
- <code><a href="./src/resources/models/models.ts">ModelRetrieveResponse</a></code>
- <code><a href="./src/resources/models/models.ts">ModelListResponse</a></code>
- <code><a href="./src/resources/models/models.ts">ModelRegisterResponse</a></code>

Methods:

- <code title="get /v1/models/{model_id}">client.models.<a href="./src/resources/models/models.ts">retrieve</a>(modelId) -> ModelRetrieveResponse</code>
- <code title="get /v1/models">client.models.<a href="./src/resources/models/models.ts">list</a>() -> ModelListResponse</code>
- <code title="post /v1/models">client.models.<a href="./src/resources/models/models.ts">register</a>({ ...params }) -> ModelRegisterResponse</code>
- <code title="delete /v1/models/{model_id}">client.models.<a href="./src/resources/models/models.ts">unregister</a>(modelId) -> void</code>

## OpenAI

Methods:

- <code title="get /v1/models">client.models.openai.<a href="./src/resources/models/openai.ts">list</a>() -> ModelListResponse</code>

# Providers

Types:

- <code><a href="./src/resources/providers.ts">ProviderListResponse</a></code>

Methods:

- <code title="get /v1/providers/{provider_id}">client.providers.<a href="./src/resources/providers.ts">retrieve</a>(providerId) -> ProviderInfo</code>
- <code title="get /v1/providers">client.providers.<a href="./src/resources/providers.ts">list</a>() -> ProviderListResponse</code>

# Routes

Types:

- <code><a href="./src/resources/routes.ts">RouteListResponse</a></code>

Methods:

- <code title="get /v1/inspect/routes">client.routes.<a href="./src/resources/routes.ts">list</a>({ ...params }) -> RouteListResponse</code>

# Moderations

Types:

- <code><a href="./src/resources/moderations.ts">CreateResponse</a></code>

Methods:

- <code title="post /v1/moderations">client.moderations.<a href="./src/resources/moderations.ts">create</a>({ ...params }) -> CreateResponse</code>

# Safety

Types:

- <code><a href="./src/resources/safety.ts">RunShieldResponse</a></code>

Methods:

- <code title="post /v1/safety/run-shield">client.safety.<a href="./src/resources/safety.ts">runShield</a>({ ...params }) -> RunShieldResponse</code>

# Shields

Types:

- <code><a href="./src/resources/shields.ts">ListShieldsResponse</a></code>
- <code><a href="./src/resources/shields.ts">Shield</a></code>
- <code><a href="./src/resources/shields.ts">ShieldListResponse</a></code>

Methods:

- <code title="get /v1/shields/{identifier}">client.shields.<a href="./src/resources/shields.ts">retrieve</a>(identifier) -> Shield</code>
- <code title="get /v1/shields">client.shields.<a href="./src/resources/shields.ts">list</a>() -> ShieldListResponse</code>
- <code title="delete /v1/shields/{identifier}">client.shields.<a href="./src/resources/shields.ts">delete</a>(identifier) -> void</code>
- <code title="post /v1/shields">client.shields.<a href="./src/resources/shields.ts">register</a>({ ...params }) -> Shield</code>

# Scoring

Types:

- <code><a href="./src/resources/scoring.ts">ScoringScoreResponse</a></code>
- <code><a href="./src/resources/scoring.ts">ScoringScoreBatchResponse</a></code>

Methods:

- <code title="post /v1/scoring/score">client.scoring.<a href="./src/resources/scoring.ts">score</a>({ ...params }) -> ScoringScoreResponse</code>
- <code title="post /v1/scoring/score-batch">client.scoring.<a href="./src/resources/scoring.ts">scoreBatch</a>({ ...params }) -> ScoringScoreBatchResponse</code>

# ScoringFunctions

Types:

- <code><a href="./src/resources/scoring-functions.ts">ListScoringFunctionsResponse</a></code>
- <code><a href="./src/resources/scoring-functions.ts">ScoringFn</a></code>
- <code><a href="./src/resources/scoring-functions.ts">ScoringFnParams</a></code>
- <code><a href="./src/resources/scoring-functions.ts">ScoringFunctionListResponse</a></code>

Methods:

- <code title="get /v1/scoring-functions/{scoring_fn_id}">client.scoringFunctions.<a href="./src/resources/scoring-functions.ts">retrieve</a>(scoringFnId) -> ScoringFn</code>
- <code title="get /v1/scoring-functions">client.scoringFunctions.<a href="./src/resources/scoring-functions.ts">list</a>() -> ScoringFunctionListResponse</code>
- <code title="post /v1/scoring-functions">client.scoringFunctions.<a href="./src/resources/scoring-functions.ts">register</a>({ ...params }) -> void</code>
- <code title="delete /v1/scoring-functions/{scoring_fn_id}">client.scoringFunctions.<a href="./src/resources/scoring-functions.ts">unregister</a>(scoringFnId) -> void</code>

# Files

Types:

- <code><a href="./src/resources/files.ts">DeleteFileResponse</a></code>
- <code><a href="./src/resources/files.ts">File</a></code>
- <code><a href="./src/resources/files.ts">ListFilesResponse</a></code>
- <code><a href="./src/resources/files.ts">FileContentResponse</a></code>

Methods:

- <code title="post /v1/files">client.files.<a href="./src/resources/files.ts">create</a>({ ...params }) -> File</code>
- <code title="get /v1/files/{file_id}">client.files.<a href="./src/resources/files.ts">retrieve</a>(fileId) -> File</code>
- <code title="get /v1/files">client.files.<a href="./src/resources/files.ts">list</a>({ ...params }) -> FilesOpenAICursorPage</code>
- <code title="delete /v1/files/{file_id}">client.files.<a href="./src/resources/files.ts">delete</a>(fileId) -> DeleteFileResponse</code>
- <code title="get /v1/files/{file_id}/content">client.files.<a href="./src/resources/files.ts">content</a>(fileId) -> unknown</code>

# Batches

Types:

- <code><a href="./src/resources/batches.ts">BatchCreateResponse</a></code>
- <code><a href="./src/resources/batches.ts">BatchRetrieveResponse</a></code>
- <code><a href="./src/resources/batches.ts">BatchListResponse</a></code>
- <code><a href="./src/resources/batches.ts">BatchCancelResponse</a></code>

Methods:

- <code title="post /v1/batches">client.batches.<a href="./src/resources/batches.ts">create</a>({ ...params }) -> BatchCreateResponse</code>
- <code title="get /v1/batches/{batch_id}">client.batches.<a href="./src/resources/batches.ts">retrieve</a>(batchId) -> BatchRetrieveResponse</code>
- <code title="get /v1/batches">client.batches.<a href="./src/resources/batches.ts">list</a>({ ...params }) -> BatchListResponsesOpenAICursorPage</code>
- <code title="post /v1/batches/{batch_id}/cancel">client.batches.<a href="./src/resources/batches.ts">cancel</a>(batchId) -> BatchCancelResponse</code>

# Alpha

## PostTraining

Types:

- <code><a href="./src/resources/alpha/post-training/post-training.ts">AlgorithmConfig</a></code>
- <code><a href="./src/resources/alpha/post-training/post-training.ts">ListPostTrainingJobsResponse</a></code>
- <code><a href="./src/resources/alpha/post-training/post-training.ts">PostTrainingJob</a></code>

Methods:

- <code title="post /v1alpha/post-training/preference-optimize">client.alpha.postTraining.<a href="./src/resources/alpha/post-training/post-training.ts">preferenceOptimize</a>({ ...params }) -> PostTrainingJob</code>
- <code title="post /v1alpha/post-training/supervised-fine-tune">client.alpha.postTraining.<a href="./src/resources/alpha/post-training/post-training.ts">supervisedFineTune</a>({ ...params }) -> PostTrainingJob</code>

### Job

Types:

- <code><a href="./src/resources/alpha/post-training/job.ts">JobListResponse</a></code>
- <code><a href="./src/resources/alpha/post-training/job.ts">JobArtifactsResponse</a></code>
- <code><a href="./src/resources/alpha/post-training/job.ts">JobStatusResponse</a></code>

Methods:

- <code title="get /v1alpha/post-training/jobs">client.alpha.postTraining.job.<a href="./src/resources/alpha/post-training/job.ts">list</a>() -> JobListResponse</code>
- <code title="get /v1alpha/post-training/job/artifacts">client.alpha.postTraining.job.<a href="./src/resources/alpha/post-training/job.ts">artifacts</a>() -> JobArtifactsResponse</code>
- <code title="post /v1alpha/post-training/job/cancel">client.alpha.postTraining.job.<a href="./src/resources/alpha/post-training/job.ts">cancel</a>() -> void</code>
- <code title="get /v1alpha/post-training/job/status">client.alpha.postTraining.job.<a href="./src/resources/alpha/post-training/job.ts">status</a>() -> JobStatusResponse</code>

## Benchmarks

Types:

- <code><a href="./src/resources/alpha/benchmarks.ts">Benchmark</a></code>
- <code><a href="./src/resources/alpha/benchmarks.ts">ListBenchmarksResponse</a></code>
- <code><a href="./src/resources/alpha/benchmarks.ts">BenchmarkListResponse</a></code>

Methods:

- <code title="get /v1alpha/eval/benchmarks/{benchmark_id}">client.alpha.benchmarks.<a href="./src/resources/alpha/benchmarks.ts">retrieve</a>(benchmarkId) -> Benchmark</code>
- <code title="get /v1alpha/eval/benchmarks">client.alpha.benchmarks.<a href="./src/resources/alpha/benchmarks.ts">list</a>() -> BenchmarkListResponse</code>
- <code title="post /v1alpha/eval/benchmarks">client.alpha.benchmarks.<a href="./src/resources/alpha/benchmarks.ts">register</a>({ ...params }) -> void</code>
- <code title="delete /v1alpha/eval/benchmarks/{benchmark_id}">client.alpha.benchmarks.<a href="./src/resources/alpha/benchmarks.ts">unregister</a>(benchmarkId) -> void</code>

## Eval

Types:

- <code><a href="./src/resources/alpha/eval/eval.ts">BenchmarkConfig</a></code>
- <code><a href="./src/resources/alpha/eval/eval.ts">EvaluateResponse</a></code>
- <code><a href="./src/resources/alpha/eval/eval.ts">Job</a></code>

Methods:

- <code title="post /v1alpha/eval/benchmarks/{benchmark_id}/evaluations">client.alpha.eval.<a href="./src/resources/alpha/eval/eval.ts">evaluateRows</a>(benchmarkId, { ...params }) -> EvaluateResponse</code>
- <code title="post /v1alpha/eval/benchmarks/{benchmark_id}/evaluations">client.alpha.eval.<a href="./src/resources/alpha/eval/eval.ts">evaluateRowsAlpha</a>(benchmarkId, { ...params }) -> EvaluateResponse</code>
- <code title="post /v1alpha/eval/benchmarks/{benchmark_id}/jobs">client.alpha.eval.<a href="./src/resources/alpha/eval/eval.ts">runEval</a>(benchmarkId, { ...params }) -> Job</code>
- <code title="post /v1alpha/eval/benchmarks/{benchmark_id}/jobs">client.alpha.eval.<a href="./src/resources/alpha/eval/eval.ts">runEvalAlpha</a>(benchmarkId, { ...params }) -> Job</code>

### Jobs

Methods:

- <code title="get /v1alpha/eval/benchmarks/{benchmark_id}/jobs/{job_id}/result">client.alpha.eval.jobs.<a href="./src/resources/alpha/eval/jobs.ts">retrieve</a>(benchmarkId, jobId) -> EvaluateResponse</code>
- <code title="delete /v1alpha/eval/benchmarks/{benchmark_id}/jobs/{job_id}">client.alpha.eval.jobs.<a href="./src/resources/alpha/eval/jobs.ts">cancel</a>(benchmarkId, jobId) -> void</code>
- <code title="get /v1alpha/eval/benchmarks/{benchmark_id}/jobs/{job_id}">client.alpha.eval.jobs.<a href="./src/resources/alpha/eval/jobs.ts">status</a>(benchmarkId, jobId) -> Job</code>

## Admin

Methods:

- <code title="get /v1alpha/admin/health">client.alpha.admin.<a href="./src/resources/alpha/admin.ts">health</a>() -> HealthInfo</code>
- <code title="get /v1alpha/admin/providers/{provider_id}">client.alpha.admin.<a href="./src/resources/alpha/admin.ts">inspectProvider</a>(providerId) -> ProviderInfo</code>
- <code title="get /v1alpha/admin/providers">client.alpha.admin.<a href="./src/resources/alpha/admin.ts">listProviders</a>() -> ProviderListResponse</code>
- <code title="get /v1alpha/admin/inspect/routes">client.alpha.admin.<a href="./src/resources/alpha/admin.ts">listRoutes</a>({ ...params }) -> RouteListResponse</code>
- <code title="get /v1alpha/admin/version">client.alpha.admin.<a href="./src/resources/alpha/admin.ts">version</a>() -> VersionInfo</code>

## Inference

Types:

- <code><a href="./src/resources/alpha/inference.ts">InferenceRerankResponse</a></code>

Methods:

- <code title="post /v1alpha/inference/rerank">client.alpha.inference.<a href="./src/resources/alpha/inference.ts">rerank</a>({ ...params }) -> InferenceRerankResponse</code>

# Beta

## Datasets

Types:

- <code><a href="./src/resources/beta/datasets.ts">ListDatasetsResponse</a></code>
- <code><a href="./src/resources/beta/datasets.ts">DatasetRetrieveResponse</a></code>
- <code><a href="./src/resources/beta/datasets.ts">DatasetListResponse</a></code>
- <code><a href="./src/resources/beta/datasets.ts">DatasetIterrowsResponse</a></code>
- <code><a href="./src/resources/beta/datasets.ts">DatasetRegisterResponse</a></code>

Methods:

- <code title="get /v1beta/datasets/{dataset_id}">client.beta.datasets.<a href="./src/resources/beta/datasets.ts">retrieve</a>(datasetId) -> DatasetRetrieveResponse</code>
- <code title="get /v1beta/datasets">client.beta.datasets.<a href="./src/resources/beta/datasets.ts">list</a>() -> DatasetListResponse</code>
- <code title="post /v1beta/datasetio/append-rows/{dataset_id}">client.beta.datasets.<a href="./src/resources/beta/datasets.ts">appendrows</a>(datasetId, { ...params }) -> void</code>
- <code title="get /v1beta/datasetio/iterrows/{dataset_id}">client.beta.datasets.<a href="./src/resources/beta/datasets.ts">iterrows</a>(datasetId, { ...params }) -> DatasetIterrowsResponse</code>
- <code title="post /v1beta/datasets">client.beta.datasets.<a href="./src/resources/beta/datasets.ts">register</a>({ ...params }) -> DatasetRegisterResponse</code>
- <code title="delete /v1beta/datasets/{dataset_id}">client.beta.datasets.<a href="./src/resources/beta/datasets.ts">unregister</a>(datasetId) -> void</code>
