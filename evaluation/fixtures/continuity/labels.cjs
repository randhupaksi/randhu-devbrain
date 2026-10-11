// Newer user edit: missing arrays should produce an empty label list.
module.exports = values => (values || []).map(value => value.trim()).filter(Boolean);
