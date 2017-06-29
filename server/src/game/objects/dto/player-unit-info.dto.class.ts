import { PlayerUnit } from '../classes/player-unit.class';
import { PlayerUnitInfoBaseDTO } from '../../../../../common/objects/dto/player-unit-info.base.dto.class';

export class PlayerUnitInfoDTO extends PlayerUnitInfoBaseDTO {
    constructor(object: PlayerUnit) {
        super();
        const { username, color } = object;
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
            speed, width, height, health, username, maxHealth, defence,
            modifiers, rotateSpeed, attackSpeed, attackPower, color
        };
    }
}
