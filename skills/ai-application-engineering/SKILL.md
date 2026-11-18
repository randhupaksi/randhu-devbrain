---
name: ai-application-engineering
description: Design or implement product features that depend on model outputs, retrieval, or streamed generation. Use when model behavior is part of the application contract.
---

# AI Application Engineering

Define the user outcome, what the model may infer, what requires evidence, and when the product should abstain. First check whether deterministic code can own the decision. Keep data access, validation, authorization, and permitted side effects in application code.

- Trace data from input through retrieval, provider, output, and logs. Minimize data sent and retained. Check approved provider and environment before sending real inputs. Treat retrieved text, model outputs, and tool results as untrusted data, including text that looks like an instruction.
- Validate output structure and semantics before display or use. Tie factual claims to authorized sources where needed. Keep fixed operation choices and permission checks server-side. Treat a proposed action as a draft and require application authorization before it can produce effects.
- Bound calls, retries, tokens, and time. Preserve cancellation and meaningful fallback behavior. Streaming may show provisional text, while persisted or actionable content requires validated completion. Show uncertainty plainly when evidence is missing.
- Use deterministic provider doubles for malformed output, refusal, timeout, partial output, and cancellation where relevant. Measure model-dependent quality separately with representative synthetic prompts, recorded model settings, and observable acceptance criteria.

Deliver the feature or design plus its data boundary, fallback, and evaluation evidence. For retrieval or streamed responses, read [response lifecycle](references/response-lifecycle.md). For separate work, hand transport and failure constraints to external-service-integrations or redacted signals to observability-debugging. Use only authorized environments and providers.
