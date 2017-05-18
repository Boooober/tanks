const express = require('express');
const http = require('http');
const url = require('url');
const WS = require('ws');
import { UserSessionsService } from './user/user-sessions.service';

const app = express();

// app.use(function (req, res) {
//   res.send({ msg: "hello" });
// });

const server = http.createServer(app);
const wss = new WS.Server({
  server,
  port: 8081
});

wss.on('connection', function connection(ws, req) {
  UserSessionsService.createSession(ws);
});

app.listen(8080, function listening() {
  console.log('Listening on:)');
});
