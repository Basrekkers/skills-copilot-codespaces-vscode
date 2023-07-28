// Create web server
// 1. Create HTTP Server
// 2. Create Router
// 3. Create Middlewares
// 4. Listen for Requests

// 1. Create HTTP Server
const http = require('http');
const server = http.createServer();

// 2. Create Router
const router = require('./router');

// 3. Create Middlewares
const bodyParser = require('./middlewares/bodyParser');
const logger = require('./middlewares/logger');

// 4. Listen for Requests
server.on('request', (req, res) => {
  // 1. Parse the request
  bodyParser(req, res);
  // 2. Log the request
  logger(req, res);
  // 3. Route the request
  router(req, res);
});

const port = 5000;
server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});