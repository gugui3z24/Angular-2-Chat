const express = require('express')
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const socket = require('./socket/chat')(io, http);
const path = require('path');
const port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname + '/client/dist/')));

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/client/dist/index.html');
});

http.listen(port, () => {
  console.log('Listening on port ' + port);
});
