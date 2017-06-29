import { PlayerUnit } from '../classes/player-unit.class';
import { PlayerUnitObjectBaseDTO } from '../../../../../common/objects/dto/player-unit-object.base.dto.class';

export class PlayerUnitObjectDTO extends PlayerUnitObjectBaseDTO {
    constructor(object: PlayerUnit) {
        super();
        const { x, y, deg, type, centerX, centerY, username, isAttacking, color } = object;
        const width = object.getWidth();
        const height = object.getHeight();
        const health = object.getHealth();
        const maxHealth = object.getMaxHealth();

        return {
            x, y, deg, type, width, height, health, maxHealth,
            centerX, centerY, username, isAttacking, color
        };
    }
}
