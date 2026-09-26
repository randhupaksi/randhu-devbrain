# Bootstrap Installation

The canonical procedure is in the [installation guide](../install/README.md). Adapter templates are the installer's single source of truth.

V2 reads the baseline once per session, does not load every skill or reference, and prioritizes the active prompt after system/platform instructions and safety. Both adapters install the same Markdown content.

The upgrade audit inspected existing home loaders/skills read-only. Installer integration was tested in a simulated home inside the repository. The real home was not changed. A legacy loader may still read compatibility entries; the user must explicitly run the updater to install v2 templates and skills to the real home.

After updating a host, start a new session and ask the assistant to identify the baseline, project instructions, and relevant skills it actually read. Successful file copying alone does not prove native host discovery or behavior.
