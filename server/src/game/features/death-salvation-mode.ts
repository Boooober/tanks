import { BaseObject } from '../objects/classes/base-object.class';
import { BulletObject } from '../objects/classes/bullet-object.class';

import GameEventsService from '../game-events.service';

export const MAX_HEALTH_LIMIT = 100; // should be configured from unit

export class DeathSalvation {
    static salvation(bullet: BulletObject, object: BaseObject) {
        const drainHP = bullet.power + object.health; // ( 25 + (-15) ) or ( 25 + (0) )
        let { health } = bullet.shooter;
        if (health < MAX_HEALTH_LIMIT) {
            health += drainHP;
            bullet.shooter.health = health < MAX_HEALTH_LIMIT ? health : MAX_HEALTH_LIMIT;
        }
    }

    public init() {
        GameEventsService.on('onBulletLethalCollision', DeathSalvation.salvation);
    }
}

export default new DeathSalvation;
