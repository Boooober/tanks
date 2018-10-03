import { Injectable } from 'injection-js';
import { StatisticsAbstract } from '../statistics.abstract';

import { PlayerStatistics } from '../../core/player/entity';
import { SessionId } from '../../../core/socket/entity';

@Injectable()
export class RoundsStatisticsService extends StatisticsAbstract {
    public currentRound: number;

    protected roundStatistics: Map<SessionId, PlayerStatistics> = new Map();

    constructor(/*gameEventsService: GameEventsService*/) {
        // super(gameEventsService);
        super();
        this.clear();
    }

    get(): Array<PlayerStatistics[]> {
        return [];
        // return this.roundStatistics.map(roundStatistics => (
        //     Object.keys(roundStatistics).map((sessionId: SessionId) => roundStatistics[sessionId])
        // ));
    }

    getPlayerStatistics(sessionId: SessionId): PlayerStatistics {
        const currentRoundStatistics = this.roundStatistics[this.currentRound];
        return currentRoundStatistics[sessionId] = (currentRoundStatistics[sessionId] || new PlayerStatistics());
    }

    clear(): void {
        super.clear();
        // this.currentRound = -1;
        // this.roundStatistics = [];
    }

    startNewRound(): number {
        // this.roundStatistics.push(this.statistics);
        // this.statistics = {};
        return ++this.currentRound;
    }
}
