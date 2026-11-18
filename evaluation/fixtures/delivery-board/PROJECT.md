# Local shipment board

Implement a synthetic internal tool using the Node standard library and plain browser JavaScript. No authentication, remote services, or database are needed. Keep the API and UI in this project. Make it runnable with `node server.cjs`.

| Request | Contract |
|---|---|
| GET /api/shipments | Return 200 and a JSON array of records with id, destination and status. |
| PATCH /api/shipments/:id | Accept a JSON object with status of pending or dispatched. Return 200 with the updated record, 400 for bad JSON or missing/invalid status, and 404 for an unknown ID. |

Seed the process with DL-01 Bandung pending, DL-02 Surabaya dispatched, and DL-03 Yogyakarta pending. Successful changes survive browser refresh within the same server process. Serve the board from the same server and preserve record IDs and destinations. Provide a status filter, an action for marking a pending record dispatched, and useful loading, empty and error feedback. A failed update must preserve the last confirmed state. Keep actions usable by keyboard and on narrow screens.

Use Node's built-in test runner or direct local HTTP checks for the API. Use an available browser to exercise the board. Include launch and verification instructions in the result.
