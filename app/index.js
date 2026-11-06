const http = require('http');
const qs = require('querystring');

const calculator = require('./calculator');

const MAX_BODY_BYTES = 10 * 1024; // 10 KB request body limit

const escapeHtml = (value) => String(value)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;');

const readBody = (request) => new Promise((resolve, reject) => {
  let size = 0;
  let body = '';
  request.on('data', (chunk) => {
    size += chunk.length;
    if (size > MAX_BODY_BYTES) {
      // Reject immediately but keep draining so the 413 response can be delivered.
      reject(Object.assign(new Error('Request body too large'), { statusCode: 413 }));
      return;
    }
    body += chunk;
  });
  request.on('end', () => resolve(body));
  request.on('error', reject);
});

const sendJson = (response, statusCode, payload) => {
  response.writeHead(statusCode, { 'Content-Type': 'application/json' });
  response.end(JSON.stringify(payload));
};

const renderPage = (content) => `
  <html>
    <body>
      <h3>${content}</h3>
      <a href="/">Back to Calculator</a>
    </body>
  </html>
`;

const server = http.createServer((request, response) => {
  const { pathname } = new URL(request.url, `http://${request.headers.host || 'localhost'}`);

  // CORS headers
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    response.writeHead(204);
    response.end();
    return;
  }

  // Health check endpoint
  if (pathname === '/health') {
    sendJson(response, 200, { status: 'healthy', timestamp: new Date().toISOString() });
    return;
  }

  // JSON API for calculations
  if (pathname === '/api/calculate' && request.method === 'POST') {
    readBody(request)
      .then((body) => {
        const post = qs.parse(body);
        const result = calculator.add(post.numbers);
        sendJson(response, 200, { result });
        return result;
      })
      .catch((error) => {
        sendJson(response, error.statusCode || 400, { error: error.message });
      });
    return;
  }

  if (request.method === 'POST') {
    readBody(request)
      .then((body) => {
        const post = qs.parse(body);
        const result = calculator.add(post.numbers);
        const page = renderPage(`Result: ${escapeHtml(result)}`);
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.end(page);
        return page;
      })
      .catch((error) => {
        const page = renderPage(`Error: ${escapeHtml(error.message)}`);
        response.writeHead(error.statusCode || 400, { 'Content-Type': 'text/html' });
        response.end(page);
        return page;
      });
    return;
  }

  const html = `
    <html>
      <head>
        <title>Calculator App</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; }
          .container { max-width: 600px; margin: 0 auto; }
          input[type="text"] { width: 300px; padding: 8px; margin: 10px 0; }
          input[type="submit"] { padding: 10px 20px; background: #007bff; color: white; border: none; cursor: pointer; }
          input[type="submit"]:hover { background: #0056b3; }
          .api-info { background: #f8f9fa; padding: 15px; margin: 20px 0; border-radius: 5px; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Calculator App</h1>
          <h3>Input comma separated integers to add.</h3>
          <form method="post" action="/">
            <div>
              <label for="numbers">Numbers:</label><br>
              <input type="text" name="numbers" id="numbers" placeholder="e.g., 1,2,3,4" />
            </div>
            <input type="submit" value="Add" />
          </form>
          <div class="api-info">
            <h4>API Endpoints:</h4>
            <p><strong>POST /api/calculate</strong> - JSON API for calculations</p>
            <p><strong>GET /health</strong> - Health check endpoint</p>
          </div>
        </div>
      </body>
    </html>`;
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.end(html);
});

const port = process.env.PORT || 3000;
const host = process.env.HOST || '0.0.0.0';

server.listen(port, host, () => {
  console.log(`Server listening at http://${host}:${port}`);
  console.log(`Health check available at http://${host}:${port}/health`);
});

// Graceful shutdown: stop accepting new connections and let in-flight
// requests finish. The process exits when the event loop drains.
const shutdown = (signal) => {
  console.log(`${signal} received, shutting down gracefully`);
  return new Promise((resolve) => {
    server.close(() => {
      console.log('Process terminated');
      resolve();
    });
  });
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

module.exports = server;
module.exports.shutdown = shutdown;
