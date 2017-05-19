import { PlayerStats } from './player-stats.class';
import { MovingObject } from './moving-object.class';

export const DEFAULT_PLAYER_OPTIONS = {
    x: 0,
    y: 0,
    deg: 45,
    speed: 2,
    width: 32,
    height: 48,
    health: 100,
    type: 'player',
    doFire: false,
    canFire: true,
    fireWait: false,
    fireDelay: 500,
    fireSpeed: 10,
    rotateSpeed: 3,
    stats: {
        score: 0,
        totalShoots: 0,
        successShoots: 0,
        totalDamage: 0,
        receivedDamage: 0
    }};

export class PlayerObject extends MovingObject {
    static TYPE = 'player';

    public username: string;
    public canFire: boolean;
    public fireWait: boolean;
    public fireDelay: number;
    public fireSpeed: number;
    public rotateSpeed: number;
    public doFire: boolean;
    public moveUp: boolean;
    public moveDown: boolean;
    public moveLeft: boolean;
    public moveRight: boolean;

    public stats: PlayerStats;

    constructor(options?: any) {
        super();
        Object.assign(this, DEFAULT_PLAYER_OPTIONS, options);
    }
}
