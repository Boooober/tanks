import { EventEmitter } from 'events';

interface IGameActionsService {
    on(event: 'user', listener: (sessionId: string, id: string) => void): this;
    on(event: 'unitAction', listener: (sessionId: string, data: { action: number, value: any }) => void): this;
    on(event: 'unitUpdates', listener: (sessionId: string, data?: any) => void): this;

    emit(event: 'user', sessionId: string, id: string): boolean;
    emit(event: 'unitAction', sessionId: string, data: { action: number, value: any }): boolean;
    emit(event: 'unitUpdates', sessionId: string, data?: any): boolean;
}

export class GameActionsService extends EventEmitter implements IGameActionsService {}

export default new GameActionsService();
