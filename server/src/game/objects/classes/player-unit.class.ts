import { MovingObject } from './moving-object.class';

export const DEFAULT_UNIT_OPTIONS = {
    color: 'gray',
    speed: 2,
    width: 32,
    height: 48,
    health: 100,
    rotateSpeed: 3,
    attackSpeed: 2,
    attackPower: 25,
    canAttack: true,
    isAttacking: false,
};

export class PlayerUnit extends MovingObject {
    static TYPE = 'player';

    public color: string;
    public username: string;
    public sessionId: string;

    public moveUp: boolean;
    public moveDown: boolean;
    public moveLeft: boolean;
    public moveRight: boolean;

    public attackSpeed: number;
    public attackPower: number;
    public canAttack: boolean;
    public isAttacking: boolean;

    constructor(...options: Array<any>) {
        super();
        Object.assign(this, DEFAULT_UNIT_OPTIONS, ...options);
        this.type = PlayerUnit.TYPE;
    }
}
