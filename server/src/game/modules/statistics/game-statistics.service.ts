import { UserModel } from '../../../database/database';
import { BaseObject } from '../../objects/classes/base-object.class';
import { PlayerUnit } from '../../objects/classes/player-unit.class';
import { BulletObject } from '../../objects/classes/bullet-object.class';
import { PlayerStatistics } from '../../classes/player-statistics.class';

import GameEventsService from '../../game-events.service';

export class GameStatisticsService {
    static onShooting(unit: PlayerUnit) {
        UserModel.incrementStats(unit.objectId, { totalShoots: 1 } as PlayerStatistics);
    }

    static onBulletCollisions(bullet: BulletObject, object: BaseObject): void {
        UserModel.incrementStats(bullet.shooter.objectId, {
            successShoots: 1,
            totalDamage: bullet.power
        } as PlayerStatistics);
    }

    static onBulletPlayerCollisions(bullet: BulletObject, unit: PlayerUnit): void {
        UserModel.incrementStats(unit.objectId, { receivedDamage: bullet.power } as PlayerStatistics);
    }

    static onBulletLethalCollision(bullet: BulletObject, unit: PlayerUnit): void {
        UserModel.incrementStats(bullet.shooter.objectId, { score: 1 } as PlayerStatistics);
    }

    init() {
        GameEventsService.on('shooting', GameStatisticsService.onShooting);
        GameEventsService.on('bulletCollision', GameStatisticsService.onBulletCollisions);
        GameEventsService.on('bulletPlayerCollision', GameStatisticsService.onBulletPlayerCollisions);
        GameEventsService.on('bulletLethalCollision', GameStatisticsService.onBulletLethalCollision);
    }
}

export default new GameStatisticsService;
