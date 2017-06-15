import { ReplaySubject, Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { BaseObject } from '../objects/classes/base-object.class';

import { WEBSOCKET_ADDRESS } from '../../../../../config/config';
import { AuthService } from '../../auth-forms/auth.service';

@Injectable()
export class UserConnectionService {
    private socket: WebSocket;

    private objectsSubject = new ReplaySubject(1);
    private messagesSubject = new ReplaySubject(1);

    constructor(private AuthService: AuthService) {}

    connect(): void {
        this.socket = new WebSocket(WEBSOCKET_ADDRESS);
        this.socket.onopen = () => this.sendUser();
        this.socket.onmessage = event => this.onMessage(event);
    }

    getObjectsStream(): Observable<BaseObject[]> {
        return this.objectsSubject.asObservable();
    }

    sendMessage(method, data): void {
        const message = { method, data };
        if (this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify(message));
        }
    }

    startAction(action): void {
        this.sendMessage('unitAction', { action, value: true });
    }

    finishAction(action): void {
        this.sendMessage('unitAction', { action, value: false });
    }

    private onMessage(event): void {
        const { method, data } = JSON.parse(event.data);
        switch (method) {
            case 'objectUpdates':
                this.objectUpdates(data as BaseObject);
                break;
            case 'messageUpdates':
                this.objectUpdates(data);
                break;
            case 'roundStart':
                console.log('Rounds are working on back end: roundStart', data);
                break;
            case 'roundStatistics':
                console.log('Rounds are working on back end: roundStatistics', data);
                break;
        }
    }

    private messageUpdates(data): void {
        this.messagesSubject.next(data);
    }

    private objectUpdates(data: BaseObject): void {
        this.objectsSubject.next(data);
    }

    private sendUser(): void {
        const user = this.AuthService.getUser();
        this.sendMessage('user', user);
    }
}
