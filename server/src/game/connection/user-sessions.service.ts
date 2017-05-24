import * as WebSocket from '@types/ws';
import { GamePlayer } from '../game-player.class';
import GamePlayersObjectService from '../objects/game-players-object.service';

class UserSessionsService {
    private sessions: {
        [sessionId: string]: {
            socket: WebSocket,
            player?: GamePlayer
        }
    } = {};

    createSession(socket: WebSocket): string {
        const sessionId = this.getSessionId();
        console.log('New connection %d :)', sessionId);

        this.sessions[sessionId] = { socket };
        socket.on('message', message => this.onMessage(sessionId, message));
        socket.on('close', () => this.deleteSession(sessionId));
        return sessionId;
    }

    deleteSession(sessionId: string): void {
        console.log('Connection closed %d :(', sessionId);
        GamePlayersObjectService.remove(sessionId);
        delete this.sessions[sessionId];
    }

    sendMessage(session: WebSocket, method: string, data: any): void {
        const message = JSON.stringify({ method, data });
        this.postMessage(session, message);
    }

    sendAllMessage(method: string, data: any): void {
        const message = JSON.stringify({ method, data });
        Object.keys(this.sessions).forEach(sessionId => {
            this.postMessage(this.sessions[sessionId].socket, message);
        });
    }

    private onMessage(sessionId: string, message: string): void {
        const { method, data } = JSON.parse(message);
        switch (method) {
            case 'user':
                this.setupUser(sessionId, data);
                break;
            case 'action':
                const player = this.sessions[sessionId].player;
                GamePlayersObjectService.executeAction(sessionId, player, data);
                break;
        }
    }

    private setupUser(sessionId: string, user: GamePlayer): void {
        this.sessions[sessionId].player = user;
        GamePlayersObjectService.create(sessionId, user);

    }

    private postMessage(session: WebSocket, message: string) {
        if (session.readyState === session.OPEN) {
            session.send(message);
        }
    }

    private getSessionId(): string {
        return String(Math.floor(Math.random() * Date.now()));
    }
}

export default new UserSessionsService;
