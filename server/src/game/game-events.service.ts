import { Player } from './classes/player.class';
import { BaseObject } from './objects/classes/base-object.class';
import { PlayerUnit } from './objects/classes/player-unit.class';
import { BulletObject } from './objects/classes/bullet-object.class';

export class GameEventsService {
    private events: { [action: string]: Array<Function> } = {};

    on(type: 'shooting', callback: (unit: PlayerUnit) => void): Function;
    on(type: 'bulletCollision', callback: (bullet: BulletObject, object: BaseObject) => void): Function;
    on(type: 'bulletPlayerCollision' | 'bulletLethalCollision', callback: (bullet: BulletObject, unit: PlayerUnit) => void): Function;
    on(type: 'createSession' | 'deleteSession', callback: (sessionId: string) => void): Function;
    on(type: 'createPlayer' | 'deletePlayer', callback: (player: Player, sessionId: string) => void): Function;
    on(type: string, callback: Function): Function {
        let onEvents = this.events[type] = this.events[type] || [];
        onEvents.push(callback);
        return () => onEvents.splice(onEvents.indexOf(callback), 1);
    }

    exec(action: 'shooting', unit: PlayerUnit): void;
    exec(action: 'bulletCollision', bullet: BulletObject, object: BaseObject): void;
    exec(action: 'bulletPlayerCollision' | 'bulletLethalCollision', bullet: BulletObject, unit: PlayerUnit): void;
    exec(action: 'createSession' | 'deleteSession', sessionId: string): void;
    exec(action: 'createPlayer' | 'deletePlayer', player: Player, sessionId: string): void;
    exec(type: string, ...args): void {
        (this.events[type] || []).forEach(callback => callback(...args));
    }
}

export default new GameEventsService();
