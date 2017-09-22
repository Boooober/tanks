import { EventEmitter } from 'events';
import { Injectable } from 'injection-js';
import {
    Player,
    PlayerUnit,
    BaseObject,
    BulletObject
} from 'Core';

interface IGameEventsService {
    on(type: 'shooting', listener: (unit: PlayerUnit) => void): this;
    on(type: 'bulletCollision', listener: (bullet: BulletObject, object: BaseObject) => void): this;
    on(type: 'bulletPlayerCollision' | 'bulletLethalCollision', listener: (bullet: BulletObject, unit: PlayerUnit) => void): this;
    on(type: 'createSession' | 'deleteSession', listener: (sessionId: string) => void): this;
    on(type: 'createPlayer' | 'deletePlayer', listener: (player: Player, sessionId: string) => void): this;

    emit(action: 'shooting', unit: PlayerUnit): boolean;
    emit(action: 'bulletCollision', bullet: BulletObject, object: BaseObject): boolean;
    emit(action: 'bulletPlayerCollision' | 'bulletLethalCollision', bullet: BulletObject, unit: PlayerUnit): boolean;
    emit(action: 'createSession' | 'deleteSession', sessionId: string): boolean;
    emit(action: 'createPlayer' | 'deletePlayer', player: Player, sessionId: string): boolean;
}


@Injectable()
export class GameEventsService extends EventEmitter implements IGameEventsService {}
