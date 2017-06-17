import { EventEmitter } from 'events';

interface IGameActionsService {
    on(event: 'user' | 'unitAction', listener: (sessionId?: string, data?: any) => void): this;
    emit(event: 'user' | 'unitAction', sessionId?: string, data?: any): boolean;
}

export class GameActionsService extends EventEmitter implements IGameActionsService {}

export default new GameActionsService();
