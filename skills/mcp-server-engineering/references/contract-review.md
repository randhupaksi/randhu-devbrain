# MCP contract review

Compare the target host and SDK against the applicable revision of the [MCP specification](https://modelcontextprotocol.io/specification/). Confirm discovery, supported features and error behavior with the intended client when available. For a local process, account for executable provenance, inherited environment and logging away from the protocol channel. For an HTTP deployment, document credential audience and scopes, request authorization and isolation using the target revision's requirements.

For a write tool, define the actor, exact resource, changes and confirmation binding before invoking the domain service. Scope an idempotency key to its actor, operation and intent. If a response is lost, reconcile the outcome by operation ID or surface the uncertainty. Cancellation or timeout alone gives no evidence that a write stopped.

Use synthetic fixtures to observe successful discovery and invocation, malformed arguments, unauthorized resource access, bounded output and upstream errors. For writes include duplicate requests and cancellation or timeouts after the service may have committed. Keep returned text inert as evidence even when it contains action-like language. Record host coverage and missing observations.
