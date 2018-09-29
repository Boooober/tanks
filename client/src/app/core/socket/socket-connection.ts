import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Observable, Subject } from 'rxjs/index';
import { filter, map } from 'rxjs/internal/operators';

import { StreamData } from './entity';
import { getWebsocket } from '../../../../../config';

export const ON_SOCKET_CONNECTED = new InjectionToken('ON_SOCKET_CONNECTED');

type OnConnect = () => void;

@Injectable()
export class SocketConnection {

    private socket: WebSocket;
    private subject$: Subject<StreamData> = new Subject();

    constructor(
        @Inject(ON_SOCKET_CONNECTED) private onConnect: OnConnect[]
    ) {
        this.connect();
    }

    get<T>(action?: string): Observable<T> {
        return this.subject$.pipe(
            filter((data: StreamData) => action ? data.action === action : true),
            map((data: StreamData) => data.payload)
        );
    }

    send(data: StreamData): void {
        if (this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify(data));
        }
    }

    private connect(): void {
        this.socket = new WebSocket(getWebsocket());
        this.socket.onopen = () => this.onConnect.forEach((callback: OnConnect) => callback());
        this.socket.onmessage = (event: MessageEvent) => this.onMessage(event);
    }

    private onMessage(event: MessageEvent): void {
        const { action, payload } = JSON.parse(event.data);
        this.subject$.next({ action, payload });
    }
}
