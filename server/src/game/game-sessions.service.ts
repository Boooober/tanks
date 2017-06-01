import * as WebSocket from '@types/ws';
import GameEvents, { GameEventsService } from './game-events.service';
import GameActions, { GameActionsService } from './game-actions.service';

export class GameSessionsService {
    private sessions: { [sessionId: string]: WebSocket } = {};

    constructor(private GameEventsService: GameEventsService,
                private GameActionsService: GameActionsService) {
    }

    createSession(socket: WebSocket): void {
        const sessionId = this.createSessionId();
        this.sessions[sessionId] = socket;
        socket.on('message', message => this.onMessage(sessionId, message));
        socket.on('close', () => this.deleteSession(sessionId));
        this.GameEventsService.exec('createSession', sessionId);
    }

    deleteSession(sessionId: string): void {
        delete this.sessions[sessionId];
        this.GameEventsService.exec('deleteSession', sessionId);
    }

    sendAllMessage(method: string, data?: any): void {
        const message = JSON.stringify({ method, data });
        Object.keys(this.sessions).forEach(sessionId => {
            this.postMessage(this.sessions[sessionId], message);
        });
    }

    private onMessage(sessionId: string, message: string): void {
        const { method, data } = JSON.parse(message);
        this.GameActionsService.executeAction(method, sessionId, data);
    }

    private postMessage(session: WebSocket, message: string) {
        if (session.readyState === session.OPEN) {
            session.send(message);
        }
    }

    private createSessionId(): string {
        return String(Math.floor(Math.random() * Date.now()));
    }
}

export default new GameSessionsService(
    GameEvents,
    GameActions
);
