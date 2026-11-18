# Retrieval and response lifecycle

## Grounded response

Authorize access before selecting candidate documents. Carry stable document IDs and revisions with the retrieved snippets. Keep snippets separate from instructions. At the response boundary, verify that references resolve to the retrieved and authorized set. Cite supported claims or return an insufficient-evidence state. Treat retrieval availability and answer quality as separate concerns.

## Streaming and cancellation

Associate each stream with its request and session. Stop rendering older chunks after cancellation or a newer request. Distinguish a completed answer from an interrupted preview and keep the previous confirmed result when recovery needs it. A retry needs a clear policy for duplicated work and charges, especially when a provider timed out after accepting the request.

## Observable checks

Use a small set covering a supported answer, insufficient evidence, unauthorized source exclusion, and invalid or interrupted output. Inspect what reached the model and what was emitted or persisted. Record model, prompt revision, latency, and usage where observable. An application-level validation pass can establish containment and recovery. Live evaluations establish only the behaviors observed on the selected inputs.
