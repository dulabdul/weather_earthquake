const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Serve HTML file

wss.on('connection', (ws) => {
  console.log('Client connected');

  // Send time updates to connected clients every second
  const sendTime = () => {
    ws.send(new Date().toLocaleTimeString());
  };

  const interval = setInterval(sendTime, 1000);

  ws.on('close', () => {
    console.log('Client disconnected');
    clearInterval(interval);
  });
});

const PORT = process.env.PORT || 4001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
