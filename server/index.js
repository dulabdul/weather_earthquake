const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const app = express();
const httpServer = createServer(app);
const cors = require('cors');
require('dotenv').config();
app.use(cors(cors));
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000', // Replace with your client's origin
    methods: ['GET', 'POST'], // Add any other methods if needed
    allowedHeaders: ['my-custom-header'],
    credentials: true, // If you're using cookies or sessions
  },
});
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

const PORT = process.env.PORT || 4001;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
