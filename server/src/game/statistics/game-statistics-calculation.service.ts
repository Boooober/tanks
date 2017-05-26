import { BaseObject } from '../objects/classes/base-object.class';
import { PlayerObject } from '../objects/classes/player-object.class';
import { BulletObject } from '../objects/classes/bullet-object.class';

import { UserModel } from '../../database/database';
import { PlayerStatistics } from '../classes/player-statistics.class';

import GameEventsService from '../game-events.service';

class GameStatisticsCalculationService {
    static onFire(player: PlayerObject) {
        UserModel.updateStats(player.objectId, { totalShoots: 1 } as PlayerStatistics);
    }

    static onBulletCollisions(bullet: BulletObject, object: BaseObject): void {
        const shooterStats = {
            successShoots: 1,
            totalDamage: bullet.power
        } as PlayerStatistics;

        if (object.type === PlayerObject.TYPE) {
            const targetStats = { receivedDamage: bullet.power } as PlayerStatistics;
            if (object.health <= 0) {
                shooterStats.score = 1;
            }
            UserModel.updateStats(object.objectId, targetStats);
        }
        UserModel.updateStats(bullet.shooter.objectId, shooterStats);
    }

    init() {
        GameEventsService.on('onFire', GameStatisticsCalculationService.onFire);
        GameEventsService.on('onBulletCollisions', GameStatisticsCalculationService.onBulletCollisions);
    }
}

export default new GameStatisticsCalculationService;
