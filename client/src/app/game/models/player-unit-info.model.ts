import { BaseModel } from './base.model';
import { PlayerUnitInfoBaseDTO } from '../../../../../common/objects/dto/player-unit-info.base.dto.class';

export class PlayerUnitInfoModel extends BaseModel {
    get(): PlayerUnitInfoBaseDTO {
        return super.get() as PlayerUnitInfoBaseDTO;
    }

    getScale(): number {
        const { modifiers = [] } = this.get();
        const scaleModifier = modifiers.find(modifier => modifier.name === 'ScaleModifier');
        return scaleModifier ? scaleModifier.options.scale : 1;
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

    getDefence(): number {
        return this.get().defence;
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
