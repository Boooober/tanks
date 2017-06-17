import { BaseObject } from '../../objects/classes/base-object.class';
import { PlayerUnit } from '../../objects/classes/player-unit.class';
import { BulletObject } from '../../objects/classes/bullet-object.class';
import { PlayerStatistics } from '../../classes/player-statistics.class';
import { GameEventsService } from '../../game-events.service';

export abstract class StatisticsAbstract {
    protected statistics: { [sessionId: string]: PlayerStatistics } = {};

    constructor(private GameEventsService: GameEventsService) {}

    init() {
        this.GameEventsService.on('shooting', player => this.onShooting(player));
        this.GameEventsService.on('bulletCollision', (bullet, object) => this.onBulletCollision(bullet, object));
        this.GameEventsService.on('bulletPlayerCollision', (bullet, object) => this.onBulletPlayerCollision(bullet, object));
        this.GameEventsService.on('bulletLethalCollision', (bullet, object) => this.onBulletLethalCollision(bullet, object));
    }

    clear() {
        this.statistics = {};
    }

    get(): PlayerStatistics {
        return Object.keys(this.statistics).map(sessionId => this.statistics[sessionId]);
    };

    getPlayerStatistics(sessionId: string): PlayerStatistics {
        return this.statistics[sessionId] || (this.statistics[sessionId] = new PlayerStatistics());
    };

    onShooting(unit: PlayerUnit): void {
        const playerStatistics = this.getPlayerStatistics(unit.sessionId);
        playerStatistics.totalShoots += 1;
    }

    onBulletCollision(bullet: BulletObject, object: BaseObject): void {
        const playerStatistics = this.getPlayerStatistics(bullet.shooter.sessionId);
        playerStatistics.successShoots += 1;
        playerStatistics.totalDamage += bullet.power;
    }

    onBulletPlayerCollision(bullet: BulletObject, unit: PlayerUnit): void {
        const playerStatistics = this.getPlayerStatistics(unit.sessionId);
        playerStatistics.receivedDamage += bullet.power;
    }

    onBulletLethalCollision(bullet: BulletObject, unit: PlayerUnit): void {
        const playerStatistics = this.getPlayerStatistics(bullet.shooter.sessionId);
        playerStatistics.score += 1;
    }
}
