import * as WebSocket from '@types/ws';
import { Player } from '../classes/player.class';
import { UserModel } from '../../database/database';
import GameUnitsObjectService from '../objects/game-units-object.service';

class UserSessionsService {
    private sessions: {
        [sessionId: string]: {
            socket: WebSocket,
            player?: Player
        }
    } = {};

    createSession(socket: WebSocket): string {
        const sessionId = this.getSessionId();
        console.log('New connection %d :)', new Date);

        this.sessions[sessionId] = { socket };
        socket.on('message', message => this.onMessage(sessionId, message));
        socket.on('close', () => this.deleteSession(sessionId));
        return sessionId;
    }

    deleteSession(sessionId: string): void {
        console.log('Connection closed %d :(', new Date);
        const { player: { id, unit } } = this.sessions[sessionId];
        UserModel.saveObject(id, unit);
        GameUnitsObjectService.remove(unit);
        delete this.sessions[sessionId];
    }

    // sendMessage(session: WebSocket, method: string, data: any): void {
    //     const message = JSON.stringify({ method, data });
    //     this.postMessage(session, message);
    // }

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
                this.setupPlayer(sessionId, data.id);
                break;
            case 'action':
                const { player } = this.sessions[sessionId];
                GameUnitsObjectService.executeAction(sessionId, player, data);
                break;
        }
    }

    private setupPlayer(sessionId: string, userId: string): void {
        UserModel.findById(userId, (error, user) => {
            const player = new Player(user);

            this.sessions[sessionId].player = player;
            GameUnitsObjectService.create(sessionId, player);
        });
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
