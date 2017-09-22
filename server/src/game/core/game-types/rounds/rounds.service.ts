import Timer = NodeJS.Timer;
import { Injectable } from 'injection-js';
import {
    PlayersService,
    GameLoopService,
    GameObjectsService,
    GameSessionsService
} from 'Core';
import { RoundsStatisticsService } from './rounds-statistics.service';


@Injectable()
export class RoundsService {
    static IN_BREAK = 'in break';
    static IN_PROGRESS = 'in progress';
    static TERMINATED = 'terminated';

    public status: string;
    public round: number;

    private gameLoop: Timer;

    constructor(private playersService: PlayersService,
                private gameLoopService: GameLoopService,
                private gameObjectsService: GameObjectsService,
                private gameSessionsService: GameSessionsService,
                private roundsStatisticsService: RoundsStatisticsService) {
    }

    init(): void {
        this.roundsStatisticsService.init();
        this.roundsStatisticsService.clear();
    }

    roundStart(): void {
        this.gameSessionsService.sendAllMessage('roundStart');
        this.addUnits();
        this.round = this.roundsStatisticsService.startNewRound();
        this.gameLoop = this.gameLoopService.create();
        this.status = RoundsService.IN_PROGRESS;
        console.log('Starting round #%d', this.round);
    }

    roundEnd(): void {
        const data = this.roundsStatisticsService.get();
        this.gameLoopService.terminate(this.gameLoop);
        this.gameSessionsService.sendAllMessage('gameStatistics', data);
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
        return this.playersService.get().forEach(({ unit }) => this.gameObjectsService.add(unit));
    }
}
