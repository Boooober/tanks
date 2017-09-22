import { Injectable } from 'injection-js';
import {
    BaseObject,
    PlayerUnit,
    BulletObject,
    PlayerStatistics,
    GameEventsService
} from 'Core';


@Injectable()
export abstract class StatisticsAbstract {
    protected statistics: { [sessionId: string]: PlayerStatistics } = {};

    constructor(private gameEventsService: GameEventsService) {}

    init() {
        this.gameEventsService.on('shooting', player => this.onShooting(player));
        this.gameEventsService.on('bulletCollision', (bullet, object) => this.onBulletCollision(bullet, object));
        this.gameEventsService.on('bulletPlayerCollision', (bullet, object) => this.onBulletPlayerCollision(bullet, object));
        this.gameEventsService.on('bulletLethalCollision', (bullet, object) => this.onBulletLethalCollision(bullet, object));
    }

    clear() {
        this.statistics = {};
    }

    get(): any {
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
