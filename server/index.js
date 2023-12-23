const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: 'http://localhost:3000', // Replace with your client's origin
    methods: ['GET', 'POST'], // Add any other methods if needed
    allowedHeaders: ['my-custom-header'],
    credentials: true, // If you're using cookies or sessions
  },
});
const cors = require('cors');
io.on('connection', (socket) => {
  console.log('Client connected');

  // Emit time every second
  setInterval(() => {
    socket.emit('time', { time: new Date().toLocaleTimeString() });
  }, 1000);

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
