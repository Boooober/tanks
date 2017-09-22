import Timer = NodeJS.Timer;
import { Injectable } from 'injection-js';
import {
    GameLoopService,
    GameSessionsService,
} from 'Core';
import { DeathmatchStatisticsService } from './deathmatch-statistics.service';


@Injectable()
export class DeathmatchService {
    static IN_PROGRESS = 'in progress';
    static TERMINATED = 'terminated';

    public status: string;
    private gameLoop: Timer;

    constructor(private gameLoopService: GameLoopService,
                private gameSessionsService: GameSessionsService,
                private deathmatchStatisticsService: DeathmatchStatisticsService) {
    }

    init(): void {
        this.deathmatchStatisticsService.init();
        this.deathmatchStatisticsService.clear();
    }

    start(): void {
        this.gameLoop = this.gameLoopService.create();
        this.status = DeathmatchService.IN_PROGRESS;
    }

    terminate(): void {
        const data = this.deathmatchStatisticsService.get();
        this.gameLoopService.terminate(this.gameLoop);
        this.status = DeathmatchService.TERMINATED;

        this.gameSessionsService.sendAllMessage('gameStatistics', data);
    }
}
