import { BulletObject } from '../';
import { BulletObjectBaseDTO } from '../../../../../../common';


export class BulletObjectDTO extends BulletObjectBaseDTO {
    constructor(object: BulletObject) {
        super();
        const { x, y, deg, type, width, height, health, centerX, centerY, color, maxHealth } = object;
        return { x, y, deg, type, width, height, health, centerX, centerY, color, maxHealth };
    }
}
