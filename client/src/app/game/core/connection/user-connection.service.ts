import { Subject, Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Player } from '../player.class';

// TODO Wrong dependency! Core should not depend from modules!
import { PlayerUnit } from '../../modules/game-area/objects/classes/player-unit.class';
import { BaseObject } from '../../modules/game-area/objects/classes/base-object.class';
import { AuthService } from '../auth.service';

import { WEBSOCKET_ADDRESS } from '../../../../../../config/config';

@Injectable()
export class UserConnectionService {
    private socket: WebSocket;
    private subject$ = new Subject();

    constructor(private authService: AuthService) {
        this.connect();
    }

    getStream(): Observable<any> {
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

    sendMessage(method: 'user', data: Player): void;
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
        this.socket.onopen = () => this.sendPlayer();
        this.socket.onmessage = event => this.onMessage(event);
    }

    private onMessage(event): void {
        const { method, data } = JSON.parse(event.data);
        this.subject$.next([method, data]);
    }

    private sendPlayer(): void {
        const player = this.authService.getPlayer();
        this.sendMessage('user', player);
    }
}
