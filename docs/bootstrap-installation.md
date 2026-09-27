# Bootstrap Installation

The canonical procedure is in the [installation guide](../install/README.md). Adapter templates are the installer's single source of truth.

V2 reads the baseline once per session, does not load every skill or reference, and prioritizes the active prompt after system/platform instructions and safety. Both adapters install the same Markdown content.

The original v2 upgrade audit inspected existing home loaders and skills read-only. Repository maintenance normally tests installation in simulated homes. Installing or updating the real home is a separate user-requested action. A legacy loader may still read compatibility entries until the updater installs the current templates and seven skills.

After updating a host, start a new session and ask the assistant to identify the baseline, project instructions, and relevant skills it actually read. Successful file copying alone does not prove native host discovery or behavior.
