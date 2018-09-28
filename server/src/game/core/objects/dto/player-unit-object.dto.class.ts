import { PlayerUnit } from '../';
import { PlayerUnitObjectBaseDTO } from '../../../../../../common';


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
