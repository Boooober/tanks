import Timer = NodeJS.Timer;
import Players, { PlayersService } from '../../player/players.service';
import GameLoop, { GameLoopService } from '../../../game-loop.service';
import GameObjects, { GameObjectsService } from '../../../objects/game-objects.service';
import GameSessions, { GameSessionsService } from '../../../game-sessions.service';
import RoundsStatistics, { RoundsStatisticsService } from './rounds-statistics.service';

export class RoundsService {
    static IN_BREAK = 'in break';
    static IN_PROGRESS = 'in progress';
    static TERMINATED = 'terminated';

    public status: string;
    public round: number;

    private gameLoop: Timer;

    constructor(private PlayersService: PlayersService,
                private GameLoopService: GameLoopService,
                private GameObjectsService: GameObjectsService,
                private GameSessionsService: GameSessionsService,
                private RoundsStatisticsService: RoundsStatisticsService) {
    }

    init(): void {
        this.RoundsStatisticsService.init();
        this.RoundsStatisticsService.clear();
    }

    roundStart(): void {
        this.GameSessionsService.sendAllMessage('roundStart');
        this.addUnits();
        this.round = this.RoundsStatisticsService.startNewRound();
        this.gameLoop = this.GameLoopService.create();
        this.status = RoundsService.IN_PROGRESS;
        console.log('Starting round #%d', this.round);
    }

    roundEnd(): void {
        const data = this.RoundsStatisticsService.get();
        this.GameLoopService.terminate(this.gameLoop);
        this.GameSessionsService.sendAllMessage('gameStatistics', data);
    }

    breakStart(): void {
        this.status = RoundsService.IN_BREAK;
        console.log('Break after round #%d', this.round);
    }

    breakEnd(): void {}

    roundsTerminate(): void {
        this.status = RoundsService.TERMINATED;
    }

    getStatus(): string {
        return this.status;
    }

    private addUnits(): void {
        return this.PlayersService.get().forEach(({ unit }) => this.GameObjectsService.add(unit));
    }
}

export default new RoundsService(
    Players,
    GameLoop,
    GameObjects,
    GameSessions,
    RoundsStatistics
);
