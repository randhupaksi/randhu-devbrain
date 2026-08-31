# Source Mapping and Design Adjustments

Developer Specification telah dipetakan sebagai berikut:

- Developer DNA dan tujuan -> `core/developer-profile.md`, `README.md`.
- Prinsip utama -> `core/00-index.md`, `docs/context-precedence.md`.
- Coding philosophy -> `core/engineering-principles.md`.
- UI/UX philosophy dan decision framework -> `core/ui-ux-principles.md`, `workflows/ui-task.md`.
- Frontend/backend preferences -> `core/frontend-and-fullstack.md`.
- Performance -> `core/performance.md`.
- Security/safety dan Git -> `safety/`.
- AI collaboration dan coding workflow -> `core/ai-collaboration.md`, `workflows/`.
- Prompt compression -> `prompts/commands.yaml`.
- Project instructions -> `project-templates/`.
- Architecture/evolution -> `devbrain.yaml`, `adapters/`, `docs/maintenance.md`.
- Compact fallback context -> `runtime/core-compact.md`.
- Full startup context -> `runtime/full-context.md`.

## Improvements applied

- Pengulangan safety, approval, dan scope dikonsolidasikan menjadi policy operasional.
- Risk dibagi menjadi low/medium/high agar "harus bertanya" tidak terlalu kaku pada task kecil.
- Technical preferences dibuat pattern-first agar DevBrain tidak memaksakan React Query, library, atau stack tertentu pada semua project.
- UI principles dipisahkan dari project visual identity.
- Command pendek diberi mode dan approval contract; command tidak memperluas authorization.
- Notification, logs, daily summary, GUI, dan CLI ditandai deferred.
- Aturan client/company tertentu diarahkan ke project instructions; core global hanya menyimpan environment, data, contract, dan high-risk boundaries lintas-project.
- Full operational context menggabungkan seluruh modul keputusan untuk menghindari nuance hilang; non-runtime sources tetap dikecualikan.
