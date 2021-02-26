const express = require('express');
const app = express();
const http = require('http').Server(app);
const bodyParser = require('body-parser');
const path = require('path');
const PORT = 8080;

const io = require('socket.io')(http);
io.on('connection', function(socket) {
  // setInterval(() => {
  //   io.sockets.emit('notify', {foo: 'bar'});
  // }, 1000);

  //Whenever someone disconnects this piece of code executed
  socket.on('disconnect', function () {
     console.log('A user disconnected');
  });
});

const router = require('./src/routes/sample.route')(io);

require('./src/database');

router.use((req, res) => {
  res.sendFile(path.join(__dirname, '../client','build','index.html'));
});

const CLIENT_BUILD_PATH = path.join(__dirname, "../client/build");

// Static files
app.use(express.static(CLIENT_BUILD_PATH));

// Server React Client
app.get("/", (req, res) => {
  res.sendFile(path.join(CLIENT_BUILD_PATH , "index.html"));
});

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

app.use('/posts', router);

http.listen(PORT, () => {
    console.log(`Server Listening on ${PORT}`);
});
