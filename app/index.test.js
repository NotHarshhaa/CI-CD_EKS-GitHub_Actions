const server = require('./index');

let baseUrl;

beforeAll(async () => {
  if (!server.listening) {
    await new Promise((resolve) => server.once('listening', resolve));
  }
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

afterAll(async () => {
  server.closeAllConnections?.();
  await new Promise((resolve) => server.close(resolve));
});

describe('GET /', () => {
  test('should render the calculator page', async () => {
    const response = await fetch(baseUrl);
    expect(response.status).toBe(200);
    expect(response.headers.get('content-type')).toContain('text/html');
    const body = await response.text();
    expect(body).toContain('Calculator App');
    expect(body).toContain('POST /api/calculate');
  });
});

describe('GET /health', () => {
  test('should return healthy status as JSON', async () => {
    const response = await fetch(`${baseUrl}/health`);
    expect(response.status).toBe(200);
    expect(response.headers.get('content-type')).toContain('application/json');
    const payload = await response.json();
    expect(payload.status).toBe('healthy');
    expect(payload.timestamp).toBeDefined();
  });
});

describe('OPTIONS request', () => {
  test('should handle CORS preflight', async () => {
    const response = await fetch(baseUrl, { method: 'OPTIONS' });
    expect(response.status).toBe(204);
    expect(response.headers.get('access-control-allow-origin')).toBe('*');
    expect(response.headers.get('access-control-allow-methods')).toContain('POST');
  });
});

describe('POST /api/calculate', () => {
  const postJson = (body) => fetch(`${baseUrl}/api/calculate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });

  test('should return the sum as JSON', async () => {
    const response = await postJson('numbers=1,2,3');
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ result: 6 });
  });

  test('should return 0 when numbers is missing', async () => {
    const response = await postJson('');
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ result: 0 });
  });

  test('should return 400 for invalid input', async () => {
    const response = await postJson('numbers=2,a,4');
    expect(response.status).toBe(400);
    const payload = await response.json();
    expect(payload.error).toBe('Invalid number: a');
  });

  test('should return 413 for oversized bodies', async () => {
    const response = await postJson(`numbers=1,${'2,'.repeat(20 * 1024)}3`);
    expect(response.status).toBe(413);
    const payload = await response.json();
    expect(payload.error).toBe('Request body too large');
  });

  test('should not accept GET requests on the JSON API', async () => {
    const response = await fetch(`${baseUrl}/api/calculate`);
    expect(response.status).toBe(200); // falls through to the calculator page
    expect(response.headers.get('content-type')).toContain('text/html');
  });
});

describe('POST / (form submission)', () => {
  const postForm = (body) => fetch(baseUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });

  test('should render the result', async () => {
    const response = await postForm('numbers=4,5');
    expect(response.status).toBe(200);
    const body = await response.text();
    expect(body).toContain('Result: 9');
  });

  test('should render validation errors', async () => {
    const response = await postForm('numbers=abc');
    expect(response.status).toBe(400);
    const body = await response.text();
    expect(body).toContain('Error: Invalid number: abc');
  });

  test('should escape HTML in user input to prevent XSS', async () => {
    const payload = `numbers=${encodeURIComponent('2,<script>alert(1)</script>')}`;
    const response = await postForm(payload);
    const body = await response.text();
    expect(body).not.toContain('<script>');
    expect(body).toContain('&lt;script&gt;');
  });
});

describe('graceful shutdown', () => {
  test('should close the server cleanly on shutdown signal', async () => {
    server.closeAllConnections?.();
    await expect(server.shutdown('SIGTERM')).resolves.toBeUndefined();
    expect(server.listening).toBe(false);
  });
});
