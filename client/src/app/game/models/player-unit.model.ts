import { BaseModel } from './base.model';
import { PlayerUnit } from '../objects/classes/player-unit.class';

export class PlayerUnitModel extends BaseModel {
    get(): PlayerUnit {
        return super.get() as PlayerUnit;
    }

    getScale(): number {
        const { scale } = this.get();
        return scale && scale[0];
    }

    getUsername(): string {
        return this.get().username;
    }

    getDimensions(): [number, number] {
        const { width, height } = this.get();
        return [width, height];
    }

    getColor(): [number, number, number] {
        const { r, g, b } = this.get().color;
        return [r, g, b];
    }

    getHealth(): number {
        return this.get().health;
    }

    getMaxHealth(): number {
        return this.get().maxHealth;
    }

    getSpeed(): number {
        return this.get().speed;
    }

    getRotateSpeed(): number {
        return this.get().rotateSpeed;
    }

    getAttackSpeed(): number {
        return Math.round((1 / this.get().attackSpeed) * 100) / 100;
    }

    getDamage(): number {
        const { attackPower, attackSpeed } = this.get();
        return Math.round((attackPower / attackSpeed) * 100) / 100;
    }
}
