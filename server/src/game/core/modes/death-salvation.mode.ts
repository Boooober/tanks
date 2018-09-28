import { Injectable } from 'injection-js';
import {
    BaseObject,
    BulletObject,
    GameEventsService
} from '../';

export const MAX_HEALTH_LIMIT = 100; // should be configured from unit


@Injectable()
export class DeathSalvationMode {
    static salvation(bullet: BulletObject, object: BaseObject): void {
        const drainHP = bullet.power + object.health; // ( 25 + (-15) ) or ( 25 + (0) )
        let { health } = bullet.shooter;
        if (health < MAX_HEALTH_LIMIT) {
            health += drainHP;
            bullet.shooter.health = health < MAX_HEALTH_LIMIT ? health : MAX_HEALTH_LIMIT;
        }
    }

    constructor(private gameEventsService: GameEventsService) {
    }

    init(): void {
        this.gameEventsService.on('bulletLethalCollision', DeathSalvationMode.salvation);
    }
}
