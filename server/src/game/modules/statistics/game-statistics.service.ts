import { Injectable } from 'injection-js';
import {
    BaseObject,
    PlayerUnit,
    BulletObject,
    PlayerStatistics,
    GameEventsService
} from 'Core';
import { UserModel } from '../../../database/database';


@Injectable()
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

    constructor(private gameEventsService: GameEventsService) {
    }

    init() {
        this.gameEventsService.on('shooting', GameStatisticsService.onShooting);
        this.gameEventsService.on('bulletCollision', GameStatisticsService.onBulletCollisions);
        this.gameEventsService.on('bulletPlayerCollision', GameStatisticsService.onBulletPlayerCollisions);
        this.gameEventsService.on('bulletLethalCollision', GameStatisticsService.onBulletLethalCollision);
    }
}
