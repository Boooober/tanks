import { BulletObject } from 'Core';
import { BulletObjectBaseDTO } from 'Common';


export class BulletObjectDTO extends BulletObjectBaseDTO {
    constructor(object: BulletObject) {
        super();
        const { x, y, deg, type, width, height, health, centerX, centerY, color, maxHealth } = object;
        return { x, y, deg, type, width, height, health, centerX, centerY, color, maxHealth };
    }
}
