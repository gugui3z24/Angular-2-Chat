module.exports = (io, http) => {

  var clients = [];

  io.on('connection', (socket) => {

    socket.on('add-message', (message, username) => {
      io.emit('message', { type: 'new-message', text: message, username: username });
    });

    socket.on('saveUser', (username) => {
      io.emit('saveUser', { username: username });
      if (!clients.includes(username)) clients.push(username);
      io.emit('users', { type: 'users', users: clients });
    });

    socket.on('users', () => {
      io.emit('users', { type: 'users', users: clients });
    });

    socket.on('exitSession', (username) => {
      const index = clients.indexOf(username);
      clients.splice(index, 1);
    });

  });

  return io;
}
