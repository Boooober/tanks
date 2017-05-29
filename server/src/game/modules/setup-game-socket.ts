const WS = require('ws');
const http = require('http');
import * as WebSocket from '@types/ws';
import UserSessionsService from '../connection/user-sessions.service';

export default function setupGameSocket(app) {
    const server = http.createServer(app);
    const wss = new WS.Server({ server, port: 8081 });

    wss.on('connection', (ws: WebSocket, req: any): void => {
        UserSessionsService.createSession(ws);
    });
}
