import { ReplaySubject, Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { GameObjectProperties } from '../objects/game-object-properties.class';

export const WEBSOCKET_ADDRESS = 'ws://10.17.10.108:8081';

@Injectable()
export class ConnectionService {
    private socket: WebSocket;

    private objectsSubject = new ReplaySubject(1);
    private messagesSubject = new ReplaySubject(1);

    connect(): void {
        this.socket = new WebSocket(WEBSOCKET_ADDRESS);
        this.socket.onmessage = event => this.onMessage(event);
    }

    getObjectsStream(): Observable<GameObjectProperties[]> {
        return this.objectsSubject.asObservable();
    }

    sendMessage(method, data): void {
        const message = { method, data };
        this.socket.send(JSON.stringify(message));
    }

    startAction(action): void {
        this.sendMessage('action', { action, value: true });
    }

    finishAction(action): void {
        this.sendMessage('action', { action, value: false });
    }

    private onMessage(event): void {
        const { method, data } = JSON.parse(event.data);
        switch (method) {
            case 'objectUpdates':
                this.objectUpdates(data as GameObjectProperties);
                break;
            case 'messageUpdates':
                this.objectUpdates(data);
                break;
        }
    }

    private messageUpdates(data): void {
        this.messagesSubject.next(data);
    }

    private objectUpdates(data: GameObjectProperties): void {
        this.objectsSubject.next(data);
    }
}
