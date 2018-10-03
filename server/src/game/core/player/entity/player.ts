import { SessionId } from '../../../../core/socket/entity';

import { PlayerUnit } from './player-unit';
import { PlayerStatistics } from './player-statistics';

export class Player {

    constructor(
        public readonly sessionId: SessionId,
        public readonly id: string,
        public readonly name: string,
        public readonly unit: PlayerUnit,
        public readonly statistics: PlayerStatistics
    ) {}
}
