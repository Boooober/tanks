import * as WebSocket from 'ws';
import { Injectable } from 'injection-js';
import {
    GameEventsService,
    GameActionsService
} from '../';

@Injectable()
export class GameSessionsService {
    private sessions: { [sessionId: string]: WebSocket } = {};

    constructor(
        private gameEventsService: GameEventsService,
        private gameActionsService: GameActionsService
    ) {}

    createSession(socket: WebSocket): void {
        const sessionId = this.createSessionId();
        this.sessions[sessionId] = socket;
        socket.on('message', (message: WebSocket.Data) => this.onMessage(sessionId, message));
        socket.on('close', () => this.deleteSession(sessionId));
        this.gameEventsService.emit('createSession', sessionId);
    }

    deleteSession(sessionId: string): void {
        delete this.sessions[sessionId];
        this.gameEventsService.emit('deleteSession', sessionId);
    }

    sendMessage(sessionId: string, method: string, payload?: any): void {
        const message = JSON.stringify({ method, payload });
        this.postMessage(this.sessions[sessionId], message);
    }

    sendAllMessage(method: string, payload?: any): void {
        const message = JSON.stringify({ method, payload });
        Object.keys(this.sessions).forEach((sessionId: string) => {
            this.postMessage(this.sessions[sessionId], message);
        });
    }

    private onMessage(sessionId: string, message: WebSocket.Data): void {
        const { action, payload } = JSON.parse(message as string);
        this.gameActionsService.emit(action, sessionId, payload);
    }

    private postMessage(session: WebSocket, message: string): void {
        if (session.readyState === session.OPEN) {
            session.send(message);
        }
    }

    private createSessionId(): string {
        return String(Math.floor(Math.random() * Date.now()));
    }
}
