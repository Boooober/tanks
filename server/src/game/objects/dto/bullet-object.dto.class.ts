import { BulletObject } from '../classes/bullet-object.class';
import { BulletObjectBaseDTO } from '../../../../../common/objects/dto/bullet-object.base.dto.class';

export class BulletObjectDTO extends BulletObjectBaseDTO {
    constructor(object: BulletObject) {
        super();
        const { x, y, deg, type, width, height, health, centerX, centerY, color, maxHealth } = object;
        return { x, y, deg, type, width, height, health, centerX, centerY, color, maxHealth };
    }
}
