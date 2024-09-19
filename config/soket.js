const socketio = require('socket.io');

function setupSocketIO(server) {
  const io = socketio(server);

  io.on('connection', (socket) => {
    console.log('A user connected');

    // Example: Listen for a task update event
    socket.on('taskUpdate', (task) => {
      io.emit('taskUpdate', task); // Broadcast task updates to all connected clients
    });

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });

  return io;
}

module.exports = setupSocketIO;