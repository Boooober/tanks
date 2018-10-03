import * as http from 'http';
import * as WebSocket from 'ws';
import { Injectable } from 'injection-js';
import { Observable, Subject } from 'rxjs/index';

import { ISocketMessage, ISocketSessionMessage, SessionId } from './entity';
import { filter } from 'rxjs/internal/operators';
import { SocketCommand } from '../../../../common/socket-command.enum';

@Injectable()
export class SocketConnection {

    private sessions: Map<SessionId, WebSocket> = new Map();

    private onConnect$: Subject<SessionId> = new Subject();
    private onDisconnect$: Subject<SessionId> = new Subject();
    private onMessage$: Subject<ISocketSessionMessage> = new Subject();

    setup(app: any): void {
        const server = http.createServer(app);
        const socketServer = new WebSocket.Server({ server, port: 8081 });

        socketServer.on('connection', (ws: WebSocket, req: any): void => this.onConnection(ws));
    }

    send(sessionId: SessionId, message: ISocketMessage): void {
        this.onSendMessage(this.sessions.get(sessionId), JSON.stringify(message));
    }

    sendAll(message: ISocketMessage): void {
        const data = JSON.stringify(message);
        this.sessions.forEach((socket: WebSocket) => this.onSendMessage(socket, data));
    }

    $onConnection(): Observable<SessionId> {
        return this.onConnect$.asObservable();
    }

    $onDisconnect(): Observable<SessionId> {
        return this.onDisconnect$.asObservable();
    }

    $onMessage(action?: SocketCommand): Observable<ISocketSessionMessage> {
        return this.onMessage$.pipe(
            filter((message: ISocketSessionMessage) => action ? message.action === action : true)
        );
    }

    private onConnection(socket: WebSocket): void {
        const sessionId = Symbol('SocketConnectionId');
        this.sessions.set(sessionId, socket);

        socket.on('message', (message: WebSocket.Data) => this.onMessage(sessionId, message));
        socket.on('close', () => this.onClose(sessionId));

        this.onConnect$.next(sessionId);
    }

    private onMessage(sessionId: SessionId, message: WebSocket.Data): void {
        const { action, payload } = JSON.parse(message as string);

        this.onMessage$.next({ action, payload, sessionId });
    }

    private onClose(sessionId: SessionId): void {
        this.sessions.delete(sessionId);
        this.onDisconnect$.next(sessionId);
    }

    private onSendMessage(socket: WebSocket, message: string): void {
        if (socket.readyState === socket.OPEN) {
            socket.send(message);
        }
    }
}
