import { BulletObjectBaseDTO } from '../../../../../../../common';
import { BulletObject } from '../bullet-object';

export class BulletObjectDTO extends BulletObjectBaseDTO {
    constructor(object: BulletObject) {
        super();
        const { x, y, deg, type, width, height, health, centerX, centerY, color, maxHealth } = object;
        return { x, y, deg, type, width, height, health, centerX, centerY, color, maxHealth };
    }
}
