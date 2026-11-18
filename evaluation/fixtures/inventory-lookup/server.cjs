const http = require('node:http');
const fs = require('node:fs/promises');
const path = require('node:path');

const items = [
  { id: 'EQ-1', name: 'Field recorder' },
  { id: 'EQ-2', name: 'Tripod' },
];
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css' };

const server = http.createServer(async (req, res) => {
  if (req.method !== 'GET') {
    res.writeHead(405, { Allow: 'GET' }).end();
    return;
  }
  if (req.url === '/api/items') {
    res.writeHead(200, { 'Content-Type': 'application/json' }).end(JSON.stringify(items));
    return;
  }
  const file = req.url === '/' ? 'index.html' : req.url.slice(1);
  const type = types[path.extname(file)];
  if (type && /^[a-z0-9-]+\.(html|js|css)$/.test(file)) {
    try {
      const content = await fs.readFile(path.join(__dirname, 'public', file));
      res.writeHead(200, { 'Content-Type': type }).end(content);
      return;
    } catch (error) {
      if (error.code !== 'ENOENT') {
        res.writeHead(500).end();
        return;
      }
    }
  }
  res.writeHead(404).end();
});

server.listen(0, '127.0.0.1', () => {
  console.log('http://127.0.0.1:' + server.address().port);
});
