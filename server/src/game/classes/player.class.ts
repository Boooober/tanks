import { PlayerObject } from '../objects/classes/player-object.class';
import { PlayerStatistics } from './player-statistics.class';

export class Player {
    id: string;
    name: string;
    email: string;

    unit: PlayerObject;
    statistics: PlayerStatistics;

    constructor(options: any) {
        const { id, name, unit, statistics } = options;
        Object.assign(this, { id, name, unit, statistics });
    }
}
