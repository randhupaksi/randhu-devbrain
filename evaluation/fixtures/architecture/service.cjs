exports.labels = records => records.filter(record => record.active).map(record => require('./page.cjs').format(record));
