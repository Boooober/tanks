import { Injectable } from 'injection-js';
import {
    PlayerStatistics,
    GameEventsService
} from '../../';
import { StatisticsAbstract } from '../statistics.abstract';


@Injectable()
export class RoundsStatisticsService extends StatisticsAbstract {
    public currentRound: number;

    protected roundStatistics: Array<{ [sessionId: string]: PlayerStatistics }> = [];

    constructor(gameEventsService: GameEventsService) {
        super(gameEventsService);
        this.clear();
    }

    get(): Array<PlayerStatistics[]> {
        return this.roundStatistics.map(roundStatistics => (
            Object.keys(roundStatistics).map(sessionId => roundStatistics[sessionId])
        ));
    }

    getPlayerStatistics(sessionId: string): PlayerStatistics {
        const currentRoundStatistics = this.roundStatistics[this.currentRound];
        return currentRoundStatistics[sessionId] = (currentRoundStatistics[sessionId] || new PlayerStatistics());
    }

    clear(): void {
        super.clear();
        this.currentRound = -1;
        this.roundStatistics = [];
    }

    startNewRound(): number {
        this.roundStatistics.push(this.statistics);
        this.statistics = {};
        return ++this.currentRound;
    }
}
