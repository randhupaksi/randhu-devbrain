function editDialog(title, onClose) { let open = true; return { title, close() { if (open) { open = false; onClose(); } } }; }
function previewDialog(title, onClose) { let open = true; return { title, close() { if (open) { open = false; onClose(); } } }; }
function confirmDialog(title, onClose) { let open = true; return { title, close() { if (open) { open = false; onClose(); } } }; }
function detailsDialog(title, onClose) { let open = true; return { title, close() { if (open) { open = false; onClose(); } } }; }
module.exports = { editDialog, previewDialog, confirmDialog, detailsDialog };
