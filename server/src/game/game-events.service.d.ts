import { BaseObject } from './objects/classes/base-object.class';
// import { PlayerObject } from './objects/classes/player-object.class';
import { BulletObject } from './objects/classes/bullet-object.class';

export declare class GameEvents {
    private events: { [action: string]: Array<Function> };
    private on(type: 'onFire' | 'onBulletCollisions'): void;
    private on(type: string, callback: Function): void;
    private exec(action: 'onFire'): void;
    private exec(action: 'onBulletCollisions', bullet: BulletObject, object: BaseObject): void;
    private exec(action: string, ...args: Array<any>): void;
}
