const http = require('http')
const qs = require('querystring')
const calculator = require('./calculator')
const url = require('url')

const server = http.createServer(function(request, response) {
  const parsedUrl = url.parse(request.url, true)
  const path = parsedUrl.pathname

  // Add CORS headers
  response.setHeader('Access-Control-Allow-Origin', '*')
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    response.writeHead(200)
    response.end()
    return
  }

  // Health check endpoint
  if (path === '/health') {
    response.writeHead(200, {'Content-Type': 'application/json'})
    response.end(JSON.stringify({ status: 'healthy', timestamp: new Date().toISOString() }))
    return
  }

  // API endpoint for calculations
  if (path === '/api/calculate' && request.method === 'POST') {
    let body = ''
    request.on('data', function(data) {
      body += data
    })

    request.on('end', function() {
      try {
        const post = qs.parse(body)
        const numbers = post.numbers
        const result = calculator.add(numbers)
        response.writeHead(200, {'Content-Type': 'application/json'})
        response.end(JSON.stringify({ result: result }))
      } catch (error) {
        response.writeHead(400, {'Content-Type': 'application/json'})
        response.end(JSON.stringify({ error: error.message }))
      }
    })
    return
  }

  if (request.method === 'POST') {
    let body = ''
    request.on('data', function(data) {
      body += data
    })

    request.on('end', function() {
      try {
        const post = qs.parse(body)
        const numbers = post.numbers
        const result = calculator.add(numbers)
        response.writeHead(200, {'Content-Type': 'text/html'})
        response.end(`
          <html>
            <body>
              <h3>Result: ${result}</h3>
              <a href="/">Back to Calculator</a>
            </body>
          </html>
        `)
      } catch (error) {
        response.writeHead(400, {'Content-Type': 'text/html'})
        response.end(`
          <html>
            <body>
              <h3>Error: ${error.message}</h3>
              <a href="/">Back to Calculator</a>
            </body>
          </html>
        `)
      }
    })
  } else {
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
      </html>`
    response.writeHead(200, {'Content-Type': 'text/html'})
    response.end(html)
  }
})

const port = process.env.PORT || 3000
const host = process.env.HOST || '0.0.0.0'

server.listen(port, host, () => {
  console.log(`Server listening at http://${host}:${port}`)
  console.log(`Health check available at http://${host}:${port}/health`)
})

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully')
  server.close(() => {
    console.log('Process terminated')
  })
})

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully')
  server.close(() => {
    console.log('Process terminated')
  })
})
