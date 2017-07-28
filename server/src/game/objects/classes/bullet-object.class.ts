import { MovingObject } from './moving-object.class';
import { PlayerUnit } from './player-unit.class';

export const DEFAULT_BULLET_OPTIONS = {
    speed: 10,
    width: 2,
    height: 10,
    power: 5,
    health: 5
};

export class BulletObject extends MovingObject {
    static TYPE = 'bullet';

    public power: number;
    public shooter: PlayerUnit;

    constructor(options?: any) {
        super();
        Object.assign(this, DEFAULT_BULLET_OPTIONS, options);
        this.type = BulletObject.TYPE;
    }
}
