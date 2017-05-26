import { MovingObject } from './moving-object.class';
import { PlayerObject } from './player-object.class';

export const DEFAULT_BULLET_OPTIONS = {
    speed: 5,
    width: 2,
    height: 10,
    power: 25,
    health: 25
};

export class BulletObject extends MovingObject {
    static TYPE = 'bullet';

    public power: number;
    public shooter: PlayerObject;

    constructor(options?: any) {
        super();
        Object.assign(this, DEFAULT_BULLET_OPTIONS, options);
        this.type = BulletObject.TYPE;
    }
}
