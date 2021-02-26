const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 8080;
const router = require('./src/routes/sample.route');

require('./src/database');

router.use(function(req, res) {
  res.sendFile(path.join(__dirname, '../client','build','index.html'));
});

const CLIENT_BUILD_PATH = path.join(__dirname, "../client/build");

// Static files
app.use(express.static(CLIENT_BUILD_PATH));

// Server React Client
app.get("/", function(req, res) {
  res.sendFile(path.join(CLIENT_BUILD_PATH , "index.html"));
});

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

app.use('/posts', router);

app.listen(PORT, function () {
    console.log(`Server Listening on ${PORT}`);
});
