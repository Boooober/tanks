import Timer = NodeJS.Timer;
import GameLoop, { GameLoopService } from '../../../game-loop.service';
import GameSessions, { GameSessionsService } from '../../../game-sessions.service';
import DeathmatchStatistics, { DeathmatchStatisticsService } from './deathmatch-statistics.service';

export class DeathmatchService {
    static IN_PROGRESS = 'in progress';
    static TERMINATED = 'terminated';

    public status: string;
    private gameLoop: Timer;

    constructor(private GameLoopService: GameLoopService,
                private GameSessionsService: GameSessionsService,
                private DeathmatchStatisticsService: DeathmatchStatisticsService) {
    }

    init(): void {
        this.DeathmatchStatisticsService.init();
        this.DeathmatchStatisticsService.clear();
    }

    start(): void {
        this.gameLoop = this.GameLoopService.create();
        this.status = DeathmatchService.IN_PROGRESS;
    }

    terminate(): void {
        const data = this.DeathmatchStatisticsService.get();
        this.GameLoopService.terminate(this.gameLoop);
        this.status = DeathmatchService.TERMINATED;

        this.GameSessionsService.sendAllMessage('gameStatistics', data);
    }
}

export default new DeathmatchService(
    GameLoop,
    GameSessions,
    DeathmatchStatistics
);
