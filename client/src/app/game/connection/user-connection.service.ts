import { Subject, Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { PlayerUnit } from '../objects/classes/player-unit.class';
import { BaseObject } from '../objects/classes/base-object.class';
import { User } from '../../auth-forms/user.class';
import { AuthService } from '../../auth-forms/auth.service';

import { WEBSOCKET_ADDRESS } from '../../../../../config/config';

@Injectable()
export class UserConnectionService {
    private socket: WebSocket;
    private subject$ = new Subject();

    constructor(private AuthService: AuthService) {
        this.connect();
    }

    getStream(): Observable<[string, any]> {
        return this.subject$.asObservable();
    }

    getFilteredStream(filter: 'unitUpdates'): Observable<PlayerUnit>;
    getFilteredStream(filter: 'objectUpdates'): Observable<BaseObject[]>;
    getFilteredStream(filter: string): Observable<any>;
    getFilteredStream(filter) {
        return this.getStream()
            .filter(([method]) => method === filter)
            .map(([method, data]) => data);
    }

    pollFilteredStream(filter: string, interval = 1000, request?: Function, ): Observable<any> {
        const requestUnitInfo = new Observable(observer => {
            if (request) { request(); }
            observer.complete();
        });

        return this.getFilteredStream(filter)
            .merge(
                Observable
                    .timer(0, interval)
                    .flatMap(() => requestUnitInfo)
            );
    }

    sendMessage(method: 'user', data: User): void;
    sendMessage(method: 'unitAction', data: { action: string, value: any }): void;
    sendMessage(method: 'unitUpdates', data?: any): void;
    sendMessage(method, data?): void {
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

    private connect(): void {
        this.socket = new WebSocket(WEBSOCKET_ADDRESS);
        this.socket.onopen = () => this.sendUser();
        this.socket.onmessage = event => this.onMessage(event);
    }

    private onMessage(event): void {
        const { method, data } = JSON.parse(event.data);
        this.subject$.next([method, data]);
    }

    private sendUser(): void {
        const user = this.AuthService.getUser();
        this.sendMessage('user', user);
    }
}
