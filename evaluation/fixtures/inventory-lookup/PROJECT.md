# Inventory lookup

Build a keyboard-accessible inventory lookup page and link it from the existing home page. Keep its home navigation and existing server/API behavior. Use the supplied Node server and browser JavaScript with no added dependencies.

- Start with `node server.cjs`, then open the loopback URL printed by the server.
- GET `/api/items` returns an array of records with string fields `id` and `name`.
- Filter the list by name, distinguish a query with no matches, and give users a retry action when the request fails. Use the browser when available and report observed checks.
- Put new page assets under `public/`. The server only serves plain files directly under that directory.
