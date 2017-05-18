import { ReplaySubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

export const WEBSOCKET_ADDRESS = 'ws://localhost:8081';
// export const MESSAGE_UPDATES = 'messageUpdates';
// export const POSITION_UPDATES = 'positionUpdates';

@Injectable()
export class ConnectionService {
  private socket: WebSocket;

  private objectsSubject = new ReplaySubject(1);
  private messagesSubject = new ReplaySubject(1);

  connect() {
    this.socket = new WebSocket(WEBSOCKET_ADDRESS);
    this.socket.onmessage = event => this.onMessage(event);
  }

  getObjectsStream() {
    return this.objectsSubject.asObservable();
  }

  sendMessage(method, data) {
    const message = { method, data };
    this.socket.send(JSON.stringify(message));
  }

  startAction(action) {
    this.sendMessage('action', { action, value: true });
  }

  finishAction(action) {
    this.sendMessage('action', { action, value: false });
  }

  private onMessage(event) {
    const { method, data } = JSON.parse(event.data);
    this[method] && this[method](data);
  }

  private messageUpdates(data) {
    this.messagesSubject.next(data);
  }

  private positionUpdates(data) {
    this.objectsSubject.next(data);
  }
}
