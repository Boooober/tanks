import { PlayerUnit } from '../objects/classes/player-unit.class';
import { PlayerStatistics } from './player-statistics.class';

export class Player {
    id: string;
    name: string;
    email: string;

    unit: PlayerUnit;
    statistics: PlayerStatistics;

    sessionId: string;

    constructor(properties: any, options: any) {
        const { id, name, unit, statistics } = properties;
        Object.assign(this, { id, name, unit, statistics }, options);
    }
}
