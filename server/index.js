const express = require('express');
const app = express();
const http = require('http').Server(app);
const bodyParser = require('body-parser');
const path = require('path');
const PORT = 8080;

const router = require('./src/routes/pirate.route');

require('./src/database');

router.use((req, res) => {
  res.sendFile(path.join(__dirname, '../client','build','index.html'));
});

const CLIENT_BUILD_PATH = path.join(__dirname, "../client/build");

app.use(express.static(CLIENT_BUILD_PATH));

app.get("/", (req, res) => {
  res.sendFile(path.join(CLIENT_BUILD_PATH , "index.html"));
});

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

app.use('/pirates', router);

http.listen(PORT, () => {
    console.log(`Server Listening on ${PORT}`);
});
