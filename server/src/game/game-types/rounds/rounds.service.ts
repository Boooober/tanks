import Timer = NodeJS.Timer;
import { Injectable } from 'injection-js';

import { PlayerUnit } from '../../core/player/entity';
import { PlayerService } from '../../core/player/player/players.service';
import { SocketConnection } from '../../../core/socket/socket-connection';
import { GameLoopService } from '../../core/loop/game-loop.service';
import { GameObjectsService } from '../../core/player/game-objects.service';

import { RoundsStatisticsService } from './rounds-statistics.service';
import { SocketCommand } from '../../../../../common/socket-command.enum';

@Injectable()
export class RoundsService {

    static IN_BREAK: string = 'in break';
    static IN_PROGRESS: string = 'in progress';
    static TERMINATED: string = 'terminated';

    public status: string;
    public round: number;

    private gameLoop: Timer;

    constructor(
        private playerService: PlayerService,
        private socketConnection: SocketConnection,
        private gameLoopService: GameLoopService,
        private gameObjectsService: GameObjectsService,
        private roundsStatisticsService: RoundsStatisticsService
    ) {}

    init(): void {
        this.roundsStatisticsService.init();
        this.roundsStatisticsService.clear();
    }

    roundStart(): void {
        this.socketConnection.sendAll({ action: SocketCommand.ROUND_START });
        this.addUnits();
        this.round = this.roundsStatisticsService.startNewRound();
        this.gameLoop = this.gameLoopService.create();
        this.status = RoundsService.IN_PROGRESS;
        console.log('Starting round #%d', this.round);
    }

    roundEnd(): void {
        const payload = this.roundsStatisticsService.get();
        this.gameLoopService.terminate(this.gameLoop);
        this.socketConnection.sendAll({ payload, action: SocketCommand.GAME_STATISTICS });
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
        return this.playerService
            .getAllUnits()
            .forEach((unit: PlayerUnit) => this.gameObjectsService.add(unit));
    }
}
