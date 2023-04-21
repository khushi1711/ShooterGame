const http = require('http');
const fs = require('fs');
const url = require('url');
const lookup = require('mime-types').lookup;
require('dotenv').config();

const PORT = process.env.PORT;
const server = http.createServer((req, res) => {
  const parsedURL = url.parse(req.url, true);
  let path = parsedURL.path.replace(/^\/+|\/+$/g, '');
  if (path === '') {
    path = 'index.html';
  }

  const file = __dirname + '/dist/' + path;
  fs.readFile(file, (err, content) => {
    if (err) {
      console.log('File not found');
      res.writeHead(301, { Location: '/' });
      res.end();
    } else {
      res.setHeader('X-Content-Type-Options', 'nosniff');
      let mime = lookup(path);
      res.writeHead(200, { 'Content-type': mime });
      res.end(content);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server started on Port: ${PORT}`);
});
