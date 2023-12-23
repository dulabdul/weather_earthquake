const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', ''); // Replace '' with your front-end URL in a production environment for security
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
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

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
