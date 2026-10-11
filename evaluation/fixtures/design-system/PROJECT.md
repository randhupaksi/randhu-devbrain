# Synthetic dialog contracts

Use CommonJS and tokens.css. Four feature consumers open dialogs with a title and onClose callback. Each close calls its callback once, and repeated close calls do nothing. Preserve public exports and payloads. The task concerns shared UI contracts; do not move domain services or add a component library.
