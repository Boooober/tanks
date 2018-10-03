import { ISocketMessage } from './socket-message.interface';

export type SessionId = symbol;

export interface ISocketSessionMessage extends ISocketMessage {
    sessionId?: SessionId;
}
