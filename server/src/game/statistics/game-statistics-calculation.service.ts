import { BaseObject } from '../objects/classes/base-object.class';
import { PlayerObject } from '../objects/classes/player-object.class';
import { BulletObject } from '../objects/classes/bullet-object.class';

import { UserModel } from '../../database/database';
import { PlayerStatistics } from '../classes/player-statistics.class';

import GameEventsService from '../game-events.service';

class GameStatisticsCalculationService {
    static onFire(player: PlayerObject) {
        UserModel.incrementStats(player.objectId, { totalShoots: 1 } as PlayerStatistics);
    }

    static onBulletCollisions(bullet: BulletObject, object: BaseObject): void {
        UserModel.incrementStats(bullet.shooter.objectId, {
            successShoots: 1,
            totalDamage: bullet.power
        } as PlayerStatistics);
    }

    static onBulletPlayerCollisions(bullet: BulletObject, object: BaseObject): void {
        UserModel.incrementStats(object.objectId, { receivedDamage: bullet.power } as PlayerStatistics);
    }

    static onBulletLethalCollision(bullet: BulletObject, object: BaseObject): void {
        UserModel.incrementStats(bullet.shooter.objectId, { score: 1 } as PlayerStatistics);
    }

    init() {
        GameEventsService.on('onFire', GameStatisticsCalculationService.onFire);
        GameEventsService.on('onBulletCollisions', GameStatisticsCalculationService.onBulletCollisions);
        GameEventsService.on('onBulletPlayerCollisions', GameStatisticsCalculationService.onBulletPlayerCollisions);
        GameEventsService.on('onBulletLethalCollision', GameStatisticsCalculationService.onBulletLethalCollision);
    }
}

export default new GameStatisticsCalculationService;
