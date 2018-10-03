import { PlayerUnit } from '../player-unit';
import { PlayerUnitInfoBaseDTO } from '../../../../../../../common';

export class PlayerUnitInfoDTO extends PlayerUnitInfoBaseDTO {

    constructor(object: PlayerUnit) {
        super();
        const { name, color } = object;
        const width = object.getWidth();
        const height = object.getHeight();
        const health = object.getHealth();
        const defence = object.getDefence();
        const maxHealth = object.getMaxHealth();
        const modifiers = object.getModifiers();
        const speed = object.getMovementSpeed();
        const rotateSpeed = object.getRotateSpeed();
        const attackSpeed = object.getAttackSpeed();
        const attackPower = object.getAttackPower();

        return {
            speed, width, height, health, name, maxHealth, defence,
            modifiers, rotateSpeed, attackSpeed, attackPower, color
        };
    }
}
