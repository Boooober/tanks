import { Modifier } from './modifier.class';
import { MovingObject } from './moving-object.class';

export const DEFAULT_UNIT_OPTIONS = {
    speed: 2,
    width: 32,
    height: 48,
    health: 100,
    maxHealth: 100,
    rotateSpeed: 3,
    attackSpeed: 2,
    attackPower: 25,
    canAttack: true,
    isAttacking: false,

    scale: [1, 1],
    color: { r: 203, g: 203, b: 203 }
};

export class PlayerUnit extends MovingObject {
    static TYPE = 'player';

    public username: string;
    public sessionId: string;

    public moveUp: boolean;
    public moveDown: boolean;
    public moveLeft: boolean;
    public moveRight: boolean;

    public canAttack: boolean;
    public isAttacking: boolean;
    public attackSpeed: number;
    public attackPower: number;

    public scale: [number, number];
    public modifiers: Modifier[];

    constructor(...options: Array<any>) {
        super();
        Object.assign(this, DEFAULT_UNIT_OPTIONS, ...options);
        this.type = PlayerUnit.TYPE;
        this.resetUnitHealth();
    }

    doAttack(): { x: number, y: number, deg: number, power: number, shooter: PlayerUnit } {
        this.canAttack = false;
        this.isAttacking = true;
        setTimeout(() => {
            this.canAttack = true;
            this.isAttacking = false;
        }, 1000 / this.attackSpeed);

        return {
            x: this.x + (this.width / 2),
            y: this.y + (this.height / 2),
            deg: this.deg,
            power: this.attackPower,
            shooter: this
        }
    }

    resetUnitHealth(): void {
        this.health = this.health > 0
            ? this.health
            : DEFAULT_UNIT_OPTIONS.health;
    }
}
