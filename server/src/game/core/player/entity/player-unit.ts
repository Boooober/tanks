import { SessionId } from '../../../../core/socket/entity';

import { Modifier } from './modifier';
import { MovingObject } from './moving-object';

export const DEFAULT_UNIT_OPTIONS = {
    speed: 3,
    width: 32,
    height: 48,
    health: 100,
    defence: 1,
    maxHealth: 100,
    rotateSpeed: 4,
    attackSpeed: 3,
    attackPower: 25,
    resurrectTimeout: 5000,
    canAttack: true,
    canResurrect: true,
    isAttacking: false,

    modifiers: {},
    color: { r: 203, g: 203, b: 203 }
};

export const getUnitOptions = () => ({
    ...DEFAULT_UNIT_OPTIONS,
    modifiers: {},
    color: { r: 203, g: 203, b: 203 }
});

export class PlayerUnit extends MovingObject {

    static TYPE: string = 'player';

    public moveUp: boolean;
    public moveDown: boolean;
    public moveLeft: boolean;
    public moveRight: boolean;

    public canAttack: boolean;
    public isAttacking: boolean;
    public attackSpeed: number;
    public attackPower: number;

    public resurrectTimeout: number;
    public canResurrect: boolean;

    public modifiers: any;

    private resurrectTimer: number;

    constructor(
        objectId: string,
        public readonly sessionId: SessionId,
        public readonly name: string
    ) {
        super(
            objectId
        );

        Object.assign(
            this,
            getUnitOptions(),
            { type: PlayerUnit.TYPE }
        );
        this.recreate();
    }

    recreate(): PlayerUnit {
        this.obsolete = false;
        this.resetUnitHealth();
        this.generateRandomPosition();
        return this;
    }

    doAttack(): { x: number, y: number, deg: number, power: number, shooter: PlayerUnit } {
        this.canAttack = false;
        this.isAttacking = true;
        setTimeout(() => {
            this.canAttack = true;
            this.isAttacking = false;
        }, 1000 / this.getAttackSpeed());

        return {
            x: this.x + (this.getWidth() / 2),
            y: this.y + (this.getHeight() / 2),
            deg: this.deg,
            power: this.getAttackPower(),
            shooter: this
        };
    }

    resurrect(): void {
        this.canResurrect = false;
        this.generateRandomPosition();

        clearTimeout(this.resurrectTimer);
        this.resurrectTimer = setTimeout(() => {
            this.canResurrect = true;
        }, this.resurrectTimeout) as any;
    }

    resetUnitHealth(): void {
        this.health = this.health > 0
            ? this.health
            : DEFAULT_UNIT_OPTIONS.health;
    }

    getWidth(): number {
        return this.applyModifiers('width');
    }

    getHeight(): number {
        return this.applyModifiers('height');
    }

    getHealth(): number {
        return this.applyModifiers('health');
    }

    getDefence(): number {
        return this.applyModifiers('defence');
    }

    getMaxHealth(): number {
        return this.applyModifiers('maxHealth');
    }

    getAttackPower(): number {
        return this.applyModifiers('attackPower');
    }

    getAttackSpeed(): number {
        return this.applyModifiers('attackSpeed');
    }

    getRotateSpeed(): number {
        return this.applyModifiers('rotateSpeed');
    }

    getMovementSpeed(): number {
        return this.applyModifiers('speed');
    }

    /**
     * Should be in a mixin object
     */
    addModifier(modifier: Modifier): () => any {
        [...modifier.properties, 'all'].forEach(property => {
            this.modifiers[property] = this.modifiers[property] || [];
            this.modifiers[property].push(modifier);
        });
        return () => this.removeModifier(modifier);
    }

    /**
     * Should be in a mixin object
     */
    removeModifier(obsoleteModifier: Modifier): void {
        [...obsoleteModifier.properties, 'all'].forEach(property => {
            this.modifiers[property] = (this.modifiers[property] || [])
                .filter(modifier => modifier.name !== obsoleteModifier.name);
        });
    }

    /**
     * Should be in a mixin object
     */
    updateModifier(modifier: Modifier): void {
        this.removeModifier(modifier);
        this.addModifier(modifier);
    }

    /**
     * Should be in a mixin object
     */
    getModifiers(): Array<{ name: string, options: object }> { // TODO ModifiersDTO
        return (this.modifiers.all || []).map(modifier => ({
            name: modifier.name,
            options: modifier.options
        }));
    }

    /**
     * Should be in a mixin object
     */
    applyModifiers(prop: string): number {
        return (this.modifiers[prop] || [])
            .reduce(
                (value, modifier: Modifier) => modifier.handle(prop, value),
                this[prop]
            );
    }
}
