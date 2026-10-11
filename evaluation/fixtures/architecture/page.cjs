exports.format = record => record.label.trim();
exports.render = records => require('./service.cjs').labels(records);
