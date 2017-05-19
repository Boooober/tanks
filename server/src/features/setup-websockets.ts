const http = require('http');
const WS = require('ws');

import UserSessionsService from '../game/user/user-sessions.service';

export default function setupWebsockets(app) {
    const server = http.createServer(app);
    const wss = new WS.Server({ server, port: 8081 });

    wss.on('connection', (ws, req) => {
        UserSessionsService.createSession(ws);
    });



}
